import requests
import os

from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings
from dotenv import load_dotenv

load_dotenv()


def send_admin_consultation_notification(
        name: str, number_phone: str, created_at: str, question: str | None = None
) -> None:
    subject = "Запит на консультацію."
    to_email = settings.ADMIN_NOTIFICATION_EMAIL

    html_content = render_to_string(
        "../templates/notification.html",
        {
            "name": name,
            "number_phone": number_phone,
            "question": question,
            "created_at": created_at
        }
    )

    email = EmailMessage(
        subject=subject,
        body=html_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[to_email]
    )
    email.content_subtype = "html"
    email.send(fail_silently=False)

BOT_TOKEN = os.getenv("BOT_TOKEN")
CHAT_ID = os.getenv("CHAT_ID")
TELEGRAM_API_URL = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"


def send_telegram_notification(
        name: str,
        number_phone: str,
        created_at: str,
        question: str = "-",
        answers: str = None
) -> None:
    if not BOT_TOKEN or not CHAT_ID:
        raise ValueError("BOT_TOKEN or CHAT_ID must be set.")

    parts = [
        "<b>Новий запит на консультацію</b>",
        "",
        f"<b>Ім'я:</b>  {name}",
        f"<b>Телефон:</b>  {number_phone}",
        "",
    ]
    if answers:
        parts.append("<b>Результати опитування:</b>")
        parts.append(answers)
    else:
        parts.append(f"<b>Опис питання:</b>  {question}")
        parts.append("")
    parts.append(f"<b>Дата створення:</b>  <i>{created_at}</i>")

    message = "\n".join(parts)

    requests.post(
        TELEGRAM_API_URL,
        json={
            "chat_id": CHAT_ID,
            "text": message,
            "parse_mode": "HTML",
            "disable_web_page_preview": True,
        }
    )
