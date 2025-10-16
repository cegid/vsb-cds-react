module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature or enhancement
        'fix',      // Bug fix
        'style',    // Style changes (CSS, design)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'docs',     // Documentation changes
        'build',    // Build system changes
        'ci',       // CI/CD changes
        'chore',    // Other changes (maintenance)
        'revert',   // Revert a previous commit
      ],
    ],
    'scope-case': [2, 'always', 'pascal-case'], // Component names in PascalCase
    'subject-case': [0], // Allow any case for subject
    'subject-empty': [2, 'never'], // Subject is required
    'type-case': [2, 'always', 'lower-case'], // Type must be lowercase
    'type-empty': [2, 'never'], // Type is required
  },
};
