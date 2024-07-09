from django.contrib import admin
from .models import Category, Post, Comment

class CategoryAdmin(admin.ModelAdmin):
    pass

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_on', 'status')
    list_filter = ('status', 'created_on')
    search_fields = ('title', 'content')
    actions = ['approve_posts']

    def approve_posts(self, request, queryset):
        queryset.update(status=Post.PUBLISHED)
    approve_posts.short_description = "Approve selected posts"

class CommentAdmin(admin.ModelAdmin):
    pass

admin.site.register(Category)
admin.site.register(Post)
admin.site.register(Comment)

