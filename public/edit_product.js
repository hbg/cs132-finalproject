/**
 * CS 132
 *
 * Author: Harris Beg
 * Date: June 6, 2024
 *
 * This javascript file provides functionality to the edit product page,
 * which is primarily form handling.
 */
(function() {
    const STORE_NAME = 'brickexchange';
    let productId;

    async function init() {
        let isAdmin = await isLoggedIn();
        if (!isAdmin) {
            window.location.href = 'index.html';
        } else {
            let params = new URLSearchParams(document.location.search);
            productId = params.get("product_id");
            let form = qs("form");
            let product = await getProduct(productId);
            setDefaults(product);
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                handleSubmission(await submitForm());
            });
        }
        await loadCart();
        await updateHeaderAdmin();
    }

    function setDefaults(product) {
        let titleInput = id('title');
        let imageURLInput = id('image-url');
        let descriptionInput = id('description');
        let categoryInput = id('category');
        let priceInput = id('price');
        let quantityInput = id('quantity');
        titleInput.value = product.title;
        imageURLInput.value = product.image_url;
        descriptionInput.value = product.description;
        categoryInput.value = product.category;
        priceInput.value = parseInt(product.price);
        quantityInput.value = parseInt(product.quantity);
    }

    async function submitForm() {
        let title = id('title').value;
        let imageURL = id('image-url').value;
        let description = id('description').value;
        let category = id('category').value;
        let price = parseInt(id('price').value);
        let quantity = parseInt(id('quantity').value);
        return await editProduct(
            productId,
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