/**
 * CS 132
 *
 * Author: Harris Beg
 * Date: June 6, 2024
 *
 * This javascript file provides functionality to the checkout page,
 * which is primarily form handling.
 */
(function() {
    let cart = {};

    /**
     * Initializes the checkout view. In specific, it loads the cart from
     * a cookie if available, adds a form handler, and loads the cart view,
     * populates a table of items in the cart, and updates the header
     * for admin users.
     */
    async function init() {
        if (window.localStorage.getItem("cart")) {
            cart = JSON.parse(window.localStorage.getItem("cart"));
        }
        if (Object.keys(cart).length == 0) {
            showMessageHideForm("Your cart is empty!");
        } else {
            let form = qs("form");
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                handleCheckoutSubmission(await submitForm());
            });
            await populateOrderTable();
        }
        await loadCart();
        await updateHeaderAdmin();
    }

    /**
     * Serves as the handler for the form's submission. We will take the cart
     * and pass it to the '/purchase' route in the API, which will update the
     * inventory in the server's storage. We then empty the cart.
     *
     * @returns result JSON from API after purchasing products.
     */
    async function submitForm() {
        let result = await purchase(cart);
        cart = {};
        window.localStorage.setItem("cart", JSON.stringify(cart));
        return result;
    }

    /**
     * Populates a table in the UI with the items / quantities in the user's
     * cart. We also calculate the total and display it.
     */
    async function populateOrderTable() {
        let orderTable = qs('tbody');
        let total = 0;
        for (let productId in cart) {
            let product = await getProduct(productId);
            orderTable.appendChild(createOrderRow(product, cart[productId]));
            total += cart[productId] * product.price;
        }
        let totalText = id("total-text");
        totalText.textContent = `Total: \$${total}`;
    }

    /**
     * Creates a single table row for a product in the cart, as well as the
     * quantity in the cart.
     *
     * @param {JSON} product - the product's attributes in JSON form.
     * @param {number} qty - the amount of this product in the cart
     * @returns A DOM object that is the newly created <tr>.
     */
    function createOrderRow(product, qty) {
        let tr = gen("tr");
        let nameTd = gen("td");
        let quantityTd = gen("td");
        let priceTd = gen("td");
        nameTd.textContent = product.title;
        quantityTd.textContent = qty;
        priceTd.textContent = `\$${product.price}`;
        tr.appendChild(nameTd);
        tr.appendChild(quantityTd);
        tr.appendChild(priceTd);
        return tr;
    }

    /**
     * Handles the UI after the form has been submitted.
     *
     * @param {JSON} response - The response returned by the API after purchasing
     * the items in the cart.
     */
    function handleCheckoutSubmission(response) {
        if (!response.success) {
            handleSubmission(response);
        } else {
            showMessageHideForm('Success! Your order should arrive in 2-3 weeks.');
        }
    }

    /**
     * Hides the page's form and shows a string message.
     *
     * @param {string} msg - the message to be displayed.
     */
    function showMessageHideForm(msg) {
        let h1 = qs('h1');
        h1.textContent = msg;
        let checkoutArea = id('checkout-area');
        checkoutArea.classList.add('hidden');
    }

    init()
})();