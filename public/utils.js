/**
 * CS 132
 * Provided global DOM accessor aliases.
 * These are the ONLY functions that should be global in your submissions.
 */

/**
 * Returns the element that has the ID attribute with the specified value.
 * @param {string} idName - element ID
 * @returns {object} DOM object associated with id (null if none).
 */
function id(idName) {
    return document.getElementById(idName);
}

/**
 * Returns the first element that matches the given CSS selector.
 * @param {string} selector - CSS query selector string.
 * @returns {object} first element matching the selector in the DOM tree (null if none)
 */
function qs(selector) {
    return document.querySelector(selector);
}

/**
 * Returns the array of elements that match the given CSS selector.
 * @param {string} selector - CSS query selector
 * @returns {object[]} array of DOM objects matching the query (empty if none).
 */
function qsa(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Returns a new element with the given tagname
 * @param {string} tagName - name of element to create and return
 * @returns {object} new DOM element with the given tagname
 */
function gen(tagName) {
    return document.createElement(tagName);
}

/**
 * (New) Lecture 11: Helper function to return the Response data if successful, otherwise
 * returns an Error that needs to be caught.
 * @param {object} response - response with status to check for success/error.
 * @returns {object} - The Response object if successful, otherwise an Error that
 * needs to be caught.
 */
function checkStatus(response) {
    if (!response.ok) { // response.status >= 200 && response.status < 300
        throw Error(`Error in request: ${response.statusText}`);
    } // else, we got a response back with a good status code (e.g. 200)
    return response; // A resolved Response object.
}

/**
 * Processes a response from the API and displays a message from the
 * response.
 *
 * @param {JSON} resp - A response from the API
 */
function handleSubmission(resp) {
    let success = false;
    if (resp.success) {
        success = true;
    }
    showMessage(success, resp.status_message);
}

/**
 * Displays a message element in the UI with a status message, and is either
 * green or red depending on the `success` flag.
 *
 * @param {boolean} success - Whether or not the action was successful
 * @param {string} statusMessage  - The status message to be shown
 */
function showMessage(success, statusMessage) {
    let messageArea = id('message-area');
    messageArea.textContent = statusMessage;
    messageArea.classList.remove("hidden");
    if (success) {
        messageArea.classList.add("success-message")
    } else {
        messageArea.classList.add("failure-message")
    }
}

/**
 * Updates the header for admin users by setting the text/route of the login
 * button to "LOG OUT" and a logout route, respectively.
 */
async function updateHeaderAdmin() {
    let isAdmin = await isLoggedIn();
    if (isAdmin) {
        const loginBtn = id("login");
        loginBtn.textContent = "LOG OUT";
        loginBtn.href = "/admin/logout";
    }
}