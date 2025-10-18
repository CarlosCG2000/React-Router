import PropTypes from 'prop-types'

/**
 * Route component - Declarative route definition
 * This component doesn't render anything directly. It's used by Router to define routes.
 * @param {Object} props
 * @param {string} props.path - URL path pattern (e.g., "/", "/about", "/users/:id")
 * @param {React.Component} props.Component - Component to render when path matches
 */
// eslint-disable-next-line no-unused-vars
export function Route({ path, Component }) {
    return null
}

Route.propTypes = {
    path: PropTypes.string.isRequired,
    Component: PropTypes.elementType.isRequired
}
