const fs = require('fs');
const path = require('path');

/**
 * Read the generated release-notes.json file
 */
function readReleaseNotesJson() {
  const jsonPath = path.join(__dirname, '../release-notes.json');

  if (!fs.existsSync(jsonPath)) {
    console.error('❌ Error: release-notes.json not found!');
    console.log('💡 Run "npm run generate-release-notes" first.');
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
}

/**
 * Read the current ReleaseNotes.stories.tsx file
 */
function readReleaseNotesStory() {
  const storyPath = path.join(__dirname, '../src/stories/ReleaseNotes.stories.tsx');
  return fs.readFileSync(storyPath, 'utf-8');
}

/**
 * Convert new release notes to TypeScript array format
 */
function formatNewReleaseNotes(releaseNotesJson) {
  let formatted = '';

  Object.entries(releaseNotesJson).forEach(([version, changes]) => {
    formatted += `  {\n`;
    formatted += `    version: "${version}",\n`;
    formatted += `    changes: [\n`;

    changes.forEach((change, index) => {
      formatted += `      {\n`;
      if (change.component) {
        formatted += `        component: "${change.component}",\n`;
      }
      formatted += `        type: "${change.type}",\n`;
      formatted += `        description: "${change.description.replace(/"/g, '\\"')}",\n`;
      formatted += `      }`;
      formatted += index < changes.length - 1 ? ',\n' : '\n';
    });

    formatted += `    ],\n`;
    formatted += `  },\n`;
  });

  return formatted;
}

/**
 * Update the ReleaseNotes.stories.tsx file
 */
function updateReleaseNotesStory() {
  console.log('📝 Updating ReleaseNotes.stories.tsx...\n');

  // Read inputs
  const releaseNotesJson = readReleaseNotesJson();
  let storyContent = readReleaseNotesStory();

  // Format new release notes
  const newReleaseNotes = formatNewReleaseNotes(releaseNotesJson);

  console.log('📋 New release notes to add:');
  console.log(newReleaseNotes);

  // Find the releaseNotes array in the file
  const arrayStartRegex = /const releaseNotes: ReleaseNote\[\] = \[\n/;
  const match = storyContent.match(arrayStartRegex);

  if (!match) {
    console.error('❌ Error: Could not find releaseNotes array in the story file!');
    process.exit(1);
  }

  // Insert new release notes at the beginning of the array
  const insertPosition = match.index + match[0].length;
  const updatedContent =
    storyContent.slice(0, insertPosition) +
    newReleaseNotes +
    storyContent.slice(insertPosition);

  // Write the updated file
  const storyPath = path.join(__dirname, '../src/stories/ReleaseNotes.stories.tsx');
  fs.writeFileSync(storyPath, updatedContent, 'utf-8');

  console.log('\n✨ ReleaseNotes.stories.tsx updated successfully!');
  console.log('\n💡 Next steps:');
  console.log('   1. Review the changes in src/stories/ReleaseNotes.stories.tsx');
  console.log('   2. Check your Storybook to see the new release notes');
  console.log('   3. Delete release-notes.json if everything looks good');
  console.log('   4. Commit the changes');

  // Show summary
  const versions = Object.keys(releaseNotesJson);
  const totalChanges = Object.values(releaseNotesJson).reduce(
    (sum, changes) => sum + changes.length,
    0
  );

  console.log('\n📊 Summary:');
  console.log(`   - Versions added: ${versions.join(', ')}`);
  console.log(`   - Total changes: ${totalChanges}`);
}

// Run the script
if (require.main === module) {
  updateReleaseNotesStory();
}

module.exports = { updateReleaseNotesStory };
