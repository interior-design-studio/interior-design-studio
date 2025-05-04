from smtplib import SMTPException

from rest_framework import generics

from consultations.models import ConsultationRequest
from consultations.notifications import send_admin_consultation_notification
from consultations.serializers import ConsultationRequestSerializer



class ConsultationCreateView(generics.CreateAPIView):
    queryset = ConsultationRequest.objects.all()
    serializer_class = ConsultationRequestSerializer

    def perform_create(self, serializer):
        consultation = serializer.save()

        try:
            send_admin_consultation_notification(
                name=consultation.customer_name,
                number_phone=consultation.phone_number,
                created_at=consultation.created_at,
                question=consultation.customer_question
            )
        except SMTPException:
            pass
