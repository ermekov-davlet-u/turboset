const slider = document.querySelector('.freedom_cards'); const prevButton = document.querySelector('.freedom_arrow_prev'); const nextButton = document.querySelector('.freedom_arrow_next'); if (slider && prevButton && nextButton) { nextButton.addEventListener('click', () => { slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' }); }); prevButton.addEventListener('click', () => { slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' }); }); }
const burger = document.getElementById('headerBurger');
const headerRight = document.getElementById('headerRight');

if (burger) {

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
}

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

const SIGNUP_URL = '/sign-up.html';

function normalizeCtaText(text) {
    return text.replace(/\s+/g, ' ').trim().toLowerCase();
}

function isSignupCta(text) {
    const normalized = normalizeCtaText(text);

    if (!normalized) {
        return false;
    }

    if (normalized.includes('вернуться') || normalized.includes('написать')) {
        return false;
    }

    if (normalized.includes('получить код') || normalized.includes('получить новый код')) {
        return false;
    }

    return (
        normalized.startsWith('начать') ||
        normalized.startsWith('скачать') ||
        normalized.startsWith('получить') ||
        normalized.includes('выбрать тариф')
    );
}

function wireSignupButton(button) {
    if (button.dataset.signupWired === 'true') {
        return;
    }

    button.dataset.signupWired = 'true';
    button.addEventListener('click', () => {
        window.location.href = SIGNUP_URL;
    });
}

function initSignupCtas() {
    document.querySelectorAll('button.header_button_fill, button.tur-button, button.article_blog').forEach((button) => {
        if (isSignupCta(button.textContent)) {
            wireSignupButton(button);
        }
    });

    document.querySelectorAll('a.tur-button, a.popup-welcome_button').forEach((link) => {
        if (isSignupCta(link.textContent)) {
            link.href = SIGNUP_URL;
        }
    });
}

document.addEventListener('DOMContentLoaded', initSignupCtas);

document.addEventListener("DOMContentLoaded", () => {
    const emailButton = document.getElementById("emailButton");
    const telegramButton = document.getElementById("telegramButton");

    // E-mail
    emailButton?.addEventListener("click", () => {
        window.location.href = "https://mail.google.com/mail/?view=cm&fs=1&to=mysupvpn@gmail.com";
    });

    // Telegram
    telegramButton?.addEventListener("click", () => {
        window.open("https://t.me/suppvless", "_blank");
    });
});

if (document.querySelector(".share_icon")) {

    document.querySelector(".share_icon").addEventListener("click", async (event) => {
        event.preventDefault();

        const link = "https://turboset.co/blog.html";

        try {
            await navigator.clipboard.writeText(link);

            const message = document.getElementById("copyMessage");

            message.classList.add("show");

            setTimeout(() => {
                message.classList.remove("show");
            }, 2000);

        } catch (error) {
            console.error("Ошибка копирования:", error);
        }
    });
}


const tabs = document.querySelectorAll('.js-login-tab');

const passwordMode = document.querySelector('.login_mode_password');
const codeMode = document.querySelector('.login_mode_code');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {

        // Вход по коду
        if (index === 0) {
            passwordMode.style.display = 'none';
            codeMode.style.display = 'flex';

            tabs[0].classList.add('signup_btn_fill');
            tabs[1].classList.remove('signup_btn_fill');
        }

        // Вход по паролю
        if (index === 1) {
            codeMode.style.display = 'none';
            passwordMode.style.display = 'flex';

            tabs[1].classList.add('signup_btn_fill');
            tabs[0].classList.remove('signup_btn_fill');
        }

    });
});
