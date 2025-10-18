import { Router, Route, Link } from '07-navegation-router'

/**
 * Basic Example - Simple static routes
 */
export function BasicExample() {
  return (
    <Router>
      <Route path="/" Component={Home} />
      <Route path="/about" Component={About} />
      <Route path="/contact" Component={Contact} />
      <Route path="/404" Component={NotFound} />
    </Router>
  )
}

function Home() {
  return (
    <div>
      <h1>🏠 Home Page</h1>
      <p>Welcome to the basic routing example!</p>
      <nav>
        <Link to="/about">About</Link> | <Link to="/contact">Contact</Link>
      </nav>
    </div>
  )
}

function About() {
  return (
    <div>
      <h1>ℹ️ About Us</h1>
      <p>Learn more about this routing library.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  )
}

function Contact() {
  return (
    <div>
      <h1>📧 Contact</h1>
      <p>Get in touch with us!</p>
      <Link to="/">← Back to Home</Link>
    </div>
  )
}

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  )
}

export default BasicExample
