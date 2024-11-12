from django.urls import path
from . import views
from .views import AddBlog

urlpatterns = [
    path("", views.blog_index, name="blog_index"),
    path("post/<int:pk>/", views.blog_detail, name="blog_detail"),
    path("category/<category>/", views.blog_category, name="blog_category"),
    path('submit_post/', views.submit_post, name='submit_post'),
    path('principle/<int:pk>/', views.category_detail, name='category_detail'),
]

