/**
 * CS 132
 *
 * Author: Harris Beg
 * Date: June 6, 2024
 *
 * This javascript file provides functionality to the admin login page,
 * which is primarily form handling.
 */
(function() {
    /**
     * Add form submission handler, load the cart, and update the header for
     * admin users.
     */
    async function init() {
        let form = qs("form");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            handleLoginAttempt(await submitForm());
        });
        await loadCart();
        await updateHeaderAdmin();
    }

    /**
     * Take the email and password values and use them to attempt to log
     * in using the backend API.
     *
     * @returns A JSON object reflecting details about the login attempt.
     */
    async function submitForm() {
        let email = id('email');
        let password = id('password');
        return await login(email.value, password.value);
    }

    /**
     * A custom handler for login form submissions. Displays a message with
     * the message from the API and if login is successful, redirects user to
     * home.
     *
     * @param {JSON} resp - the response after attempting to log in.
     */
    function handleLoginAttempt(resp) {
        handleSubmission(resp);
        if (resp.success) {
            window.location.href = "/index.html";
        }
    }

    init()
})();