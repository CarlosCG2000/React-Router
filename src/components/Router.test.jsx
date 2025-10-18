
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

})