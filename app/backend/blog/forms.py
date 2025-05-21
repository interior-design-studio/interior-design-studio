from blog.models import Article, ArticleComponent
from django import forms


class ArticleAdminForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ("title", "content", "image")


class ArticleComponentAdminForm(forms.ModelForm):
    class Meta:
        model = ArticleComponent
        fields = ("number", "title", "description", "image")
