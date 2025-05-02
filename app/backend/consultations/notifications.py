from datetime import datetime

from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings


def send_admin_consultation_notification(
        name: str, number_phone: str, created_at: datetime, question: str | None = None
) -> None:
    subject = "Запит на консультацію."
    to_email = settings.ADMIN_NOTIFICATION_EMAIL

    html_content = render_to_string(
        "../templates/notification.html",
        {
            "name": name,
            "number_phone": number_phone,
            "question": question,
            "created_at": created_at.strftime("%d.%m.%Y %H:%M")
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
