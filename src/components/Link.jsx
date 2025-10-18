import PropTypes from 'prop-types'
import { navigate } from '../utils/navigation.js'

/**
 * Link component - Declarative navigation without page reload
 * @param {Object} props
 * @param {string} props.to - Destination path
 * @param {string} props.target - Link target attribute
 * @param {React.ReactNode} props.children - Link content
 */
export function Link({ target, to, ...props }) {
    const handleClick = (event) => {
        const isMainEvent = event.button === 0
        const isModifiedEvent = event.metaKey || event.ctrlKey || event.altKey || event.shiftKey
        const isManageableEvent = target === undefined || target === null || target === '_self'

        if (isMainEvent && isManageableEvent && !isModifiedEvent) {
            event.preventDefault()
            navigate(to)
            window.scrollTo(0, 0)
        }
    }

    return <a onClick={handleClick} href={to} target={target} {...props} />
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
    target: PropTypes.string,
    children: PropTypes.node
}