const RE_SEPARATE_VOLUME = /^.*(分冊版).*$/;
const RE_INCREASED_VERSION = /^.*(試し読み増量|増量版).*$/;

function main() {
    let book_images = document.querySelectorAll('span.m-boxListBookProductTmb__img img');
    for (let i = 0; i < book_images.length; i++) {
        book_title = book_images.item(i).getAttribute('alt');


        if (RE_SEPARATE_VOLUME.test(book_title)
            || RE_INCREASED_VERSION.test(book_title)) {
            hide_books(book_images.item(i).closest('li'));
        }

        let owned = book_images.item(i).closest('li').querySelector('span.m-boxDcPurchased') !== null;
        if (owned) {
            hide_books(book_images.item(i).closest('li'));
        }
    }
}

function hide_books(book_element) {
    book_element.style.display = "none";
    console.log(`Remove: \`${book_title}\``);
}

main();