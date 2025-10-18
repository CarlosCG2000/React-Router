/* eslint-disable react/prop-types */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Router } from './Router.jsx'
import { getCurrentPath } from '../utils/getCurrentPath.js'
import { Route } from './Route.jsx'
import { Link } from './Link.jsx'

// Mock del módulo 'getCurrentPath.js'
vi.mock('../utils/getCurrentPath.js', () => ({
    getCurrentPath: vi.fn()
}))

describe('Router', () => {
    // Limpiar el DOM y los mocks antes de cada test
    beforeEach(() => {
        cleanup() // metodo para limpiar la pantalla
        vi.clearAllMocks()
    })

    it('deberia de renderizar sin ningun problema', () => {
        render(<Router routes={[]} />)
        expect(true).toBeTruthy()
    })

    it('deberia de renderizar 404 si no encuentra la ruta', () => {
        render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
        expect(screen.getByText('404')).toBeTruthy() // comprobar que se renderiza el 404
        //console.log(screen.debug())
    })

    it('deberia renderizar el componente con al ruta marcada', () => {
        getCurrentPath.mockReturnValue('/about')

        const routes = [
            {
                path: '/',
                Component: () => <h1>Home</h1>
            },
            {
                path: '/about',
                Component: () => <h1>About</h1>
            }
        ]

        render(<Router routes={routes} />)
        expect(screen.getByText('About')).toBeTruthy() // si pusiera 'Home' fallaria porque la ruta actual que estoy poniendo es '/about'
    })

    it('deberia navegar usando links', async () => {
        getCurrentPath.mockReturnValueOnce('/') // mockReturnValue

        render(
            <Router>
                <Route
                    path='/' Component={() => {
                        return (
                            <>
                                <h1>Home</h1>
                                <Link to='/about'>Go to About</Link>
                            </>
                        )
                    }}
                />
                <Route path='/about' Component={() => <h1>About</h1>} />
            </Router>
        )

        // Click on the link
        const anchor = screen.getByText(/Go to About/)
        fireEvent.click(anchor)

        const aboutTitle = await screen.findByText('About')

        // Check that the new route is rendered
        expect(aboutTitle).toBeTruthy()
    })

    it('should handle dynamic routes with parameters', () => {
        getCurrentPath.mockReturnValue('/users/123')

        const routes = [
            {
                path: '/users/:id',
                Component: ({ routeParams }) => <h1>User {routeParams.id}</h1>
            }
        ]

        render(<Router routes={routes} />)
        expect(screen.getByText('User 123')).toBeTruthy()
    })

    it('should handle multiple parameters in route', () => {
        getCurrentPath.mockReturnValue('/users/123/posts/456')

        const routes = [
            {
                path: '/users/:userId/posts/:postId',
                Component: ({ routeParams }) => (
                    <h1>User {routeParams.userId} Post {routeParams.postId}</h1>
                )
            }
        ]

        render(<Router routes={routes} />)
        expect(screen.getByText('User 123 Post 456')).toBeTruthy()
    })

    it('should render first matching route', () => {
        getCurrentPath.mockReturnValue('/test')

        const routes = [
            {
                path: '/test',
                Component: () => <h1>First</h1>
            },
            {
                path: '/test',
                Component: () => <h1>Second</h1>
            }
        ]

        render(<Router routes={routes} />)
        expect(screen.getByText('First')).toBeTruthy()
        expect(screen.queryByText('Second')).toBeFalsy()
    })

    it('should handle browser back button', async () => {
        getCurrentPath.mockReturnValueOnce('/')

        render(
            <Router>
                <Route path='/' Component={() => <h1>Home</h1>} />
                <Route path='/about' Component={() => <h1>About</h1>} />
            </Router>
        )

        expect(screen.getByText('Home')).toBeTruthy()

        // Simulate navigation
        getCurrentPath.mockReturnValue('/about')
        window.dispatchEvent(new Event('popstate'))

        const aboutTitle = await screen.findByText('About')
        expect(aboutTitle).toBeTruthy()
    })

    it('should update when route changes', async () => {
        getCurrentPath.mockReturnValueOnce('/')

        render(
            <Router>
                <Route path='/' Component={() => <h1>Home</h1>} />
                <Route path='/about' Component={() => <h1>About</h1>} />
            </Router>
        )

        expect(screen.getByText('Home')).toBeTruthy()

        getCurrentPath.mockReturnValue('/about')
        window.dispatchEvent(new Event('pushstate'))

        const aboutTitle = await screen.findByText('About')
        expect(aboutTitle).toBeTruthy()
    })

    it('should pass routeParams to component', () => {
        getCurrentPath.mockReturnValue('/products/abc-123')

        const ProductComponent = ({ routeParams }) => {
            expect(routeParams).toBeDefined()
            expect(routeParams.id).toBe('abc-123')
            return <div>Product {routeParams.id}</div>
        }

        const routes = [
            {
                path: '/products/:id',
                Component: ProductComponent
            }
        ]

        render(<Router routes={routes} />)
        expect(screen.getByText('Product abc-123')).toBeTruthy()
    })

    it('should handle routes from children and props', () => {
        getCurrentPath.mockReturnValue('/child')

        const propsRoutes = [
            {
                path: '/props',
                Component: () => <h1>Props Route</h1>
            }
        ]

        render(
            <Router routes={propsRoutes}>
                <Route path='/child' Component={() => <h1>Child Route</h1>} />
            </Router>
        )

        expect(screen.getByText('Child Route')).toBeTruthy()
    })

    it('should decode URI components in route params', () => {
        getCurrentPath.mockReturnValue('/search/hello%20world')

        const routes = [
            {
                path: '/search/:query',
                Component: ({ routeParams }) => <h1>Search: {routeParams.query}</h1>
            }
        ]

        render(<Router routes={routes} />)
        expect(screen.getByText('Search: hello world')).toBeTruthy()
    })

    it('should render default component for non-existent routes', () => {
        getCurrentPath.mockReturnValue('/non-existent')

        const NotFound = () => <h1>404 Not Found</h1>

        render(<Router routes={[]} defaultComponent={NotFound} />)
        expect(screen.getByText('404 Not Found')).toBeTruthy()
    })

})