import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Route } from './Route.jsx'

describe('Route', () => {
    it('should not render anything', () => {
        const { container } = render(
            <Route path="/" Component={() => <div>Test</div>} />
        )
        expect(container.innerHTML).toBe('')
    })

    it('should accept path prop', () => {
        const component = <Route path="/test" Component={() => <div>Test</div>} />
        expect(component.props.path).toBe('/test')
    })

    it('should accept Component prop', () => {
        const TestComponent = () => <div>Test</div>
        const component = <Route path="/test" Component={TestComponent} />
        expect(component.props.Component).toBe(TestComponent)
    })

    it('should handle dynamic paths', () => {
        const component = <Route path="/users/:id" Component={() => <div>User</div>} />
        expect(component.props.path).toBe('/users/:id')
    })

    it('should handle multiple parameters', () => {
        const component = (
            <Route 
                path="/users/:userId/posts/:postId" 
                Component={() => <div>Post</div>} 
            />
        )
        expect(component.props.path).toBe('/users/:userId/posts/:postId')
    })
})
