from rest_framework import serializers
from django.db import transaction

from consultations.models import ConsultationRequest, ChosenAnswer


class ChosenAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChosenAnswer
        fields = (
            "id",
            "option",
            "question",
            "custom_answer"
        )


class ConsultationRequestSerializer(serializers.ModelSerializer):
    chosen_answers = ChosenAnswerSerializer(many=True)

    class Meta:
        model = ConsultationRequest
        fields = (
            "id",
            "customer_name",
            "phone_number",
            "customer_question",
            "chosen_answers"
        )

    def create(self, validated_data):
        with transaction.atomic():
            answers = validated_data.pop("chosen_answers")
            cons_request = ConsultationRequest.objects.create(**validated_data)
            for answer in answers:
                ChosenAnswer.objects.create(customer_data=cons_request, **answer)
            return cons_request
