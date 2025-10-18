import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Link } from './Link.jsx'
import { navigate } from '../utils/navigation.js'

describe('Link', () => {
    beforeEach(() => {
        cleanup()
        vi.clearAllMocks()
        // Reset window.history
        window.history.pushState({}, '', '/')
    })

    it('should render a link with correct href', () => {
        render(<Link to="/about">About</Link>)
        const link = screen.getByText('About')
        expect(link.tagName).toBe('A')
        expect(link.getAttribute('href')).toBe('/about')
    })

    it('should render children correctly', () => {
        render(
            <Link to="/test">
                <span>Test Link</span>
            </Link>
        )
        expect(screen.getByText('Test Link')).toBeTruthy()
    })

    it('should handle click and prevent default navigation', () => {
        const { container } = render(<Link to="/about">Go to About</Link>)
        const link = container.querySelector('a')
        
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            button: 0
        })
        
        const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault')
        link.dispatchEvent(clickEvent)
        
        expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should not prevent default for modified events', () => {
        const { container } = render(<Link to="/about">About</Link>)
        const link = container.querySelector('a')
        
        // Test with Ctrl key
        const ctrlClickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            button: 0,
            ctrlKey: true
        })
        
        const preventDefaultSpy = vi.spyOn(ctrlClickEvent, 'preventDefault')
        link.dispatchEvent(ctrlClickEvent)
        
        expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('should handle target="_blank" correctly', () => {
        const { container } = render(
            <Link to="/external" target="_blank">
                External
            </Link>
        )
        const link = container.querySelector('a')
        
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            button: 0
        })
        
        const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault')
        link.dispatchEvent(clickEvent)
        
        expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('should pass additional props to anchor element', () => {
        render(
            <Link to="/test" className="custom-link" data-testid="test-link">
                Test
            </Link>
        )
        const link = screen.getByTestId('test-link')
        expect(link.className).toBe('custom-link')
    })

    it('should scroll to top on navigation', () => {
        const scrollToSpy = vi.spyOn(window, 'scrollTo')
        const { container } = render(<Link to="/about">About</Link>)
        const link = container.querySelector('a')
        
        fireEvent.click(link)
        
        expect(scrollToSpy).toHaveBeenCalledWith(0, 0)
        scrollToSpy.mockRestore()
    })
})

describe('navigate', () => {
    beforeEach(() => {
        window.history.pushState({}, '', '/')
    })

    it('should change browser URL', () => {
        navigate('/test')
        expect(window.location.pathname).toBe('/test')
    })

    it('should dispatch navigation event', () => {
        const eventListener = vi.fn()
        window.addEventListener('pushstate', eventListener)
        
        navigate('/about')
        
        expect(eventListener).toHaveBeenCalled()
        window.removeEventListener('pushstate', eventListener)
    })

    it('should handle multiple navigations', () => {
        navigate('/first')
        expect(window.location.pathname).toBe('/first')
        
        navigate('/second')
        expect(window.location.pathname).toBe('/second')
        
        navigate('/third')
        expect(window.location.pathname).toBe('/third')
    })
})
