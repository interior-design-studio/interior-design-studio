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


class ChoiceOptionInline(admin.TabularInline):
    model = ChoiceOption
    extra = 0

    def get_readonly_fields(self, request, obj=None):
        if obj and obj.is_protected:
            self.readonly_fields = ("order", "text")
        return self.readonly_fields

    def has_add_permission(self, request, obj):
        if obj and obj.is_protected:
            return False
        return super().has_add_permission(request, obj)

    def has_delete_permission(self, request, obj=None):
        if obj and obj.is_protected:
            return False
        return super().has_delete_permission(request, obj)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = (ChoiceOptionInline,)
    list_display_links = ("text",)
    list_display = ("order", "text", "is_protected")
    list_filter = ("is_protected",)
    readonly_fields = ("is_protected",)

    def get_actions(self, request):
        actions = super().get_actions(request)
        if "delete_selected" in actions:
            del actions["delete_selected"]
        return actions

    def get_readonly_fields(self, request, obj=None):
        if obj and obj.is_protected:
            self.readonly_fields = ("order", "text", "is_protected")
        return self.readonly_fields

    def has_delete_permission(self, request, obj=None):
        if obj and obj.is_protected:
            return False
        return super().has_delete_permission(request, obj)
