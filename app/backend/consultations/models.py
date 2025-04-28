from django.core.exceptions import ValidationError
from django.db import models

from consultations.validators import validate_number_phone


class Question(models.Model):
    order = models.PositiveIntegerField(unique=True)
    text = models.CharField(max_length=255)
    is_protected = models.BooleanField(default=False)

    class Meta:
        ordering = ["order"]

    def __str__(self) -> str:
        return self.text

    def delete(self, using=None, keep_parents=False):
        if self.is_protected:
            raise models.ProtectedError(
                "The question is protected and cannot be deleted.", self
            )
        super().delete(using, keep_parents)


class ChoiceOption(models.Model):
    order = models.PositiveIntegerField()
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="choices"
    )
    text = models.CharField(max_length=255)

    class Meta:
        ordering = ["question__order", "order"]
        constraints = [
            models.UniqueConstraint(
                fields=["question", "order"],
                name="unique_choice_order"
            )
        ]

    def __str__(self) -> str:
        return f"q:{self.question.order} {self.text}"


class ConsultationRequest(models.Model):
    customer_name = models.CharField(max_length=255)
    phone_number = models.CharField(
        max_length=15, validators=[validate_number_phone]
    )
    question = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-is_active", "-created_at"]

    def __str__(self) -> str:
        return f"{self.customer_name} {self.created_at.date()}"


class SurveyAnswer(models.Model):
    consultation = models.OneToOneField(
        "ConsultationRequest",
        on_delete=models.CASCADE,
        related_name="survey_answer"
    )


class ChosenAnswer(models.Model):
    survey_answer = models.ForeignKey(
        SurveyAnswer,
        on_delete=models.CASCADE,
        related_name="chosen_answers"
    )
    option = models.ForeignKey(
        ChoiceOption,
        on_delete=models.PROTECT,
        related_name="chosen_by_users",
        null=True,
        blank=True
    )
    custom_answer = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )

    class Meta:
        ordering = ["option"]

    def clean(self):
        if not self.option and not self.custom_answer:
            raise ValidationError(
                "You must select an option or provide a custom answer."
            )

    def __str__(self):
        return self.option.text if self.option else self.custom_answer
