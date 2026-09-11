import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SKIP = {"sign-up.html", "confirm-code.html", "update-cta.py"}


def cta_url(text: str) -> str | None:
    normalized = re.sub(r"\s+", " ", text.strip())
    if re.match(r"^Выбрать тариф$", normalized, re.I):
        return "/tarif.html"
    if re.match(r"^(Начать|Получить|Скачать)", normalized, re.I) or re.search(
        r"Получить 3 дня", normalized, re.I
    ):
        return "/sign-up.html"
    return None


def should_skip_button(attrs: str, inner: str) -> bool:
    if any(x in attrs for x in ("tur-button_sub", "emailButton", "telegramButton", "signup_btn")):
        return True
    if "Вернуться на главную" in inner:
        return True
    if "14 дней" in inner or "гарантия возврата" in inner:
        return True
    return False


def button_to_link(match: re.Match) -> str:
    attrs = match.group(1)
    inner = match.group(2)
    if should_skip_button(attrs, inner):
        return match.group(0)

    text = re.sub(r"<[^>]+>", "", inner)
    url = cta_url(text)
    if not url:
        return match.group(0)

    classes = re.search(r'class="([^"]*)"', attrs)
    cls = classes.group(1) if classes else "tur-button"
    style = re.search(r'style="([^"]*)"', attrs)
    style_attr = f' style="{style.group(1)}"' if style else ""
    return f'<a href="{url}" class="{cls}"{style_attr}>{inner}</a>'


SIMPLE = [
    (
        '<button class="header_button header_button_fill">Получить</button>',
        '<a href="/sign-up.html" class="header_button header_button_fill">Получить</a>',
    ),
    (
        '<a href="/sign-up.html" class="tur-button">Выбрать тариф</a>',
        '<a href="/tarif.html" class="tur-button">Выбрать тариф</a>',
    ),
    (
        '<button class="tur-button tur-button_fill">Начать</button>',
        '<a href="/sign-up.html" class="tur-button tur-button_fill">Начать</a>',
    ),
    (
        '<button class="tur-button dark-button">Начать</button>',
        '<a href="/sign-up.html" class="tur-button dark-button">Начать</a>',
    ),
    (
        '<button class="tur-button header_button_fill">Выбрать тариф</button>',
        '<a href="/tarif.html" class="tur-button header_button_fill">Выбрать тариф</a>',
    ),
    (
        '<a href="/" class="popup-welcome_button">',
        '<a href="/sign-up.html" class="popup-welcome_button">',
    ),
]

BTN_RE = re.compile(r"<button([^>]*)>(.*?)</button>", re.DOTALL)


def main() -> None:
    for name in os.listdir(ROOT):
        if not name.endswith(".html") or name in SKIP:
            continue

        path = os.path.join(ROOT, name)
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()

        original = content
        for old, new in SIMPLE:
            content = content.replace(old, new)
        content = BTN_RE.sub(button_to_link, content)

        if content != original:
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(content)
            print(f"Updated: {name}")


if __name__ == "__main__":
    main()
