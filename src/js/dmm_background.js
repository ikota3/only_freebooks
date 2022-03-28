const RE_SEPARATE_VOLUME = /^.*(分冊版|単話|\s+第?\d+話|話売り|連載版).*$/;
const RE_INCREASED_TRIAL = /^.*(試し読み増量|増量版).*$/;

function main() {
    let book_images = document.querySelectorAll('span.m-boxListBookProductTmb__img img');
    for (let i = 0; i < book_images.length; i++) {
        book_box = book_images.item(i).closest('li');
        book_title = book_images.item(i).getAttribute('alt');

        if (RE_SEPARATE_VOLUME.test(book_title)) {
            hide_books(book_box, "Separated Volumes");
        }

        if (RE_INCREASED_TRIAL.test(book_title)) {
            hide_books(book_box, "Increased Trial");
        }

        let owned = book_box.querySelector('span.m-boxDcPurchased') !== null;
        if (owned) {
            hide_books(book_box, "Owned");
        }

        let in_basket = book_box.querySelector('div.m-boxListBookProductBtnBlock div.m-boxListBookProductBtnBlock__item--basket a')?.getAttribute('href') === '/basket/';
        if (in_basket) {
            hide_books(book_box, "In Basket");
        }
    }
}

/**
 * Hide the book box element.
 * 
 * @param {Element} book_box Element of a book box
 * @param {string} reason Reason for hiding the book box
 */
function hide_books(book_box, reason) {
    book_box.style.display = "none";
    console.log(`Reason: \`${reason}\`, Remove: \`${book_title}\``);
}

main();