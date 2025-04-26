from nested_admin import nested

from django.contrib import admin
from django.utils.html import format_html

from blog.models import Article, ArticleComponent, ComponentAdvantage, ComponentFeature
from blog.forms import ArticleAdminForm, ArticleComponentAdminForm


class ComponentAdvantageInline(nested.NestedTabularInline):
    model = ComponentAdvantage
    extra = 1


class ComponentFeatureInline(nested.NestedTabularInline):
    model = ComponentFeature
    extra = 1


class ComponentInline(nested.NestedStackedInline):
    model = ArticleComponent
    form = ArticleComponentAdminForm
    extra = 1
    readonly_fields = ("preview",)
    inlines = (ComponentAdvantageInline, ComponentFeatureInline)

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 200px;" />',
                obj.image.url
            )
        return "-"

    preview.short_description = "Preview"


@admin.register(Article)
class ArticleAdmin(nested.NestedModelAdmin):
    form = ArticleAdminForm
    inlines = (ComponentInline,)
    readonly_fields = ("preview",)

    list_display = ("title",)
    search_fields = ("title",)

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 200px;" />',
                obj.image.url
            )
        return "-"

    preview.short_description = "Preview"
