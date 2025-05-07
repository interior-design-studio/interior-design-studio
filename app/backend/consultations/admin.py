from django.contrib import admin

from consultations.models import (
    ConsultationRequest,
    ChosenAnswer,
    ChoiceOption,
    Question
)


class ChosenAnswerInline(admin.TabularInline):
    model = ChosenAnswer
    extra = 0
    fields = ("question_display", "answer_display")
    readonly_fields = ("question_display", "answer_display")

    def question_display(self, obj):
        if obj.option and obj.option.question:
            return obj.option.question
        return obj.question

    def answer_display(self, obj):
        return obj.option if obj.option else obj.custom_answer



@admin.register(ConsultationRequest)
class ConsultationRequestAdmin(admin.ModelAdmin):
    inlines = (ChosenAnswerInline,)
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
