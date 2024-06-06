/**
 * CS 132
 *
 * Author: Harris Beg
 * Date: June 6, 2024
 *
 * This javascript file provides functionality to the FAQ page and loads
 * frequently asked questions and their corresponding answers from the backend.
 */
(function() {
    const STORE_NAME = 'brickexchange';

    /**
     * Loads the FAQ questions/answers and puts them in the UI. Also
     * loads the cart and sets up the header for admin users.
     */
    async function init() {
        let faq = await getFAQ(STORE_NAME);
        let faqContainer = qs("article");
        for (q in faq) {
            faqContainer.appendChild(createQA(q, faq[q]));
        }
        await loadCart();
        await updateHeaderAdmin();
    }

    /**
     * Create a Q&A entry for a single question and answer pair.
     * @param {string} question - The question in the FAQ
     * @param {string} answer - The corresponding answer in the FAQ
     * @returns A DOM object wrapping the question and answer.
     */
    function createQA(question, answer) {
        const qaWrapper = gen("div");
        const questionSpan = gen("strong");
        questionSpan.textContent = question;
        const answerSpan = gen("em");
        answerSpan.textContent = answer;
        qaWrapper.appendChild(questionSpan);
        qaWrapper.appendChild(gen("br"));
        qaWrapper.appendChild(answerSpan);
        return qaWrapper;
    }

    init()
})();