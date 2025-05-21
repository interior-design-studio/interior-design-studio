from drf_spectacular.utils import extend_schema
from rest_framework import generics

from consultations.models import ConsultationRequest, Question
from consultations.serializers import (
    ConsultationRequestSerializer,
    QuestionListSerializer
)
from consultations.tasks import send_message_task
from consultations.models import ChosenAnswer, Question


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
        answers = []
        for i, answer in enumerate(consultation.chosen_answers.all()):
            if answer.option is not None:
                answers.append((i, answer.option.question.text, answer.option.text))
            elif answer.question is not None:
                answers.append((i, answer.question.text, answer.custom_answer))
        answers_str = ""
        for i, question, answer in answers:
            answers_str += f"{i + 1}. {question}  -  {answer}\n"

        send_message_task.delay(
            name=consultation.customer_name,
            number_phone=consultation.phone_number,
            created_at=consultation.created_at.strftime("%d.%m.%Y %H:%M"),
            question=consultation.customer_question if consultation.customer_question else "-",
            answers=answers_str if answers_str != "" else None
        )

class QuestionListView(generics.ListAPIView):
    queryset = Question.objects.prefetch_related("choices")
    serializer_class = QuestionListSerializer
