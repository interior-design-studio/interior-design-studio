from django.db import models
from django.utils.html import format_html


def preview_display(obj: models.Model, field_name: str) -> str:
    field = getattr(obj, field_name, None)
    if field and hasattr(field, 'url'):
        return format_html('<img src="{}" style="max-height: 200px;" />', field.url)
    return "-"
