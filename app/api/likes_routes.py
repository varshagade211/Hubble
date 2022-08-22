from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Post, User


likes_routes = Blueprint('likes', __name__)




# @likes_routes.route('/')
# # @login_required
# def user_likes():
#   likes = User.query.get(current_user.id).to_dict_get_likes()
#   return likes

@likes_routes.route('/<int:user_id>')
# @login_required
def user_likes(user_id):
  print('user.user_likes-----------', User.user_likes)
  likes = User.query.all()
  print('likes----------------', likes.user_likes)
  # return {'likes':likes}






# @likes_routes.route('/')
# def user_likes():
 
# @likes_routes.route('/')
# # @login_required
# def user_likes():
#   posts = Post.query.join(Post, User).all()
#   return {'posts':post.to_dict() for post in posts}

# @likes_routes.route('/')
# # @login_required
# def user_likes():
#   liked_posts = User.query.select_from(User.id).join(Post, Post.id)
#   return {'likes':[like.to_dict() for like in liked_posts]}


# def users_all_post_likes():
#   posts = User.query.filter([post for post in User.user_likes if User.id == current_user.id]).all()
#   return {'likes':[post.to_dict() for post in posts]}

# user = User.query.filter(User.id == current_user.id)
# return {'likes':[like.to_dict() for like in user.user_likes]}


# user = User.query.filter(User.id == current_user.id)
# likes = user.users_likes
# return {'likes':[like.to_dict() for like in likes]}

# posts = Post.query.filter(like for like in Post.posts_likes if like == current_user).all()
# print(posts)
# return {'likes':[like.to_dict() for like in posts]}

