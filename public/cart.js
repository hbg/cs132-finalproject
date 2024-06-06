/**
 * CS 132
 *
 * Author: Harris Beg
 * Date: June 6, 2024
 *
 * This javascript file provides helper functions for handling the state
 * of the cart and displaying it in the UI.
 */
const STORE_NAME = "brickexchange";

/**
 * Loads the cart into the UI by retrieving the cookie (or having an empty
 * cart), populating it in the UI with fetched product information, sets up
 * a cart exit button, empty button, and a viewing button.
 */
async function loadCart() {
    let cart = {};
    let products = await getProducts(STORE_NAME);
    if (window.localStorage.getItem("cart")) {
        cart = JSON.parse(window.localStorage.getItem("cart"));
    }
    populateCart(cart, await products);
    setupCartExitButton();
    setupCartEmptyButton(cart);
    setupCartViewButton();
}

/**
 * Clears the cart items in the UI.
 */
function clearCart() {
    let cartItemsContainer = id('cart-items');
    while (cartItemsContainer.firstChild) {
        cartItemsContainer.firstChild.remove();
    }
}

/**
 * Populates the cart view with a cart and a list of products JSON
 * objects.
 *
 * @param {JSON} cart - A mapping between product IDs and quantities.
 * @param {Array} products - A list of product JSON objects with product
 * details.
 */
function populateCart(cart, products) {
    clearCart();
    let cartItemsContainer = id('cart-items');
    let total = 0;
    for (let productId in cart) {
        let qty = cart[productId];
        let product = products.filter(function (p) {
            return (p.id == productId);
        })[0];
        let cartItemText = gen("span");
        cartItemText.textContent = `${product.title} (x${qty})`
        cartItemsContainer.appendChild(cartItemText);
        cartItemsContainer.appendChild(gen("br"));
        total += product.price * qty;
    }
    let totalText = id('total');
    totalText.textContent = `\$${total}`;
}

/**
 * Updates the cart JSON object based on the quantity of the product remaining
 * in stock, and updates the new cart in the cookie.
 *
 * @param {JSON} cart - A mapping between product IDs and quantities.
 * @param {number} productId - The identifier of the product being added to
 * the cart.
 * @param {number} quantity - The number of items of this product remaining
 * in stock.
 */
function addToCart(cart, productId, quantity) {
    if (cart[productId] >= quantity) {
        cart[productId] = quantity;
    } else if (cart[productId]) {
        cart[productId] += 1;
    } else {
        cart[productId] = 1;
    }
    window.localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Shows the cart in the UI.
 */
function showCart() {
    let cartItemsContainer = id('cart-container');
    cartItemsContainer.classList.remove("hidden");
}

/**
 * Sets up an event that hides the cart when the exit button is clicked.
 */
function setupCartExitButton() {
    let exitBtn = id('exit-btn');
    exitBtn.addEventListener("click", function() {
        id('cart-container').classList.add('hidden');
    });
}

/**
 * Sets up an event that empties the cart JSON when the empty button
 * is clicked.
 */
function setupCartEmptyButton(cart) {
    let exitBtn = id('empty-cart');
    exitBtn.addEventListener("click", function() {
        cart = {};
        qsa('article > button').forEach((btn) => {
            btn.disabled = false;
        });
        populateCart();
        window.localStorage.setItem("cart", JSON.stringify(cart));
    });
}

/**
 * Sets up an event that displays the cart view when a view button
 * is clicked.
 */
function setupCartViewButton() {
    let cartViewBtn = id('view-cart');
    cartViewBtn.addEventListener("click", () => {
        showCart();
    });
}