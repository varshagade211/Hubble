from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import Post , Image
from app.forms import PostForm
post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
@login_required
def posts():
    posts = Post.query.all()
    return {'posts':[post.to_dict() for post in posts]}


@post_routes.route('/user/posts')
@login_required
def user_posts():
    posts = Post.query.filter(Post.user_id == current_user.id).all()
    return {'posts':[post.to_dict() for post in posts]}


@post_routes.route('/user/post', methods=['POST'])
@login_required
def create_post():
    form = PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post_type = form.data['type']
        post = Post(
            title=form.data['title'],
            description=form.data['description'],
            type=form.data['type'],
            link=form.data['link'],
        )
        db.session.add(post)
        db.session.commit()
        post_dict = post.to_dict()
        if(post_type == 'image'):
            image = Image(url= form.data['image'],post = post)
            db.session.add(image)
            db.session.commit()
            post_dict.image = image.to_dict()

      
        return post_dict

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401




@post_routes.route('/user/post/<int:post_id>', methods=['PUT'])
@login_required
def edit_post(post_id):
    post = Post.query.get(post_id)
    if post.user_id != current_user.id:
        redirect('api/auth/unauthorized')

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post.title = form.data['title']
        post.description=form.data['description']
        post.type=form.data['type']
        post.link=form.data['link']
        db.session.commit()
        return post.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401





@post_routes.route('/user/post/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)

    if post.user_id != current_user.id:
        redirect('api/auth/unauthorized')

    db.session.delete(post)
    db.session.commit()
    return {'message': 'Post Deleted'}
