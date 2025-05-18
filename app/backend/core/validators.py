from django.core.exceptions import ValidationError
import re


def validate_number_phone(value: str) -> None:
    if not re.match(r"^\+?\d{10,15}$", value):
        raise ValidationError("Incorrect phone number format.")
