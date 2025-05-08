from celery import shared_task
from smtplib import SMTPException

from consultations.notifications import send_admin_consultation_notification


@shared_task
def send_message_task(
    name: str, number_phone: str, created_at: str, question: str | None = None
) -> None:
    try:
        send_admin_consultation_notification(name, number_phone, created_at, question)
    except SMTPException:
        pass
