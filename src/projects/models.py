from django.db import models
from blog.models import Category
class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    url = models.URLField(blank=True)
    categories = models.ManyToManyField(Category, blank=True)

    def __str__(self):
        return self.title