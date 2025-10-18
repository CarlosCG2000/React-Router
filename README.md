# 🚀 Navigation Router

[![npm version](https://img.shields.io/npm/v/07-navegation-router.svg)](https://www.npmjs.com/package/07-navegation-router)
[![npm downloads](https://img.shields.io/npm/dm/07-navegation-router.svg)](https://www.npmjs.com/package/07-navegation-router)
[![License](https://img.shields.io/npm/l/07-navegation-router.svg)](https://github.com/carloscg00/navegation-router/blob/main/LICENSE)

A lightweight, modern, and powerful **React routing library** built from scratch. Create single-page applications (SPAs) with declarative routing, dynamic parameters, lazy loading, and full browser history support.

## ✨ Features

- 🎯 **Declarative Routing** - Define routes with intuitive `<Router>`, `<Route>`, and `<Link>` components
- 🔗 **Dynamic Parameters** - Support for route parameters using `path-to-regexp`
- ⚡ **Lazy Loading** - Code-split your routes for optimal performance
- 🔄 **Browser History** - Full support for browser back/forward navigation
- 🎨 **404 Handling** - Built-in support for default/fallback routes
- 🧪 **Well Tested** - Comprehensive test coverage with Vitest and Testing Library
- 📦 **Lightweight** - Minimal bundle size with zero unnecessary dependencies
- 🔧 **TypeScript Ready** - Full TypeScript support (coming soon)
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

## 🚀 Quick Start

```jsx
import { Router, Route, Link } from "07-navegation-router";

function App() {
  return (
    <Router>
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

function UserProfile() {
  // Access route parameters
  return <h1>User Profile</h1>;
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}
```

## 📖 API Reference

### `<Router>`

The main container component that enables routing in your application.

```jsx
<Router>{/* Your routes go here */}</Router>
```

### `<Route>`

Defines a route with a specific path and component to render.

**Props:**

- `path` (string): The URL path pattern (supports parameters like `/users/:id`)
- `Component` (React.Component): The component to render when the path matches

```jsx
<Route path="/products/:id" Component={ProductDetail} />
```

### `<Link>`

Declarative navigation component for client-side routing without page reloads.

**Props:**

- `to` (string): The destination path

```jsx
<Link to="/about">About Us</Link>
```

## 🎯 Advanced Usage

### Dynamic Route Parameters

```jsx
<Route path="/blog/:slug" Component={BlogPost} />
<Route path="/users/:userId/posts/:postId" Component={UserPost} />
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

```jsx
function handleClick() {
  window.history.pushState({}, "", "/new-path");
  // Trigger navigation
  window.dispatchEvent(new Event("popstate"));
}
```

## 🏗️ Project Structure

```
navegation-router/
├── src/
│   ├── components/
│   │   ├── Router.jsx
│   │   ├── Route.jsx
│   │   └── Link.jsx
│   ├── utils/
│   │   ├── consts.js
│   │   └── getCurrentPath.js
│   └── index.jsx
├── lib/              # Compiled output
├── package.json
└── README.md
```

## 🧪 Testing

This library is thoroughly tested using:

- **Vitest** - Fast unit test framework
- **Happy DOM** - Lightweight DOM implementation
- **Testing Library** - React component testing utilities

```bash
npm run test        # Run tests once
npm run test:watch  # Watch mode
npm run test:ui     # UI mode
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

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Carlos Caño Gómez**

- GitHub: [@CarlosCG2000](https://github.com/CarlosCG2000)

## 🙏 Acknowledgments

- Inspired by React Router and other routing libraries
- Built with modern React practices
- Powered by `path-to-regexp` for advanced pattern matching

## 🔗 Related Projects

- [React Router](https://reactrouter.com/) - The most popular React routing library
- [Wouter](https://github.com/molefrog/wouter) - Minimalist routing for React
- [Reach Router](https://reach.tech/router/) - Accessible routing library

## 📊 Keywords

react, router, routing, spa, single-page-application, navigation, react-router, client-side-routing, declarative-routing, dynamic-routes, lazy-loading, history-api, browser-history, lightweight-router, minimal-router

---

**Made with ❤️ by Carlos Caño Gómez**

If you find this project useful, please consider giving it a ⭐ on [GitHub](https://github.com/CarlosCG2000/React-Router)!
