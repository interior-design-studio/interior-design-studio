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

    def clean(self):
        if self.pk and self.is_protected:
            orig = Question.objects.get(id=self.pk)
            if orig.text != self.text or orig.order != self.order:
                raise ValidationError("Cannot modify protected question fields")

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

    def clean(self):
        if self.pk and self.question.is_protected:
            orig = ChoiceOption.objects.get(id=self.pk)
            if orig.text != self.text or orig.order != self.order:
                raise ValidationError("Cannot modify choices of a protected question.")

        if not self.pk and self.question.is_protected:
            raise ValidationError("Cannot add choices to a protected question.")

    def delete(self, using=None, keep_parents=False):
        if self.question.is_protected:
            raise ValidationError("Cannot delete choices from a protected question.")

    def __str__(self) -> str:
        return f"{self.text}"


class ConsultationRequest(models.Model):
    customer_name = models.CharField(max_length=255)
    phone_number = models.CharField(
        max_length=15, validators=[validate_number_phone]
    )
    customer_question = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-is_active", "-created_at"]

    def __str__(self) -> str:
        return f"{self.customer_name} {self.created_at.date()}"


class ChosenAnswer(models.Model):
    customer_data = models.ForeignKey(
        ConsultationRequest,
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
    question = models.ForeignKey(
        Question,
        on_delete=models.PROTECT,
        related_name="custom_answers",
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
        if self.custom_answer and not self.question:
            raise ValidationError(
                "You must select a question if you are providing a custom answer."
            )

    def __str__(self):
        return self.option.text if self.option else self.custom_answer
