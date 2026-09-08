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

// Dropdown меню
document.querySelectorAll('.header_dropdown_trigger').forEach(trigger => {
    trigger.addEventListener('click', (event) => {
        event.stopPropagation();

        const dropdown = trigger.closest('.header_dropdown');
        const isOpen = dropdown.classList.contains('open');

        // Закрываем остальные dropdown
        document.querySelectorAll('.header_dropdown.open').forEach(item => {
            item.classList.remove('open');

            const button = item.querySelector('.header_dropdown_trigger');

            if (button) {
                button.setAttribute('aria-expanded', 'false');
            }
        });

        // Открываем текущий
        if (!isOpen) {
            dropdown.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
        }
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

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.querySelector(".popup-welcome_wrap");
    const popupContent = document.querySelector(".popup-welcome");
    const closeButton = document.querySelector(".close_btn");

    if (!popup || !popupContent) {
        return;
    }

    // Проверяем, показывался ли уже попап в этой сессии
    if (sessionStorage.getItem("welcomePopupShown")) {
        return;
    }

    // Запускаем таймер на 25 секунд (25000 миллисекунд)
    setTimeout(() => {
        // Открываем попап
        popup.style.display = "flex";

        // Запрещаем скролл основной страницы
        document.body.style.overflow = "hidden";

        // Отмечаем в sessionStorage, что попап был показан
        sessionStorage.setItem("welcomePopupShown", "true");
    }, 25000);

    // Закрытие попапа
    function closePopup() {
        popup.style.display = "none";

        // Возвращаем скролл страницы
        document.body.style.overflow = "";
    }

    // Кнопка закрытия
    if (closeButton) {
        closeButton.addEventListener("click", (event) => {
            event.preventDefault();
            closePopup();
        });
    }

    // Клик по затемнению
    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            closePopup();
        }
    });

    // Закрытие через Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && popup.style.display === "flex") {
            closePopup();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const emailButton = document.getElementById("emailButton");
    const telegramButton = document.getElementById("telegramButton");

    // E-mail
    emailButton?.addEventListener("click", () => {
        window.location.href = "mailto:mysupvpn@gmail.com";
    });

    // Telegram
    telegramButton?.addEventListener("click", () => {
        window.open("https://t.me/suppvless", "_blank");
    });
});