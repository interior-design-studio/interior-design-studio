from blog.models import Article, ArticleComponent
from utils.image_utils import NewImageOptimizationFormMixin


class ArticleAdminForm(NewImageOptimizationFormMixin):
    class Meta:
        model = Article
        fields = ("title", "content", "image")

    def clean_image(self):
        return self.optimize_new_image("image")


class ArticleComponentAdminForm(NewImageOptimizationFormMixin):
    class Meta:
        model = ArticleComponent
        fields = ("number", "title", "description", "image")

    def clean_image(self):
        return self.optimize_new_image("image")
