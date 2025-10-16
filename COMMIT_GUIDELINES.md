# Commit Guidelines - Quick Reference

## 📝 Commit Message Format

```
<type>(<scope>): <description>
```

## 🏷️ Types

| Type | Usage | Release Notes |
|------|-------|---------------|
| `feat` | New feature or enhancement | ✅ Included as "enhancement" |
| `fix` | Bug fix | ✅ Included as "fix" |
| `style` | Visual/CSS changes | ✅ Included as "style" |
| `refactor` | Code refactoring | ✅ Included as "enhancement" |
| `perf` | Performance improvement | ✅ Included as "enhancement" |
| `test` | Tests only | ❌ Not included |
| `docs` | Documentation only | ❌ Not included |
| `build` | Build system changes | ❌ Not included |
| `ci` | CI/CD changes | ❌ Not included |
| `chore` | Maintenance tasks | ❌ Not included |

## 🎯 Scope

- Use **PascalCase** for component names: `Button`, `TextField`, `DatePicker`, etc.
- Omit scope for global changes

## ✅ Good Examples

```bash
# Component enhancement
feat(Button): add loading state with spinner

# Component fix
fix(Switch): remove required from isActive prop

# Style change
style(Alert): update error icon color to improve contrast

# Global change (no scope)
feat: integrate design tokens package

# Performance improvement
perf(Table): optimize rendering with virtualization

# Refactoring
refactor(DatePicker): extract calendar logic to custom hook
```

## ❌ Bad Examples

```bash
# Missing type
Button: add loading state

# Wrong scope case
feat(button): add loading state

# Vague description
fix: stuff

# Type doesn't match change
feat: fix button color

# Missing description
feat(Button):
```

## 🚀 Release Workflow

### 1. Make Changes & Commit

```bash
# Work on your feature
git checkout -b feat/button-loading

# Make changes and commit with proper format
git add .
git commit -m "feat(Button): add loading state with spinner"
```

### 2. Before Creating a Release

```bash
# Update version in package.json
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0
```

### 3. Generate Release Notes

```bash
# This will:
# - Parse commits since last tag
# - Generate release-notes.json
# - Update src/stories/ReleaseNotes.stories.tsx
npm run release-notes
```

### 4. Review & Commit

```bash
# Check the generated release notes
# Open src/stories/ReleaseNotes.stories.tsx

# If OK, commit
git add .
git commit -m "chore: release v1.x.x"
git tag v1.x.x
git push origin main --tags
```

## 🎨 Mapping to Release Notes

Your commits will automatically appear in Storybook:

| Commit | → | Release Note |
|--------|---|--------------|
| `feat(Button): add loading props` | → | **Enhancement** - Button: Add loading props |
| `fix(Switch): remove required` | → | **Fix** - Switch: Remove required |
| `style(Alert): update icons` | → | **Style** - Alert: Update icons |
| `feat: use tokens package` | → | **New** - Use tokens package |

## 💡 Tips

1. **Be specific**: Describe what changed, not how
   - ✅ `feat(Button): add loading state`
   - ❌ `feat(Button): update code`

2. **Use imperative mood**: "add", not "added" or "adds"
   - ✅ `fix(TextField): remove focus outline`
   - ❌ `fix(TextField): removed focus outline`

3. **Keep it short**: Max 72 characters for the first line
   - ✅ `feat(DatePicker): add week granularity`
   - ❌ `feat(DatePicker): add the ability to select dates by week in addition to the existing day, month, and year options`

4. **One logical change per commit**
   - ✅ Separate commits for separate features
   - ❌ One commit with multiple unrelated changes

## 🔍 Validation

Commits are automatically validated. Invalid commits will show an error:

```bash
❌ subject may not be empty [subject-empty]
❌ type may not be empty [type-empty]
❌ scope must be in PascalCase [scope-case]
```

## 📚 More Information

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

---

**Questions?** Check the full documentation in [README.md](./README.md#commit-conventions)
