const RE_SEPARATE_VOLUME = /^.*(分冊版|単話|\s+第?\d+話|話売り|連載版|(ばら|バラ)売り?).*$/;
const RE_INCREASED_TRIAL = /^.*(試し読み増量|増量版).*$/;
const RE_MICRO = /^.*(【マイクロ】).*/;

function main() {

    let summary = {
        separated: 0,
        increased: 0,
        micro: 0,
        owned: 0,
        in_basket: 0,
    }

    let book_images = document.querySelectorAll('span.m-boxListBookProductTmb__img img');
    for (let i = 0; i < book_images.length; i++) {
        book_box = book_images.item(i).closest('li');
        book_title = book_images.item(i).getAttribute('alt');

        if (RE_SEPARATE_VOLUME.test(book_title)) {
            hide_books(book_box, "Separated Volumes");
            summary.separated += 1;
        }

        if (RE_INCREASED_TRIAL.test(book_title)) {
            hide_books(book_box, "Increased Trial");
            summary.increased += 1;
        }

        if (RE_MICRO.test(book_title)) {
            hide_books(book_box, "Micro");
            summary.micro += 1;
        }

        let owned = book_box.querySelector('span.m-boxDcPurchased') !== null;
        if (owned) {
            hide_books(book_box, "Owned");
            summary.owned += 1;
        }

        let in_basket = book_box.querySelector('div.m-boxListBookProductBtnBlock div.m-boxListBookProductBtnBlock__item--basket a')?.getAttribute('href') === '/basket/';
        if (in_basket) {
            hide_books(book_box, "In Basket");
            summary.in_basket += 1;
        }
    }

    for (key in summary) {
        console.log(`${key}: ${summary[key]}`);
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