from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import Post, Image, User, db
from app.forms import PostForm
post_routes = Blueprint('posts', __name__)




def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    # return
    # errorMessages = []
    # for field in validation_errors:
    #     for error in validation_errors[field]:
    #         errorMessages.append(f'{field} : {error}')
    # return errorMessages




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
            user=current_user
        )
        db.session.add(post)
        db.session.commit()
        post_dict = post.to_dict()
        if(post_type == 'image'):
            image = Image(url= form.data['image'],post = post)
            db.session.add(image)
            db.session.commit()
            post_dict["image"] = image.to_dict()

        return post_dict

    return {'errors': form.errors}, 401




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

        if(form.data['type'] == 'image'):
          image = post.image
          image.url= form.data['image']


        db.session.commit()
        return post.to_dict()

    return {'errors': form.errors}, 401





@post_routes.route('/user/post/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)

    if post.user_id != current_user.id:
        redirect('api/auth/unauthorized')

    db.session.delete(post)
    db.session.commit()
    return {'message': 'Post Deleted'}



# @post_routes.route('/<int:user_id>/likes', methods=['PUT'])
# @login_required
# def user_likes_post(user_id):
#     posts = Post.query.filter(Post.user_id == user_id).all()
#     user_likes = []
#     for post in posts:
#         for like in post.user_likes:
#             if like.user_id == user_id:
#                 user_likes.append(like)
#                 db.session.commit()
#     return {'likes':user_likes}


# @post_routes.route("/<int:post_id>/likes", methods=['POST', 'DELETE'])
# @login_required
# def like_post(post_id):
#     users_likes = User.query.get(current_user.id).to_dict_get_likes()
#     post = Post.query.get(post_id)
    
#     if post not in users_likes:
#         users_likes.append(post)
#         db.session.commit()
#         return {'message': 'Post Liked'}
#     else:
#         index = users_likes.index(post)
#         users_likes.pop(index)
#         db.session.commit()
#         return {'message': 'Post Unliked'}


# @post_routes.route("/<int:user_id>/likes/<int:post_id>", methods=['PUT'])
# @login_required
# def like_post(post_id, user_id):
#     users_liked_posts = User.query.get(current_user.id).to_dict_get_likes()
#     post = Post.query.get(post_id)
#     likes = users_liked_posts['likes']
#     for like in likes:
#         print('post================', post.to_dict()['id'])
#         print('users_liked_posts================', users_liked_posts['likes'])
#         if like['id'] == post.to_dict()['id']:
#             return {'message': 'Already Liked'}
        
#     users_liked_posts['likes'].append(post)
#     # post.posts_likes.to_dict().append(User.query.get(current_user.id))
#     db.session.commit()
#     # return {'likes':len(post.posts_likes)}   #hopefully returns the array of users instances
#     return {'message': 'Post Liked'}


@post_routes.route("/<int:post_id>/likes", methods=['DELETE'])
@login_required
def unlike_post(post_id):
    users_liked_posts = User.query.get(current_user.id).to_dict_get_likes()
    post = Post.query.get(post_id)
    for liked_post in users_liked_posts:
        if liked_post.id == post.id:
            i = users_liked_posts.index(liked_post)
            j = post.posts_likes.index(User.query.get(current_user.id))
            users_liked_posts.pop(i)
            post.posts_likes.to_dict().pop(j)
            db.session.commit()
            # return {'likes':post.posts_likes.to_dict()}   #hopefully returns the array of users instances
            return {'message': 'Post Unliked'}
    
    return {'message': 'Post Can Not Be Unliked twice'}
