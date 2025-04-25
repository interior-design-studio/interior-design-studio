from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

from blog.models import Article, ArticleComponent


@receiver(post_delete, sender=Article)
def delete_article_image_on_delete(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(save=False)


@receiver(pre_save, sender=Article)
def delete_article_image_on_update(sender, instance, **kwargs):
    if not instance.pk:
        return
    old_instance = Article.objects.get(id=instance.pk)
    if old_instance.image:
        old_instance.image.delete(save=False)


@receiver(post_delete, sender=ArticleComponent)
def delete_component_image_on_delete(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(save=False)


@receiver(pre_save, sender=ArticleComponent)
def delete_component_image_on_update(sender, instance, **kwargs):
    if not instance.pk:
        return
    old_instance = ArticleComponent.objects.get(id=instance.pk)
    if old_instance.image:
        old_instance.image.delete(save=False)
