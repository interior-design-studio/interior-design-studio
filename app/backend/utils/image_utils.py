import os
from PIL import Image
from io import BytesIO

from django.core.files.base import ContentFile
from django.db.models.fields.files import ImageFieldFile


def optimize_image_to_webp(image: ImageFieldFile) -> ContentFile:
    img = Image.open(image)
    if img.mode != 'RGB':
        img = img.convert('RGB')

    output = BytesIO()
    img.save(output, format='WEBP', quality=80, optimize=True, method=6)

    output.seek(0)
    return ContentFile(output.read(), image.name.split('.')[0] + '.webp')


class OldImageDeletionMixin:
    def delete_replaced_image(self, model: type, field_name: str) -> None:
        if not self.pk:
            return

        try:
            old_instance = model.objects.get(id=self.pk)
        except model.DoesNotExist:
            return

        old_image = getattr(old_instance, field_name, None)
        new_image = getattr(self, field_name, None)

        if old_image and old_image != new_image:
            old_path = old_image.path
            if os.path.isfile(old_path):
                os.remove(old_path)
