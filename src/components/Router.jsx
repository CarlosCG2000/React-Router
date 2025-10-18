import { EVENTS } from "../utils/consts"
import { Children, useEffect, useState, useMemo } from "react"
import { match } from "path-to-regexp"
import { getCurrentPath } from "../utils/getCurrentPath"
import PropTypes from 'prop-types'

/**
 * Router component - Main container for declarative routing
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child Route components
 * @param {Array} props.routes - Array of route objects with path and Component
 * @param {React.Component} props.defaultComponent - Fallback component for unmatched routes
 */
export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => null }) {
    const [currentPath, setCurrentPath] = useState(getCurrentPath())

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(getCurrentPath())
        }

        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.addEventListener(EVENTS.POPSTATE, onLocationChange)

        return () => {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
        }
    }, [])

    // Extract routes from children Route components
    const routesFromChildren = useMemo(() => {
        return Children.map(children, ({ props, type }) => {
            const { name } = type
            const isRoute = name === 'Route'

            if (!isRoute) return null
            return props
        })
    }, [children])

    // Concatenate routes from props and children
    const routesToUse = useMemo(() => {
        return routes.concat(routesFromChildren).filter(Boolean)
    }, [routes, routesFromChildren])

    // Find matching route and extract params
    const { Page, routeParams } = useMemo(() => {
        const result = { Page: DefaultComponent, routeParams: {} }
        
        routesToUse.find(({ path }) => {
            if (path === currentPath) {
                result.Page = routesToUse.find(r => r.path === path)?.Component || DefaultComponent
                return true
            }

            // Handle dynamic routes with parameters
            const matcherUrl = match(path, { decode: decodeURIComponent })
            const matched = matcherUrl(currentPath)
            if (!matched) return false

            result.Page = routesToUse.find(r => r.path === path)?.Component || DefaultComponent
            result.routeParams = matched.params
            return true
        })

        return result
    }, [routesToUse, currentPath, DefaultComponent])

    return <Page routeParams={routeParams} />
}

Router.propTypes = {
    children: PropTypes.node,
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            Component: PropTypes.elementType.isRequired
        })
    ),
    defaultComponent: PropTypes.elementType
}