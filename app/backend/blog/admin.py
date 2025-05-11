from nested_admin import nested

from django.contrib import admin

from blog.models import Article, ArticleComponent, ComponentAdvantage, ComponentFeature
from blog.forms import ArticleAdminForm, ArticleComponentAdminForm
from utils.image_utils import preview_display


class ComponentAdvantageInline(nested.NestedTabularInline):
    model = ComponentAdvantage
    extra = 0


class ComponentFeatureInline(nested.NestedTabularInline):
    model = ComponentFeature
    extra = 0


class ComponentInline(nested.NestedStackedInline):
    model = ArticleComponent
    form = ArticleComponentAdminForm
    extra = 0
    readonly_fields = ("preview",)
    inlines = (ComponentAdvantageInline, ComponentFeatureInline)

    def preview(self, obj):
        return preview_display(obj, "image")

    preview.short_description = "Preview"


@admin.register(Article)
class ArticleAdmin(nested.NestedModelAdmin):
    form = ArticleAdminForm
    inlines = (ComponentInline,)
    readonly_fields = ("preview",)

    list_display = ("title",)
    search_fields = ("title",)

    def preview(self, obj):
        return preview_display(obj, "image")

    preview.short_description = "Preview"
