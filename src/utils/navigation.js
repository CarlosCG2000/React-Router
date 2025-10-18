import { EVENTS } from './consts.js'

/**
 * Navigate to a new path programmatically
 * @param {string} path - The path to navigate to
 */
export function navigate(path) {
  window.history.pushState({}, '', path)
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}
