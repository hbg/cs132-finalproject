/**
 * CS 132
 *
 * Author: Harris Beg
 * Date: June 6, 2024
 *
 * This javascript file provides functionality to the create product login page.
 */
(function() {
    const STORE_NAME = 'brickexchange';

    /**
     * Initializes the add product form and ensures that the user
     * is logged in as an admin. We also load the cart content into the UI
     * and update the header for admin users.
     */
    async function init() {
        let isAdmin = await isLoggedIn();
        if (!isAdmin) {
            window.location.href = 'index.html';
        } else {
            let form = qs("form");
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                handleSubmission(await submitForm());
            });
        }
        await loadCart();
        await updateHeaderAdmin();
    }

    /**
     * Handles the form when submitted and sends attributes from the form to
     * the API to attempt to create a new product.
     * @returns A JSON object reflecting the result of the operation from
     * the server.
     */
    async function submitForm() {
        let title = id('title').value;
        let imageURL = id('image-url').value;
        let description = id('description').value;
        let category = id('category').value;
        let price = parseInt(id('price').value);
        let quantity = parseInt(id('quantity').value);
        return await createProduct(
            STORE_NAME,
            imageURL,
            title,
            description,
            price,
            quantity,
            category
        );
    }

    init()
})();