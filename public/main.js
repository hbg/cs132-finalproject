/**
 * CS 132
 *
 * Author: Harris Beg
 * Date: June 6, 2024
 *
 * This javascript file provides functionality to the home page, and
 * mostly works to set up / populate the displayed product cards.
 */
(function() {
    const STORE_NAME = "brickexchange";
    let products = [];
    let allProducts = [];
    let categories = [];
    let cart = {};
    let isAdmin = false;

    /**
     * Initializes the home page by loading the cart
     * from cookie, getting a list of products, and populating the
     * product cards. We also populate the categories dropdown, load
     * the cart div using the utility function in cart.js, and update
     * the header if the user is an admin.
     */
    async function init() {
        isAdmin = await isLoggedIn();
        if (window.localStorage.getItem("cart")) {
            cart = JSON.parse(window.localStorage.getItem("cart"));
        }
        if (isAdmin) {
            const loginBtn = id("login");
            loginBtn.textContent = "LOG OUT";
            loginBtn.href = "/admin/logout";
        }
        products = await getProducts(STORE_NAME);
        allProducts = await products;
        populateProductCards(products);
        categories = await getCategories(STORE_NAME);
        populateCategoryOptions(categories);
        await loadCart();
        await updateHeaderAdmin();
    }

    /**
     * Populates the category dropdown using a list of categories sourced from
     * the API route that lists out categories.
     *
     * @param {list} categories - a list of categories to add to the dropdown
     */
    async function populateCategoryOptions(categories) {
        let categoryContainer = id("categories");
        categories.forEach((category) => {
            let categoryOption =createCategorySelect(category.category);
            categoryContainer.appendChild(categoryOption)
        });
        categoryContainer.addEventListener("change", async (event) => {
            await categoryChangeHandler(event.target.value);
        });
    }

    /**
     * This function updates the product view when a category changes in the
     * dropdown menu.
     *
     * @param {string} value - the category that has been selected
     */
    async function categoryChangeHandler(value) {
        clearProductCards();

        if (value === 'All') {
            products = await getProducts(STORE_NAME);
            populateProductCards(products)
        } else {
            products = await getProductsByCategory(STORE_NAME, event.target.value);
            populateProductCards(products);
        }
    }

    /**
     * This function trivially creates a DOM option for a category.
     *
     * @param {string} category - the name of the category
     * @returns a DOM 'option' object representing the category.
     */
    function createCategorySelect(category) {
        let option = gen("option");
        option.value = category;
        option.textContent = category;
        return option;
    }

    /**
     * Clears the product cards in the product cart view.
     */
    function clearProductCards() {
        let articleContainer = id("products");
        while (articleContainer.firstChild) {
            articleContainer.firstChild.remove();
        }
    }

    /**
     * Populates the product cards in the main page given a list of products.
     * Products that have a quantity of 0 are not displayed. Also, if the user
     * is an admin user, a card is added to allow them to create new products.
     *
     * @param {list} products - a list of products with their properties, as
     * retrieved using the getProducts() API method.
     */
    function populateProductCards(products) {
        let articleContainer = id("products");
        if (isAdmin) {
            articleContainer.appendChild(createNewProductCard());
        }
        products.forEach((product) => {
            if (product.quantity > 0) {
                articleContainer.appendChild(
                    createCard(product.id, product.image_url,
                                product.title, product.price, product.quantity)
                );
            }
        });
    }

    /**
     * Creates a card in the product view that allows admin users to
     * register new products into the storefront.
     *
     * @returns A DOM object with the new product card.
     */
    function createNewProductCard() {
        let newProductArticle = gen("article");
        newProductArticle.textContent = "Add New Product";
        newProductArticle.classList.add("striped-background");
        newProductArticle.classList.add("bold");
        newProductArticle.addEventListener("click", () => {
            window.location.href = 'add_product.html';
        });
        return newProductArticle;
    }

    /**
     * Creates a product card given the product's details as specified in
     * the arguments. We also setup event handlers within the card, and furthermore
     * if the user is an admin, include an edit button.
     *
     * @param {number} productId - the unique ID of the product
     * @param {string} imgUrl - the image URL of the product
     * @param {string} title - the title of the product
     * @param {number} price - the price of the product
     * @param {number} quantity - the quantity of product remaining
     * @returns A DOM object for the card.
     */
    function createCard(productId, imgUrl, title, price, quantity) {
        let articleCard = gen("article");
        let articleDiv = gen("div");
        articleCard.value = productId;
        let articleImg = gen("img");
        articleImg.src = imgUrl;
        articleImg.alt = title;
        let articleTitle = gen("span");
        articleTitle.classList.add("bold");
        articleTitle.textContent = title;
        let articlePriceText = gen("span");
        articlePriceText.classList.add("price-text");
        articlePriceText.textContent = `\$${price}`;
        let articleBtn = gen("button");
        articleBtn.textContent = "Add to Cart";
        articleDiv.appendChild(articleImg);
        articleDiv.appendChild(articleTitle);
        articleDiv.appendChild(articlePriceText);
        articleDiv.classList.add("flex-column");
        articleCard.appendChild(articleDiv);
        articleCard.appendChild(articleBtn);
        if (cart[productId] >= quantity) {
            articleBtn.disabled = true;
        }
        if (isAdmin) {
            let editBtn = gen("button");
            editBtn.textContent = "Edit";
            articleCard.appendChild(editBtn);

            editBtn.addEventListener("click", function () {
                window.location.href =
                    `edit_product.html?product_id=${productId}`;
            });
        }
        articleBtn.addEventListener("click", function () {
            if (window.localStorage.getItem("cart")) {
                cart = JSON.parse(window.localStorage.getItem("cart"));
            }
            addToCart(cart, productId, quantity);
            if (cart[productId] == quantity)
                this.disabled = true;
            populateCart(cart, allProducts);
        });
        articleDiv.addEventListener("click", function () {
            window.location.href = BASE_URL + `product.html?product_id=${productId}`;
        });
        return articleCard;
    }

    init()
})();