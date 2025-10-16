# Release Notes Automation Scripts

This directory contains scripts to automate the generation of release notes from git commits.

## 📁 Files

### `generate-release-notes.js`
Parses git commits since the last tag and generates a `release-notes.json` file.

**What it does:**
1. Finds the latest git tag
2. Gets all commits since that tag
3. Parses each commit using Conventional Commits format
4. Filters commits by type (includes feat, fix, style, refactor, perf)
5. Generates a JSON file with the changes

**Usage:**
```bash
npm run generate-release-notes
```

**Output:**
Creates `release-notes.json` at the project root:
```json
{
  "1.19.1": [
    {
      "type": "fix",
      "component": "Button",
      "description": "Fix loading state animation"
    }
  ]
}
```

### `update-release-notes-story.js`
Updates the Storybook ReleaseNotes.stories.tsx file with the generated release notes.

**What it does:**
1. Reads `release-notes.json`
2. Formats the data as TypeScript code
3. Inserts it into the `releaseNotes` array in ReleaseNotes.stories.tsx

**Usage:**
```bash
npm run update-release-notes
```

**Output:**
Updates `src/stories/ReleaseNotes.stories.tsx` with new release entries.

## 🚀 Quick Start

### Combined Command (Recommended)
```bash
npm run release-notes
```

This runs both scripts in sequence:
1. `generate-release-notes` - Parse commits
2. `update-release-notes` - Update Storybook

### Manual Process
```bash
# Step 1: Generate JSON from commits
npm run generate-release-notes

# Step 2: Review/edit release-notes.json if needed
cat release-notes.json

# Step 3: Update Storybook file
npm run update-release-notes

# Step 4: Clean up (optional)
rm release-notes.json
```

## 📝 Commit Format Requirements

Scripts parse commits following [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

**Examples:**
```bash
feat(Button): add loading props
fix(Switch): remove required on isActive
style(Alert): update error icon
feat: use tokens package
```

## 🗺️ Type Mapping

| Git Commit Type | Release Note Type | Included? |
|----------------|-------------------|-----------|
| `feat` | `enhancement` | ✅ Yes |
| `fix` | `fix` | ✅ Yes |
| `style` | `style` | ✅ Yes |
| `refactor` | `enhancement` | ✅ Yes |
| `perf` | `enhancement` | ✅ Yes |
| `test` | - | ❌ No |
| `docs` | - | ❌ No |
| `build` | - | ❌ No |
| `ci` | - | ❌ No |
| `chore` | - | ❌ No |

## 🔧 Customization

### Adding New Types

Edit `generate-release-notes.js`:

```javascript
const typeMapping = {
  feat: 'enhancement',
  fix: 'fix',
  style: 'style',
  yournewtype: 'new',  // Add here
  // ...
};
```

### Changing Commit Range

By default, scripts parse commits since the last tag. To customize:

```javascript
// In generate-release-notes.js
const commits = getCommitsSinceTag('v1.18.0', 'HEAD'); // Specific range
```

### Manual Edits to JSON

You can manually edit `release-notes.json` before running `update-release-notes`:

```json
{
  "1.19.1": [
    {
      "type": "new",  // Changed from "enhancement" to "new"
      "component": "Skeleton",
      "description": "Complete loading state component"
    }
  ]
}
```

## 🐛 Troubleshooting

### "No tags found"
**Problem:** Project has no git tags yet.

**Solution:** Script will parse all commits. Create a tag:
```bash
git tag v1.0.0
git push origin v1.0.0
```

### "No commits found"
**Problem:** No commits since last tag.

**Solution:** Make some commits with proper format:
```bash
git commit -m "feat(Button): add new feature"
```

### "Could not find releaseNotes array"
**Problem:** ReleaseNotes.stories.tsx structure changed.

**Solution:** Ensure file has this pattern:
```typescript
const releaseNotes: ReleaseNote[] = [
  // entries here
];
```

### Invalid Commit Format
**Problem:** Commits don't follow conventional format.

**Solution:**
- Future commits: Use proper format (enforced by commitlint)
- Past commits: Manually create `release-notes.json`

## 📋 Complete Release Workflow

```bash
# 1. Ensure commits follow conventional format
git log --oneline -10

# 2. Update version
npm version patch  # or minor/major

# 3. Generate and update release notes
npm run release-notes

# 4. Review changes
git diff src/stories/ReleaseNotes.stories.tsx

# 5. Commit release
git add .
git commit -m "chore: release v$(node -p "require('./package.json').version")"

# 6. Tag and push
git tag "v$(node -p "require('./package.json').version")"
git push origin main --tags

# 7. Publish (if applicable)
npm publish
```

## 🎯 Best Practices

1. **Always review** the generated `release-notes.json` before updating Storybook
2. **Delete** `release-notes.json` after updating (it's gitignored)
3. **Check Storybook** locally to verify the release notes display correctly
4. **Commit frequently** with proper format during development
5. **Create tags** regularly to mark release points

## 📚 Related Documentation

- [COMMIT_GUIDELINES.md](../COMMIT_GUIDELINES.md) - Commit format reference
- [README.md](../README.md#commit-conventions) - Main documentation

---

For questions or issues, please refer to the main project documentation or create an issue.
