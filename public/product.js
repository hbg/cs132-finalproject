/**
 * CS 132
 *
 * Author: Harris Beg
 * Date: June 6, 2024
 *
 * This javascript file populate the displayed product card in the individual
 * product view page.
 */
(function() {
    let cart = {};
    let productId;

    /**
     * Initializes the individual product view by retrieving the product_id from
     * the URL, and then fetching the product using the API and populating the
     * product card with details. We also load the card and setup the header for
     * admin users.
     */
    async function init() {
        let params = new URLSearchParams(document.location.search);
        productId = params.get("product_id");
        if (window.localStorage.getItem("cart")) {
            cart = JSON.parse(window.localStorage.getItem("cart"));
        }
        productDetails = await getProduct(productId);
        populateProductCard(productDetails);
        await loadCart();
        await updateHeaderAdmin();
    }

    /**
     * Take the product details corresponding to the fetched productId, and
     * populate the actual product card.
     *
     * @param {JSON} details - a JSON object containing product details
     * as fetched by the API.
     */
    function populateProductCard(details) {
        let titleText = qs('h1');
        let priceText = qs('h2');
        let inStockText = qs('article > span');
        let descriptionText = qs('p');
        let img = qs('article > img');
        titleText.textContent = details.title;
        img.src = details.image_url;
        img.alt = details.title;
        priceText.textContent = `\$${details.price}`;
        inStockText.textContent = (cart[productId] >= details.quantity) ? "NO" : "YES";
        descriptionText.textContent = details.description;
    }

    init()
})();