from django.db import models
from django.utils.translation import gettext_lazy as _
from ckeditor.fields import RichTextField
# from .constants import STATUS

class Category(models.Model):
    
    name = models.CharField(max_length=100)
    short_description = models.TextField()
    long_description = RichTextField(blank=True, null=True)
    photos = models.ImageField(upload_to='images/', null=True, blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Post(models.Model):
    DRAFT = 0
    PUBLISHED = 1
    PENDING_APPROVAL = 2

    STATUS_CHOICES = [
        (DRAFT, 'Draft'),
        (PUBLISHED, 'Published'),
        (PENDING_APPROVAL, 'Pending Approval'),
    ]
    
    title = models.CharField(max_length=100)
    cover_photo=models.ImageField(upload_to='images/', null=True, blank=True)
    content = RichTextField()
    categories = models.ManyToManyField("Category", related_name="posts")
    author = models.CharField(max_length=100)
    description = models.TextField(max_length=200, null=True)
    status = models.IntegerField(choices=STATUS_CHOICES, default=0)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    @property
    def get_hit_count(self):
        return HitCount.objects.filter(post=self).count()
    
class Comment(models.Model):
    
    author = models.CharField(max_length=100)
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author} commented on {self.post.title}"
    
class HitCount(models.Model):
    ip_address = models.GenericIPAddressField()
    post = models.ForeignKey("Post", on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.ip_address} => {self.post.title}'                        