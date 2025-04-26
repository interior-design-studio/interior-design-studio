from django import forms

from blog.models import Article, ArticleComponent
from utils.image_utils import optimize_image_to_webp


class ArticleAdminForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ("title", "content", "image")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._old_image_name = None
        if self.instance and self.instance.pk:
            self._old_image_name = getattr(self.instance, "image").name

    def clean_image(self):
        new_image = self.cleaned_data.get("image")

        if not self._old_image_name:
            return optimize_image_to_webp(new_image)

        old_name = self._old_image_name.split(".")[0]
        new_name = getattr(new_image, "name", None)
        new_name = new_name.split(".")[0] if new_name else None

        if new_name and old_name != new_name:
            return optimize_image_to_webp(new_image)

        return new_image


class ArticleComponentAdminForm(forms.ModelForm):
    class Meta:
        model = ArticleComponent
        fields = ("number", "title", "description", "image")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["image"].required = False

        self._old_image_name = None
        if self.instance and self.instance.pk:
            self._old_image_name = getattr(self.instance, "image").name

    def clean_image(self):
        new_image = self.cleaned_data.get("image")

        if not self._old_image_name:
            return optimize_image_to_webp(new_image)

        old_name = self._old_image_name.split(".")[0]
        new_name = getattr(new_image, "name", None)
        new_name = new_name.split(".")[0] if new_name else None

        if new_name and old_name != new_name:
            return optimize_image_to_webp(new_image)

        return new_image
