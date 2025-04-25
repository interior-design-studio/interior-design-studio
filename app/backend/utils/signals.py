from django.db.models.signals import post_delete
from django.dispatch import receiver


def register_image_cleanup(model, field_name: str):

    @receiver(post_delete, sender=model)
    def delete_image_on_delete(sender, instance, **kwargs):
        file = getattr(instance, field_name, None)
        if file:
            file.delete(save=False)
