const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Parse a conventional commit message
 * Format: type(scope): description
 * Example: feat(Button): add loading props
 */
function parseCommit(commitMessage) {
  // Match conventional commit format: type(scope): subject or type: subject
  const conventionalCommitRegex = /^(\w+)(?:\(([^)]+)\))?: (.+)$/;
  const match = commitMessage.match(conventionalCommitRegex);

  if (!match) {
    return null; // Not a conventional commit
  }

  const [, type, scope, description] = match;

  // Map commit types to release note types
  const typeMapping = {
    feat: 'enhancement',
    fix: 'fix',
    style: 'style',
    refactor: 'enhancement',
    perf: 'enhancement',
    // Skip these types
    test: null,
    docs: null,
    build: null,
    ci: null,
    chore: null,
    revert: null,
  };

  const releaseType = typeMapping[type];

  if (releaseType === null) {
    return null; // Skip this commit type
  }

  // Check if it's a new component (first feat for this component)
  // This would need more logic to determine, for now we mark all feat as enhancement
  // You can manually change it to "new" in the JSON file if needed

  return {
    type: releaseType || 'enhancement',
    component: scope || null,
    description: description.trim(),
  };
}

/**
 * Get commits between two git tags
 */
function getCommitsSinceTag(fromTag, toTag = 'HEAD') {
  try {
    // Get commit messages with format: hash|subject
    const command = `git log ${fromTag}..${toTag} --pretty=format:"%H|%s" --no-merges`;
    const output = execSync(command, { encoding: 'utf-8' });

    if (!output.trim()) {
      return [];
    }

    return output
      .split('\n')
      .map(line => {
        const [hash, message] = line.split('|');
        return { hash, message };
      })
      .filter(commit => commit.message);
  } catch (error) {
    console.error('Error getting commits:', error.message);
    return [];
  }
}

/**
 * Get the latest git tag
 */
function getLatestTag() {
  try {
    return execSync('git describe --tags --abbrev=0', { encoding: 'utf-8' }).trim();
  } catch (error) {
    console.error('No tags found. Using all commits.');
    return null;
  }
}

/**
 * Get the current version from package.json
 */
function getCurrentVersion() {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
  );
  return packageJson.version;
}

/**
 * Main function to generate release notes
 */
function generateReleaseNotes() {
  console.log('🔍 Generating release notes...\n');

  const currentVersion = getCurrentVersion();
  const latestTag = getLatestTag();

  console.log(`📦 Current version: ${currentVersion}`);
  console.log(`🏷️  Latest tag: ${latestTag || 'None'}\n`);

  // Get commits since last tag (or all commits if no tag exists)
  const fromTag = latestTag || '';
  const commits = getCommitsSinceTag(fromTag);

  console.log(`📝 Found ${commits.length} commits to analyze\n`);

  if (commits.length === 0) {
    console.log('⚠️  No commits found since last tag.');
    return;
  }

  // Parse commits and group by component
  const changesByComponent = new Map();
  let skippedCount = 0;

  commits.forEach(({ hash, message }) => {
    const parsed = parseCommit(message);

    if (parsed) {
      const key = `${parsed.type}:${parsed.component || 'general'}`;

      if (!changesByComponent.has(key)) {
        changesByComponent.set(key, {
          type: parsed.type,
          component: parsed.component,
          descriptions: []
        });
      }

      changesByComponent.get(key).descriptions.push(parsed.description);
      console.log(`✅ ${message}`);
    } else {
      skippedCount++;
      console.log(`⏭️  Skipped: ${message}`);
    }
  });

  // Convert grouped changes to array format
  const changes = Array.from(changesByComponent.values()).map(change => ({
    type: change.type,
    component: change.component,
    description: change.descriptions.length === 1
      ? change.descriptions[0]
      : change.descriptions
  }));

  console.log(`\n📊 Summary:`);
  console.log(`   - Included: ${changes.length} unique component changes`);
  console.log(`   - Skipped: ${skippedCount} commits`);

  if (changes.length === 0) {
    console.log('\n⚠️  No changes to include in release notes.');
    return;
  }

  // Create release notes object
  const releaseNotes = {
    [currentVersion]: changes,
  };

  // Save to JSON file
  const outputPath = path.join(__dirname, '../release-notes.json');
  fs.writeFileSync(outputPath, JSON.stringify(releaseNotes, null, 2));

  console.log(`\n✨ Release notes generated successfully!`);
  console.log(`📄 File: ${outputPath}`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Review the generated release-notes.json`);
  console.log(`   2. Run "npm run update-release-notes" to update the Storybook file`);
  console.log(`   3. Commit the changes`);
}

// Run the script
if (require.main === module) {
  generateReleaseNotes();
}

module.exports = { generateReleaseNotes, parseCommit };
