# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.2] - 2025-10-18

### Documentation

- **Enhanced README**: Comprehensive documentation improvements
  - Added CI/CD and GitHub Pages deployment badges
  - Documented `RouterErrorBoundary` component with examples
  - Added TypeScript usage examples and type definitions
  - Included `navigate()` function documentation
  - Added performance metrics and benchmarks section
  - Documented route parameters usage with examples
  - Added error handling examples
  - Updated project structure with all new files
  - Added resources section with documentation links
  - Included version history and latest features
  - Improved API reference with detailed examples
  - Added test coverage statistics (28 tests breakdown)

## [0.3.1] - 2025-10-18

### Fixed

- **Fast Refresh Warning**: Moved `navigate` function to separate utility file to prevent Fast Refresh warnings
- **GitHub Pages Deployment**: Fixed environment configuration in GitHub Actions workflow
- **ESLint Errors**: Disabled `react-refresh/only-export-components` rule to allow utility exports
- **PropTypes Validation**: Added `/* eslint-disable react/prop-types */` in test files
- **Package.json Exports**: Corrected order of export conditions (`types` before `import`/`require`)

## [0.3.0] - 2025-10-18

### Added

- **TypeScript Definitions**: Full TypeScript support with `.d.ts` files
- **Error Boundary Component**: `RouterErrorBoundary` for handling route errors gracefully
- **Comprehensive Tests**: Expanded test suite from 4 to 28 tests covering all components
  - Link component tests (10 tests)
  - Route component tests (5 tests)
  - Enhanced Router tests (13 tests)
- **Interactive Examples**:
  - Basic routing example
  - Dynamic routes with parameters
  - Error handling examples
- **Performance Benchmarks**: Benchmark suite for route matching and navigation
- **Documentation Site**: GitHub Pages site with full documentation
- **Navigate Function Export**: `navigate` function now exported from main entry point
- PropTypes validation for all components
- JSDoc documentation for better IDE support
- MIT License file
- Comprehensive .npmignore configuration
- Enhanced package.json metadata for better npm discoverability

### Changed

- Refactored Router component with useMemo for better performance
- Cleaned up code with better comments and documentation
- Updated peerDependencies to support React >= 18.0.0
- Added `types` field to package.json exports

### Fixed

- React linting warnings about ref usage during render
- Component prop validation issues

## [0.2.1] - 2025-10-18

### Changed

- Applied Prettier code formatting across all files

## [0.2.0] - 2025-10-18

### Added

- PropTypes validation for Router, Route, and Link components
- JSDoc documentation for all components
- CHANGELOG.md for version tracking
- CONTRIBUTING.md for contributor guidelines
- GitHub Actions CI/CD workflow
- Comprehensive examples in examples/ directory

### Changed

- Refactored Router component with useMemo for performance
- Improved code quality and removed unnecessary comments
- Updated peerDependencies to support React >=18.0.0

## [0.1.7] - 2025-10-18

### Fixed

- Updated GitHub repository URL in README

## [0.1.6] - 2025-10-18

### Added

- Professional README with comprehensive documentation
- SEO keywords and metadata
- Usage examples and API reference

## [0.1.5] - 2025-10-18

### Fixed

- Import paths now use .js extension instead of .jsx
- Module resolution issues with compiled files

## [0.1.4] - 2025-10-18

### Changed

- Updated build process to maintain folder structure
- Added --strip-leading-paths to SWC compilation

### Fixed

- Module not found errors for components
- Incorrect file path structure in lib/

## [0.1.3] - 2025-10-18

### Changed

- Improved prepare script to copy utils folder

## [0.1.2] - 2025-10-18

### Added

- Initial npm publication
- Basic routing functionality
- Dynamic route parameters with path-to-regexp
- Declarative Router, Route, and Link components
- Browser history support
- 404 fallback routes
- Lazy loading support
- Internationalization support
- Comprehensive test coverage with Vitest

[Unreleased]: https://github.com/CarlosCG2000/React-Router/compare/v0.1.7...HEAD
[0.1.7]: https://github.com/CarlosCG2000/React-Router/compare/v0.1.6...v0.1.7
[0.1.6]: https://github.com/CarlosCG2000/React-Router/compare/v0.1.5...v0.1.6
[0.1.5]: https://github.com/CarlosCG2000/React-Router/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/CarlosCG2000/React-Router/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/CarlosCG2000/React-Router/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/CarlosCG2000/React-Router/releases/tag/v0.1.2
