/**
 * CS 132
 *
 * Author: Harris Beg
 * Date: June 6, 2024
 *
 * This javascript file provides functionality to the contact page,
 * which is primarily form handling.
 */
(function() {
    const STORE_NAME = 'brickexchange';

    /**
     * Adds form submission handler, loads cart, and sets up header for admin.
     */
    async function init() {
        let form = qs("form");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            handleSubmission(await submitForm());
        });
        await loadCart();
        await updateHeaderAdmin();
    }

    /**
     * Take the email and message in the formand pass them to the API to
     * register the message internally.
     *
     * @returns A JSON response from the API with information about the
     * contact submission attempt.
     */
    async function submitForm() {
        let email = id('email').value;
        let message = id('message').value;
        return await contact(STORE_NAME, email, message);
    }

    init()
})();