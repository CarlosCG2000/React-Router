# Contributing to Navigation Router

First off, thank you for considering contributing to Navigation Router! It's people like you that make this library better for everyone.

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. Please be kind and courteous to others.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, links, etc.)
- **Describe the behavior you observed** and what you expected
- **Include screenshots or GIFs** if applicable
- **Specify your environment** (OS, Node version, React version, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **A clear and descriptive title**
- **A detailed description** of the proposed enhancement
- **Examples** of how it would be used
- **Why this enhancement would be useful** to most users

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** with clear, descriptive commits
4. **Test your changes**: `npm test`
5. **Ensure code quality**: Code should follow the existing style
6. **Update documentation** if needed (README, examples, etc.)
7. **Submit your pull request** with a clear description

## Development Process

### Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/React-Router.git
cd React-Router

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure

```
navegation-router/
├── src/
│   ├── components/      # Main components (Router, Route, Link)
│   ├── utils/           # Utility functions
│   └── index.jsx        # Main export file
├── lib/                 # Compiled output (generated)
├── examples/            # Usage examples
└── tests/               # Test files
```

### Code Style

- Use **functional components** and React hooks
- Follow **ES6+ syntax**
- Write **clear, descriptive variable names**
- Add **comments** for complex logic
- Use **PropTypes** for component props
- Keep components **small and focused**

### Commit Messages

Write clear, concise commit messages:

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests when relevant

Examples:

```
Add lazy loading support for routes
Fix navigation bug in Safari
Update README with new examples
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

Please add tests for new features and ensure all tests pass before submitting a PR.

### Building

```bash
# Build the library
npm run prepare

# This will:
# 1. Compile JSX files with SWC
# 2. Copy necessary files
# 3. Clean up unnecessary files
```

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] Self-review of your code completed
- [ ] Comments added for complex areas
- [ ] Documentation updated (if applicable)
- [ ] Tests added/updated and all passing
- [ ] No new warnings or errors introduced
- [ ] Changes work in development (`npm run dev`)
- [ ] Changes work when built (`npm run prepare`)

## Release Process

(For maintainers)

1. Update version in `package.json`
2. Update `CHANGELOG.md` with new version
3. Commit changes: `git commit -m "Release v0.x.x"`
4. Create tag: `npm version [patch|minor|major]`
5. Push changes and tags: `git push && git push --tags`
6. Publish to npm: `npm publish`

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## Recognition

Contributors will be recognized in the README and release notes.

---

**Thank you for contributing! 🚀**
