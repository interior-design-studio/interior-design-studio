from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

from core.models import Project, ProjectImage


@receiver(post_delete, sender=Project)
def delete_main_image_on_delete(sender, instance, **kwargs):
    if instance.main_image:
        instance.main_image.delete(save=False)


@receiver(pre_save, sender=Project)
def delete_main_image_on_update(sender, instance, **kwargs):
    if not instance.pk:
        return
    old_instance = Project.objects.get(id=instance.pk)
    if old_instance.main_image:
        old_instance.main_image.delete(save=False)


@receiver(post_delete, sender=ProjectImage)
def delete_gallery_image_on_delete(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(save=False)


@receiver(pre_save, sender=ProjectImage)
def delete_gallery_image_on_update(sender, instance, **kwargs):
    if not instance.pk:
        return
    old_instance = ProjectImage.objects.get(id=instance.pk)
    if old_instance.image:
        old_instance.image.delete(save=False)
