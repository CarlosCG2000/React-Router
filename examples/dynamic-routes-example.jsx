import { Router, Route, Link } from '07-navegation-router'

/**
 * Dynamic Routes Example - Using URL parameters
 */
export function DynamicRoutesExample() {
  return (
    <Router>
      <Route path="/" Component={ProductList} />
      <Route path="/products/:id" Component={ProductDetail} />
      <Route path="/categories/:category" Component={CategoryView} />
      <Route path="/users/:userId/posts/:postId" Component={UserPost} />
    </Router>
  )
}

function ProductList() {
  const products = [
    { id: 1, name: 'Laptop', category: 'electronics' },
    { id: 2, name: 'Coffee Maker', category: 'appliances' },
    { id: 3, name: 'Running Shoes', category: 'sports' }
  ]

  return (
    <div>
      <h1>🛍️ Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              {product.name}
            </Link>
            {' '}
            (<Link to={`/categories/${product.category}`}>
              {product.category}
            </Link>)
          </li>
        ))}
      </ul>
      <h3>Multi-parameter example:</h3>
      <Link to="/users/john/posts/hello-world">
        View John's "Hello World" post
      </Link>
    </div>
  )
}

function ProductDetail({ routeParams }) {
  const { id } = routeParams || {}

  return (
    <div>
      <h1>📦 Product #{id}</h1>
      <p>Displaying details for product with ID: {id}</p>
      <Link to="/">← Back to Products</Link>
    </div>
  )
}

function CategoryView({ routeParams }) {
  const { category } = routeParams || {}

  return (
    <div>
      <h1>📂 Category: {category}</h1>
      <p>Showing all products in the "{category}" category</p>
      <Link to="/">← Back to Products</Link>
    </div>
  )
}

function UserPost({ routeParams }) {
  const { userId, postId } = routeParams || {}

  return (
    <div>
      <h1>📝 {postId}</h1>
      <p>Post by user: {userId}</p>
      <p>Post slug: {postId}</p>
      <Link to="/">← Back to Home</Link>
    </div>
  )
}

export default DynamicRoutesExample
