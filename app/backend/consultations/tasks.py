from celery import shared_task
from smtplib import SMTPException

from consultations.notifications import (
    send_admin_consultation_notification, send_telegram_notification
)


@shared_task
def send_message_task(
    name: str,
    number_phone: str,
    created_at: str,
    question: str="-",
    answers: str=None
) -> None:
    send_telegram_notification(
        name,
        number_phone,
        created_at,
        question,
        answers
    )
    try:
        send_admin_consultation_notification(name, number_phone, created_at, question)
    except SMTPException:
        pass
