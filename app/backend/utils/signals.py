from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
from django.db import transaction

from blog.tasks import delete_image_task


def register_image_cleanup(model, field_name: str):

    @receiver(post_delete, sender=model)
    def delete_image_on_delete(sender, instance, **kwargs):
        file = getattr(instance, field_name, None)
        if file:
            file.delete(save=False)


def delete_replaced_image_signal(model, field_name):

    @receiver(pre_save, sender=model)
    def delete_replaced_image(sender, instance, **kwargs):
        try:
            old_instance = model.objects.get(id=instance.pk)
        except model.DoesNotExist:
            return

        old_image = getattr(old_instance, field_name)
        new_image = getattr(instance, field_name)

        if old_image and old_image != new_image:
            old_path = old_image.path
            transaction.on_commit(lambda: delete_image_task.delay(old_path))
