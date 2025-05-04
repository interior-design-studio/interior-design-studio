from smtplib import SMTPException

from drf_spectacular.utils import extend_schema
from rest_framework import generics

from consultations.models import ConsultationRequest, Question
from consultations.notifications import send_admin_consultation_notification
from consultations.serializers import (
    ConsultationRequestSerializer,
    QuestionListSerializer
)


@extend_schema(
    summary="Create a new consultation request",
    description="Endpoint for submitting a consultation request. "
                "Can be used on its own or together with a report of answers "
                "collected from a prior questionnaire.",
    responses=ConsultationRequestSerializer
)
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


class QuestionListView(generics.ListAPIView):
    queryset = Question.objects.prefetch_related("choices")
    serializer_class = QuestionListSerializer
