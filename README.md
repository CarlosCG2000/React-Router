# 🚀 Navigation Router

[![npm version](https://img.shields.io/npm/v/07-navegation-router.svg)](https://www.npmjs.com/package/07-navegation-router)
[![npm downloads](https://img.shields.io/npm/dm/07-navegation-router.svg)](https://www.npmjs.com/package/07-navegation-router)
[![License](https://img.shields.io/npm/l/07-navegation-router.svg)](https://github.com/carloscg00/navegation-router/blob/main/LICENSE)
[![CI](https://github.com/CarlosCG2000/React-Router/actions/workflows/ci.yml/badge.svg)](https://github.com/CarlosCG2000/React-Router/actions/workflows/ci.yml)
[![GitHub Pages](https://github.com/CarlosCG2000/React-Router/actions/workflows/pages.yml/badge.svg)](https://carloscg2000.github.io/React-Router/)

A lightweight, modern, and powerful **React routing library** built from scratch. Create single-page applications (SPAs) with declarative routing, dynamic parameters, lazy loading, and full browser history support.

> 📚 **[View Full Documentation](https://carloscg2000.github.io/React-Router/)** | **[Live Examples](https://carloscg2000.github.io/React-Router/)** | **[API Reference](#-api-reference)**

## ✨ Features

- 🎯 **Declarative Routing** - Define routes with intuitive `<Router>`, `<Route>`, and `<Link>` components
- 🔗 **Dynamic Parameters** - Support for route parameters using `path-to-regexp`
- ⚡ **Lazy Loading** - Code-split your routes for optimal performance
- 🔄 **Browser History** - Full support for browser back/forward navigation
- 🎨 **404 Handling** - Built-in support for default/fallback routes
- 🛡️ **Error Boundaries** - Graceful error handling with `RouterErrorBoundary`
- 🧪 **Well Tested** - 28 comprehensive tests with Vitest and Testing Library
- 📦 **Lightweight** - Only **5.9 kB** (gzipped) with minimal dependencies
- 🔧 **TypeScript Support** - Full TypeScript definitions included
- 📝 **JSDoc Comments** - Complete inline documentation
- 🚀 **Production Ready** - Battle-tested and optimized for performance
- 🌍 **i18n Support** - Internationalization-friendly routing patterns

## 📦 Installation

```bash
npm install 07-navegation-router
```

```bash
yarn add 07-navegation-router
```

```bash
pnpm add 07-navegation-router
```

## � Documentation & Examples

**🌐 Full documentation and interactive examples are available on our GitHub Pages site:**

### 👉 **[https://carloscg2000.github.io/React-Router/](https://carloscg2000.github.io/React-Router/)**

The documentation site includes:

- 📖 **Complete API Documentation** - Detailed guides for all components
- 💻 **Interactive Examples** - Try the router live in your browser
- 🎯 **Basic Routing Example** - Get started quickly
- 🔗 **Dynamic Routes Example** - Learn parameter handling
- 🛡️ **Error Handling Example** - Robust error boundary patterns
- ⚡ **Performance Benchmarks** - See how fast the router is
- 📝 **TypeScript Support** - Full type definitions and examples

## �🚀 Quick Start

```jsx
import { Router, Route, Link } from "07-navegation-router";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users/123">User Profile</Link>
      </nav>

      <Route path="/" Component={Home} />
      <Route path="/about" Component={About} />
      <Route path="/users/:id" Component={UserProfile} />
      <Route path="/404" Component={NotFound} />
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/about">Go to About</Link>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About Page</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

function UserProfile({ routeParams }) {
  // Access route parameters
  return <h1>User Profile #{routeParams.id}</h1>;
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}
```

## 📖 API Reference

### `<Router>`

The main container component that enables routing in your application.

```jsx
<Router defaultComponent={NotFound}>{/* Your routes go here */}</Router>
```

**Props:**

- `defaultComponent` (React.Component, optional): Component to render when no route matches (404 handler)
- `routes` (Array, optional): Array of route objects for programmatic routing
- `children` (React.Node): Route components

### `<Route>`

Defines a route with a specific path and component to render.

**Props:**

- `path` (string): The URL path pattern (supports parameters like `/users/:id`)
- `Component` (React.Component): The component to render when the path matches

```jsx
<Route path="/products/:id" Component={ProductDetail} />
```

**Route Parameters:**

The matched component receives `routeParams` as a prop:

```jsx
function ProductDetail({ routeParams }) {
  const { id } = routeParams;
  return <h1>Product {id}</h1>;
}
```

### `<Link>`

Declarative navigation component for client-side routing without page reloads.

**Props:**

- `to` (string): The destination path
- `target` (string, optional): Link target attribute (e.g., `_blank`)
- Any other props are passed to the underlying `<a>` element

```jsx
<Link to="/about">About Us</Link>
<Link to="/docs" target="_blank">Documentation</Link>
<Link to="/contact" className="nav-link">Contact</Link>
```

### `navigate(path)`

Programmatic navigation function for imperatively changing routes.

```jsx
import { navigate } from "07-navegation-router";

function handleLogin() {
  // Perform login logic
  navigate("/dashboard");
}
```

### `<RouterErrorBoundary>`

Error boundary component for catching and handling routing errors gracefully.

**Props:**

- `fallback` (React.Component | React.Element, optional): Custom error fallback UI
- `children` (React.Node): Components to wrap

```jsx
import { Router, Route, RouterErrorBoundary } from "07-navegation-router";

function App() {
  return (
    <RouterErrorBoundary fallback={<ErrorPage />}>
      <Router>
        <Route path="/" Component={Home} />
        <Route path="/error" Component={BuggyComponent} />
      </Router>
    </RouterErrorBoundary>
  );
}

function ErrorPage({ error, resetError }) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
      <button onClick={resetError}>Try again</button>
    </div>
  );
}
```

## 🎯 Advanced Usage

### Dynamic Route Parameters

Access route parameters in your components:

```jsx
import { Router, Route, Link } from "07-navegation-router";

function App() {
  return (
    <Router>
      <Route path="/blog/:slug" Component={BlogPost} />
      <Route path="/users/:userId/posts/:postId" Component={UserPost} />
    </Router>
  );
}

function BlogPost({ routeParams }) {
  const { slug } = routeParams;
  return <article>Post: {slug}</article>;
}

function UserPost({ routeParams }) {
  const { userId, postId } = routeParams;
  return (
    <div>
      User {userId}, Post {postId}
    </div>
  );
}
```

### Lazy Loading Routes

Improve performance by code-splitting your routes:

```jsx
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/dashboard" Component={Dashboard} />
      </Suspense>
    </Router>
  );
}
```

### 404 Fallback Routes

Define a default route for unmatched paths:

```jsx
<Router>
  <Route path="/" Component={Home} />
  <Route path="/about" Component={About} />
  <Route path="/404" Component={NotFound} />
</Router>
```

### Programmatic Navigation

Use the `navigate` function for imperative routing:

```jsx
import { navigate } from "07-navegation-router";

function LoginForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login();
    if (success) {
      navigate("/dashboard");
      window.scrollTo(0, 0); // Optional: scroll to top
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

// Navigate with state
function goToProfile() {
  navigate("/profile");
  // The navigation event is automatically dispatched
}
```

### Error Handling

Protect your routes with error boundaries:

```jsx
import { RouterErrorBoundary, Router, Route } from "07-navegation-router";

function App() {
  return (
    <RouterErrorBoundary
      fallback={({ error, resetError }) => (
        <div>
          <h2>Oops! Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <pre>{error.message}</pre>
          </details>
          <button onClick={resetError}>Reset</button>
          <button onClick={() => navigate("/")}>Go Home</button>
        </div>
      )}
    >
      <Router>
        <Route path="/" Component={Home} />
        <Route path="/risky" Component={RiskyComponent} />
      </Router>
    </RouterErrorBoundary>
  );
}
```

### TypeScript Support

Full TypeScript definitions are included:

```typescript
import {
  Router,
  Route,
  Link,
  navigate,
  RouterErrorBoundary,
} from "07-navegation-router";
import type { RouteParams, RouteComponentProps } from "07-navegation-router";

interface UserProfileProps extends RouteComponentProps {
  routeParams: {
    id: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ routeParams }) => {
  return <h1>User {routeParams.id}</h1>;
};

// Type-safe navigation
navigate("/users/123");
```

## 🏗️ Project Structure

```
navegation-router/
├── src/
│   ├── components/
│   │   ├── Router.jsx          # Main router component
│   │   ├── Route.jsx           # Route definition component
│   │   ├── Link.jsx            # Navigation link component
│   │   ├── ErrorBoundary.jsx   # Error boundary component
│   │   ├── Router.test.jsx     # Router tests (13 tests)
│   │   ├── Link.test.jsx       # Link tests (10 tests)
│   │   └── Route.test.jsx      # Route tests (5 tests)
│   ├── utils/
│   │   ├── consts.js           # Constants
│   │   ├── getCurrentPath.js   # Path utility
│   │   └── navigation.js       # Navigation utilities
│   ├── index.jsx               # Main entry point
│   └── navigation.js           # Navigation exports
├── lib/                        # Compiled output (published to npm)
├── docs/                       # Documentation site
├── examples/                   # Interactive examples
├── benchmarks/                 # Performance benchmarks
├── .github/workflows/          # CI/CD pipelines
│   ├── ci.yml                  # Test & lint automation
│   └── pages.yml               # GitHub Pages deployment
├── package.json
├── LICENSE                     # MIT License
├── CHANGELOG.md               # Version history
├── CONTRIBUTING.md            # Contribution guidelines
└── README.md
```

## 🧪 Testing

This library is thoroughly tested using:

- **Vitest** - Fast unit test framework
- **Happy DOM** - Lightweight DOM implementation
- **Testing Library** - React component testing utilities

**Test Coverage:**

- ✅ 28 tests passing
- ✅ Router component (13 tests)
- ✅ Link component (10 tests)
- ✅ Route component (5 tests)

```bash
npm run test        # Run tests once
npm run test:watch  # Watch mode
npm run test:ui     # UI mode
npm run bench       # Run performance benchmarks
```

## 📊 Performance

Benchmarks show excellent performance:

- **Route Matching**: ~0.05ms per route
- **Bundle Size**: 5.9 kB gzipped
- **Tree-shakeable**: Import only what you need

Run benchmarks yourself:

```bash
npm run bench
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build the library
npm run prepare

# Run tests
npm run test
```

## 📝 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Write tests for your changes
4. Ensure all tests pass (`npm test`)
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Carlos Caño Gómez**

- GitHub: [@CarlosCG2000](https://github.com/CarlosCG2000)
- npm: [07-navegation-router](https://www.npmjs.com/package/07-navegation-router)

## 📚 Resources & Links

### 🌐 Documentation

- 📖 **[Official Documentation Site](https://carloscg2000.github.io/React-Router/)** - Complete guides and API reference
- 💻 **[Interactive Examples](https://carloscg2000.github.io/React-Router/)** - Try the router in your browser
- � **[Changelog](CHANGELOG.md)** - Version history and updates

### �📦 Package

- 📦 **[npm Package](https://www.npmjs.com/package/07-navegation-router)** - Install from npm registry
- � **[GitHub Repository](https://github.com/CarlosCG2000/React-Router)** - Source code

### 🤝 Community

- �🐛 **[Report Issues](https://github.com/CarlosCG2000/React-Router/issues)** - Bug reports and feature requests
- 💡 **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- ⭐ **[Star on GitHub](https://github.com/CarlosCG2000/React-Router)** - Show your support!

### 🚀 CI/CD

- ✅ **[CI Pipeline](https://github.com/CarlosCG2000/React-Router/actions/workflows/ci.yml)** - Automated testing
- 📄 **[Pages Deployment](https://github.com/CarlosCG2000/React-Router/actions/workflows/pages.yml)** - Documentation site status

## 🙏 Acknowledgments

- **Special thanks to [Midudev](https://github.com/midudev)** for his invaluable educational content and didactic approach to teaching React and modern web development. His tutorials and courses were a significant inspiration for this project.
- Inspired by React Router and modern routing libraries
- Built with modern React best practices and hooks
- Powered by `path-to-regexp` for advanced pattern matching
- Tested with Vitest and React Testing Library
- Compiled with SWC for blazing-fast builds

### 🎓 Learning Resources

- [Midudev's YouTube Channel](https://www.youtube.com/@midudev) - Excellent React tutorials in Spanish
- [Midudev's Courses](https://midu.dev) - In-depth web development courses

## 🔄 Version History

See [CHANGELOG.md](CHANGELOG.md) for a detailed version history.

**Latest Release: v0.3.1**

- ✅ TypeScript definitions
- ✅ Error boundary support
- ✅ 28 comprehensive tests
- ✅ Performance benchmarks
- ✅ Interactive examples
- ✅ CI/CD automation

## 🔗 Related Projects

- [React Router](https://reactrouter.com/) - The most popular React routing library
- [Wouter](https://github.com/molefrog/wouter) - Minimalist routing for React
- [Reach Router](https://reach.tech/router/) - Accessible routing library

## 📊 Keywords

react, router, routing, spa, single-page-application, navigation, react-router, client-side-routing, declarative-routing, dynamic-routes, lazy-loading, history-api, browser-history, lightweight-router, minimal-router

---

## 🌟 Ready to Get Started?

Visit our **[Documentation Site](https://carloscg2000.github.io/React-Router/)** for:

- 📖 Complete guides and tutorials
- 💻 Live, interactive examples you can try in your browser
- 🎯 Step-by-step implementation guides
- 🛡️ Best practices and patterns
- ⚡ Performance optimization tips

**Made with ❤️ by Carlos Caño Gómez**

If you find this project useful, please consider:

- ⭐ Starring the [GitHub Repository](https://github.com/CarlosCG2000/React-Router)
- 📢 Sharing it with other developers
- 🐛 [Reporting issues](https://github.com/CarlosCG2000/React-Router/issues) to help improve it
- 🤝 [Contributing](CONTRIBUTING.md) to the project

**Happy routing! 🚀**
