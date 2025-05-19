from PIL import Image
from io import BytesIO

from django.core.files.base import ContentFile
from django.db.models.fields.files import ImageFieldFile


def optimize_image_to_webp(image: ImageFieldFile) -> ContentFile:
    with Image.open(image) as img:
        if img.mode != "RGB":
            img = img.convert("RGB")

        output = BytesIO()
        img.save(output, format="WEBP", quality=20, optimize=True, method=6)

    output.seek(0)
    return ContentFile(output.read(), image.name.split(".")[0] + ".webp")
