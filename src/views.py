from django.shortcuts import render
from django.db import models
from blog.models import Post, Category
#from projects.models import Project

def home(request):
    # Get data from models
    # latest blog posts
    latest_posts = Post.objects.order_by("-created_on")[:5]
    popular_posts = Post.objects.all().annotate(hit_count=models.Count('hitcount')).order_by('-hit_count')[:5]
    # featured Projects (WIP)
    #featured_projects = Project.objects.filter(featured=True)
    # Fetch all categories
    categories = Category.objects.all()

    # Create a dictionary to store the articles for each category
    category_articles = {}
    for category in categories:
        category_articles[category] = category.posts.all()[:10]

    return render(request, "home/home.html",
                  {"latest_posts": latest_posts,
                     "popular_posts": popular_posts,
                     "category_articles": category_articles,
                   #"featured_projects": featured_projects"
                   })

def about_us(request):
    return render(request, "about/index.html")

def contact(request):
    return render(request, "about/contact.html")