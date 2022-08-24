from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import Post , Image ,db ,User
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
    # print([likedUser.to_dict() for likedUser in self.posts_likes])

    return {'posts':[post.to_dict() for post in posts]}


@post_routes.route('/user/posts')
@login_required
def user_posts():
    posts = Post.query.filter(Post.user_id == current_user.id).all()
    return {'posts':[post.to_dict() for post in posts]}


# get posts by user id


@post_routes.route('/<int:userId>/posts')
@login_required
def post_by_user_id(userId):
    posts = Post.query.filter(Post.user_id == userId).all()
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

# create and delete like routes-


@post_routes.route('/<int:postId>/like', methods=["PUT"])
@login_required
def like(postId):
    user = User.query.get(current_user.id)
    post = Post.query.get(postId)

    isUserLikes = False
    for likedUser in post.posts_likes:
        if(likedUser.id == current_user.id ):
             isUserLikes = True

    if(not isUserLikes):
        post.posts_likes.append(user)
        db.session.commit()

    return {"like":post.to_dict()}




@post_routes.route('/<int:postId>/like',methods=["DELETE"])
@login_required
def unlike(postId):
    user = User.query.get(current_user.id)
    post = Post.query.get(postId)
    isUserLikes = False
    for likedUser in post.posts_likes:
        if(likedUser.id == current_user.id ):
             isUserLikes = True

    if(isUserLikes):
        post.posts_likes.remove(user)
        db.session.commit()
    return {"likes":post.to_dict()}

