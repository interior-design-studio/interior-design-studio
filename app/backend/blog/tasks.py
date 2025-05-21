import os
import time

from celery import shared_task

from utils.image_processing import optimize_image_to_webp


@shared_task
def optimize_image_size_task(model_path: str, pk: int, field_name: str):
    from django.apps import apps
    model = apps.get_model(*model_path.split("."))


    instance = model.objects.get(pk=pk)
    image = getattr(instance, field_name)

    if not image:
        return

    new_image = optimize_image_to_webp(image)

    setattr(instance, field_name, new_image)
    instance.save()


@shared_task
def delete_image_task(path: str):

    time.sleep(0.5)

    if os.path.isfile(path):
        try:
            os.remove(path)
        except Exception:
            pass
