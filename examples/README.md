# Examples

This directory contains example implementations of the Navigation Router library.

## Basic Example

Simple routing with static paths:

```jsx
import { Router, Route, Link } from "07-navegation-router";

function App() {
  return (
    <Router>
      <Route path="/" Component={Home} />
      <Route path="/about" Component={About} />
      <Route path="/404" Component={NotFound} />
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link to="/about">About</Link>
      </nav>
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

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}
```

## Dynamic Routes Example

Using route parameters:

```jsx
import { Router, Route, Link } from "07-navegation-router";

function App() {
  return (
    <Router>
      <Route path="/" Component={ProductList} />
      <Route path="/products/:id" Component={ProductDetail} />
      <Route path="/users/:userId/posts/:postId" Component={UserPost} />
    </Router>
  );
}

function ProductList() {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        <li>
          <Link to="/products/1">Product 1</Link>
        </li>
        <li>
          <Link to="/products/2">Product 2</Link>
        </li>
        <li>
          <Link to="/products/3">Product 3</Link>
        </li>
      </ul>
    </div>
  );
}

function ProductDetail({ routeParams }) {
  const { id } = routeParams;

  return (
    <div>
      <h1>Product {id}</h1>
      <p>Details for product {id}</p>
      <Link to="/">Back to Products</Link>
    </div>
  );
}

function UserPost({ routeParams }) {
  const { userId, postId } = routeParams;

  return (
    <div>
      <h1>
        User {userId} - Post {postId}
      </h1>
      <Link to="/">Home</Link>
    </div>
  );
}
```

## Lazy Loading Example

Code-splitting routes for better performance:

```jsx
import { Router, Route, Link } from "07-navegation-router";
import { lazy, Suspense } from "react";

// Lazy load components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Router>
      <Route path="/" Component={Home} />
      <Suspense fallback={<LoadingSpinner />}>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/profile" Component={Profile} />
        <Route path="/settings" Component={Settings} />
      </Suspense>
    </Router>
  );
}

function LoadingSpinner() {
  return <div>Loading...</div>;
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  );
}
```

## Programmatic Navigation

Navigating with JavaScript:

```jsx
import { navigate } from "07-navegation-router";

function LoginForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform login logic
    const success = await login();

    if (success) {
      // Navigate to dashboard after successful login
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

## Nested Navigation

Complex navigation structures:

```jsx
import { Router, Route, Link } from "07-navegation-router";

function App() {
  return (
    <Router>
      <Route path="/" Component={Layout} />
      <Route path="/blog" Component={BlogLayout} />
      <Route path="/blog/:slug" Component={BlogPost} />
      <Route path="/404" Component={NotFound} />
    </Router>
  );
}

function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
        </nav>
      </header>
      <main>
        <h1>Welcome</h1>
      </main>
    </div>
  );
}

function BlogLayout() {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        <li>
          <Link to="/blog/first-post">First Post</Link>
        </li>
        <li>
          <Link to="/blog/second-post">Second Post</Link>
        </li>
      </ul>
    </div>
  );
}

function BlogPost({ routeParams }) {
  const { slug } = routeParams;

  return (
    <article>
      <h1>{slug.replace("-", " ")}</h1>
      <Link to="/blog">Back to Blog</Link>
    </article>
  );
}
```

## Full Application Example

Complete app with authentication and protected routes:

```jsx
import { Router, Route, Link, navigate } from "07-navegation-router";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Route
        path="/"
        Component={() => <Home isAuthenticated={isAuthenticated} />}
      />
      <Route
        path="/login"
        Component={() => <Login setAuth={setIsAuthenticated} />}
      />
      <Route
        path="/dashboard"
        Component={() => <Dashboard isAuth={isAuthenticated} />}
      />
      <Route path="/profile/:username" Component={Profile} />
      <Route path="/404" Component={NotFound} />
    </Router>
  );
}

function Home({ isAuthenticated }) {
  return (
    <div>
      <h1>Welcome</h1>
      {isAuthenticated ? (
        <Link to="/dashboard">Go to Dashboard</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

function Login({ setAuth }) {
  const handleLogin = (e) => {
    e.preventDefault();
    setAuth(true);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <button type="submit">Sign In</button>
    </form>
  );
}

function Dashboard({ isAuth }) {
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  if (!isAuth) return null;

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/profile/john">View Profile</Link>
    </div>
  );
}

function Profile({ routeParams }) {
  const { username } = routeParams;

  return (
    <div>
      <h1>Profile: {username}</h1>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default App;
```

## Best Practices

1. **Always define a 404 route** for unmatched paths
2. **Use lazy loading** for large components to improve performance
3. **Validate route parameters** before using them
4. **Handle navigation errors** gracefully
5. **Use semantic URLs** that are descriptive and readable
6. **Implement loading states** when using lazy loading
7. **Consider authentication** for protected routes
8. **Test your routes** thoroughly

## Tips

- Route order matters - more specific routes should come before dynamic ones
- Use the `navigate` function for programmatic navigation
- Combine with React Context for global state management
- Use URL parameters for shareable, bookmarkable content
