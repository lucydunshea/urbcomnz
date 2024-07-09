from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from blog.models import Post, Comment, Category
from django.urls import reverse
from django.views.generic.edit import CreateView
from django.contrib.messages.views import SuccessMessageMixin
from .forms import BlogForm, CommentForm

# All Posts on the blog
def blog_index(request):
    category = request.GET.get('category')
    if category:
        posts = Post.objects.filter(
            categories__name__contains=category
        ).order_by('-created_on')
    else:
        posts = Post.objects.all().order_by("-created_on")

    categories = Category.objects.all()

    context = {
        "posts": posts,
        "categories": categories,
        "selected_category": category,
    }
    return render(request, "blog/index.html", context)

# posts by Category
def blog_category(request, category):
    posts = Post.objects.filter(\
        categories__name__contains=category
        ).order_by=('-created_on')
    context = {
        "category": category,
        "posts": posts,
    }
    return render(request, "blog/category.html", context)

# The Post in detail, on a seperate page
def blog_detail(request, pk):
    post = Post.objects.get(pk=pk)
    previous_post = Post.objects.filter(pk__lt=post.pk).order_by('-pk').first()
    next_post = Post.objects.filter(pk__gt=post.pk).order_by('pk').first()
    form = CommentForm()
    if request.method == "POST":
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = Comment(
                author=form.cleaned_data["author"],
                body=form.cleaned_data["body"],
                post=post,
            )
            comment.save()
            return HttpResponseRedirect(request.path_info)
    comments = Comment.objects.filter(post=post)
    context = {
        "post": post,
        "previous_post": previous_post,
        "next_post": next_post,
        "comments": comments,
        "form": CommentForm(),
    }
    return render(request, "blog/detail.html", context)

# list of most popular posts
def blog_popular(request):
    most_viewed_posts=sorted(Post.objects.filter(status=1), key=lambda a:
                             a.get_hit_count(), reverse=True)
    
    context = {"most_viewed_posts": most_viewed_posts}
    return render(request, "blog/popular.html", context)

# Upload your own post
class AddBlog(SuccessMessageMixin, CreateView):
    form_class = BlogForm
    model = Post
    template_name = "blog/add_blogs.html"
    success_message = "Added Succesfully"
    def get_success_url(self):
        return reverse('add_blogs')

def submit_post(request):
    if request.method == 'POST':
        form = BlogForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.status = Post.PENDING_APPROVAL
            post.save()
            form.save_m2m()
            return redirect('home')
    else:
        form = BlogForm()
    return render(request, 'blog/submit_post.html', {'form': form})

