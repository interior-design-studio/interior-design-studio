from django.contrib import admin

from consultations.models import (
    ConsultationRequest,
    ChosenAnswer,
    ChoiceOption,
    Question
)


@admin.register(ConsultationRequest)
class ConsultationRequestAdmin(admin.ModelAdmin):
    list_display = (
        "customer_name",
        "phone_number",
        "created_at",
        "is_active"
    )
    readonly_fields = (
        "customer_name",
        "phone_number",
        "customer_question",
        "created_at"
    )
    list_filter = ("is_active",)
