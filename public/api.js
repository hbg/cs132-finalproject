/**
 * CS 132
 *
 * Author: Harris Beg
 * Date: June 6, 2024
 *
 * This javascript file provides functions to execute most of the API methods,
 * which are used in the various pages on the site. For more info on the API
 * routes, visit: https://documenter.getpostman.com/view/7872904/2sA3Qwbpoa
 */

const BASE_URL = "/";
const PRODUCT_LIST_ROUTE = BASE_URL + "products";
const PRODUCT_CAT_LIST_ROUTE = PRODUCT_LIST_ROUTE + "/category";
const CATEGORIES_ROUTE = BASE_URL + "categories";
const ADMIN_BASE = "admin/";
const PRODUCT_CREATE_ROUTE = BASE_URL + ADMIN_BASE + "product/create";
const PRODUCT_EDIT_ROUTE = BASE_URL + ADMIN_BASE + "product/edit";
const PRODUCT_DELETE_ROUTE = BASE_URL + ADMIN_BASE + "product/delete";
const LOGIN_ROUTE = BASE_URL + ADMIN_BASE + "login";
const LOGIN_CHECK_ROUTE = BASE_URL + ADMIN_BASE + "isloggedin";
const CONTACT_ROUTE = BASE_URL + "contact";
const FAQ_ROUTE = BASE_URL + "faq";
const INDIV_PRODUCT_ROUTE = BASE_URL + "product";
const PURCHASE_ROUTE = BASE_URL + "purchase";
const ERROR_RESPONSE = {
    "status_message": "An unknown error occurred.",
    "success": false
}

/**
 * Retrieves products from a specified store using the API.
 *
 * @param {string} storeName - The name of the store
 * @returns A list of JSON objects with product details.
 */
async function getProducts(storeName) {
    try {
        let url = PRODUCT_LIST_ROUTE + `?store_name=${storeName}`;
        let resp = await fetch(url, {
            method: "GET"
        });
        resp = checkStatus(resp);
        const data = await resp.json();
        return data;
    } catch (err) {
        handleError(err);
        return [];
    }
}

/**
 * Retrieves all products from a specified store and of a specified product
 * category.
 *
 * @param {string} storeName - The name of the store
 * @param {string} category - The product category to filter by
 * @returns A list of JSON objects with product details.
 */
async function getProductsByCategory(storeName, category) {
    try {
        let url = PRODUCT_CAT_LIST_ROUTE + `?store_name=${storeName}&category=${category}`;
        let resp = await fetch(url, {
            method: "GET"
        });
        resp = checkStatus(resp);
        const data = await resp.json();
        return data;
    } catch (err) {
        handleError(err);
        return [];
    }
}

/**
 * Retrieves a list of categories for a specified store.
 *
 * @param {string} storeName - The name of the store
 * @returns A list of strings representing unique product categories for the
 * store.
 */
async function getCategories(storeName) {
    try {
        let url = CATEGORIES_ROUTE + `?store_name=${storeName}`;
        let resp = await fetch(url, {
            method: "GET"
        });
        resp = checkStatus(resp);
        const data = await resp.json();
        return data;
    } catch (err) {
        handleError(err);
        return [];
    }
}

/**
 * Retrieves information for the FAQ section mapping commonly asked questions
 * to stored answers.
 *
 * @param {string} storeName - The store's name
 * @returns A JSON object mapping questions to answers.
 */
async function getFAQ(storeName) {
    try {
        let url = FAQ_ROUTE + `?store_name=${storeName}`;
        let resp = await fetch(url, {
            method: "GET"
        });
        resp = checkStatus(resp);
        const data = await resp.json();
        return data;
    } catch (err) {
        handleError(err);
        return ERROR_RESPONSE;
    }
}

/**
 * Retrieves product details for a single product.
 *
 * @param {id} productId - A unique identifier for the product in the DB
 * @returns A JSON object with product details.
 */
async function getProduct(productId) {
    try {
        let url = INDIV_PRODUCT_ROUTE + `?product_id=${productId}`;
        let resp = await fetch(url, {
            method: "GET"
        });
        resp = checkStatus(resp);
        const data = await resp.json();
        return data;
    } catch (err) {
        handleError(err);
        return ERROR_RESPONSE;
    }
}

/**
 * Attempts to perform the login action using supplied credentials.
 *
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns A JSON object with information including the status message and
 * whether or not the attempt was successful.
 */
async function login(email, password) {
    try {
        let url = LOGIN_ROUTE;
        let resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        resp = checkStatus(resp);
        const data = await resp.json();
        return data;
    } catch (err) {
        handleError(err);
        return ERROR_RESPONSE;
    }
}

/**
 * Sends a contact message given a specified store name, email,
 * and message.
 *
 * @param {string} storeName - The name of the store
 * @param {string} email - The user's email address
 * @param {string} message - The user's message
 * @returns - A JSON response from the server after attempting to
 * submit contact information.
 */
async function contact(storeName, email, message) {
    try {
        let url = CONTACT_ROUTE;
        let resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "store_name": storeName,
                "email": email,
                "message": message
            })
        });
        resp = checkStatus(resp);
        const data = await resp.json();
        return data;
    } catch (err) {
        handleError(err);
        return ERROR_RESPONSE;
    }
}

/**
 * Attempts to purchase items stored in a cart.
 *
 * @param {JSON} cart - A JSON object mapping product IDs to quantities
 * purchased.
 * @returns A JSON response from the server from the purchase
 * attempt.
 */
async function purchase(cart) {
    try {
        let url = PURCHASE_ROUTE;
        let resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "cart": JSON.stringify(cart)
            })
        });
        resp = checkStatus(resp);
        const data = await resp.json();
        return data;
    } catch (err) {
        handleError(err);
        return ERROR_RESPONSE;
    }
}

/**
 * Sends a request to check if a user is logged in.
 *
 * @returns A JSON object containing information about whether or not
 * the user is logged in.
 */
async function isLoggedIn() {
    try {
        let url = LOGIN_CHECK_ROUTE;
        let resp = await fetch(url, {
            method: "GET"
        });
        resp = checkStatus(resp);
        const data = await resp.json();
        return data.logged_in;
    } catch (err) {
        handleError(err);
        return ERROR_RESPONSE;
    }
}

/**
 * Creates a new product with specified parameters.
 *
 * @param {string} storeName - The name of the store
 * @param {string} imageUrl - The product's image URL
 * @param {string} title - The product's title
 * @param {string} description - The product's description
 * @param {number} price - The price of one unit of the product in USD
 * @param {number} quantity - The quantity of this unit being sold
 * @param {string} category - The category in which this product belongs.
 * @returns A JSON object reflecting the status of the create
 * operation.
 */
async function createProduct(
    storeName,
    imageUrl,
    title,
    description,
    price,
    quantity,
    category
) {
    try {
        let url = PRODUCT_CREATE_ROUTE;
        let resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "store_name": storeName,
                "image_url": imageUrl,
                "title": title,
                "description": description,
                "price": price,
                "quantity": quantity,
                "category": category
            })
        });
        resp = checkStatus(resp);
        const data = await resp.json();
        return data;
    } catch (err) {
        handleError(err);
        return ERROR_RESPONSE;
    }
}

/**
 * Edits a product with specified updated attributes.
 *
 * @param {*} productId - The product's unique identifier in the server's
 * database.
 * @param {string} imageUrl - The product's image URL
 * @param {string} title - The product's title
 * @param {string} description - The product's description
 * @param {number} price - The price of one unit of the product in USD
 * @param {number} quantity - The quantity of this unit being sold
 * @param {string} category - The category in which this product belongs.
 * @returns A JSON object reflecting the status of the edit
 * operation.
 */
async function editProduct(
    productId,
    imageUrl,
    title,
    description,
    price,
    quantity,
    category
) {
    try {
        let url = PRODUCT_EDIT_ROUTE;
        let resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "product_id": productId,
                "image_url": imageUrl,
                "title": title,
                "description": description,
                "price": price,
                "quantity": quantity,
                "category": category
            })
        });
        resp = checkStatus(resp);
        const data = await resp.json();
        return data;
    } catch (err) {
        handleError(err);
        return ERROR_RESPONSE;
    }
}

/**
 * A simple error handler that logs the issue to the console.
 *
 * @param {Error} err - The error being handled
 */
function handleError(err) {
    console.log(err);
}