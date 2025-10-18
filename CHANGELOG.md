# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- PropTypes validation for all components
- JSDoc documentation for better IDE support
- MIT License file
- Comprehensive .npmignore configuration
- Enhanced package.json metadata for better npm discoverability

### Changed

- Refactored Router component with useMemo for better performance
- Cleaned up code with better comments and documentation
- Updated peerDependencies to support React >= 18.0.0

### Fixed

- React linting warnings about ref usage during render
- Component prop validation issues

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
