const slider = document.querySelector('.freedom_cards'); const prevButton = document.querySelector('.freedom_arrow_prev'); const nextButton = document.querySelector('.freedom_arrow_next'); if (slider && prevButton && nextButton) { nextButton.addEventListener('click', () => { slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' }); }); prevButton.addEventListener('click', () => { slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' }); }); }
const burger = document.getElementById('headerBurger');
const headerRight = document.getElementById('headerRight');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    headerRight.classList.toggle('active');
    document.body.style.overflow = headerRight.classList.contains('active') ? 'hidden' : '';
});

// закрытие меню при клике на ссылку
document.querySelectorAll('.header_nav_link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        headerRight.classList.remove('active');
        document.body.style.overflow = '';
    });
});

const scrollEl = document.getElementById('tableScroll');
const prevBtn = document.getElementById('tablePrev');
const nextBtn = document.getElementById('tableNext');

function getColWidth() {
    return parseInt(getComputedStyle(document.querySelector('.blog_content_table_wrap'))
        .getPropertyValue('--col-width')) || 160;
}

function updateButtons() {
    const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
    prevBtn.disabled = scrollEl.scrollLeft <= 0;
    nextBtn.disabled = scrollEl.scrollLeft >= maxScroll - 1;
    console.log(1222);
}

if (prevBtn) {
    prevBtn?.addEventListener('click', () => {
        scrollEl.scrollBy({ left: -getColWidth(), behavior: 'smooth' });
        console.log(222222);
    });
}

if (nextBtn) {
    nextBtn?.addEventListener('click', () => {
        scrollEl.scrollBy({ left: getColWidth(), behavior: 'smooth' });
        console.log(33332);
    });
}

if (scrollEl) {
    scrollEl?.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    updateButtons();
}

document.querySelectorAll('.faq_list_item_top').forEach((item) => {
    item.addEventListener('click', () => {
        const faqItem = item.closest('.faq_list_item');

        document.querySelectorAll('.faq_list_item').forEach((otherItem) => {
            if (otherItem !== faqItem) {
                otherItem.classList.remove('active');
            }
        });

        faqItem.classList.toggle('active');
    });
});