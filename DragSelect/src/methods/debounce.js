// @ts-check
import '../types'

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * `wait` milliseconds. All credits to [Trey Huffine]{@link https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086}
 * @param {*} func
 * @param {number} wait
 * @returns {DSModificationCallback}
 */
export default (func, wait) => {
  let timeout

  // This is the function that is returned and will be executed many times
  // We spread (...args) to capture any number of parameters we want to pass
  return (...args) => {
    // The callback function to be executed after
    // the debounce time has elapsed
    const later = () => {
      // null timeout to indicate the debounce ended
      timeout = null

      // Execute the callback
      func(...args)
    }
    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the
    // inside of the previous setTimeout
    clearTimeout(timeout)

    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs Node)
    timeout = setTimeout(later, wait)
  }
}
