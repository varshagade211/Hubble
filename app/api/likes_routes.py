from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Post, User


likes_routes = Blueprint('likes', __name__)



@likes_routes.route('/')
@login_required
def users_all_post_likes():
  user = User.query(User.id == current_user.id)
  return {'likes':[like.to_]}
  # user = User.query.filter(User.id == current_user.id)
  # return {'likes':[like.to_dict() for like in user.user_likes]}



  # return {'likes':[post.to_dict() for post in current_user.user_likes]}

  # user = User.query.filter(User.id == current_user.id)
  # likes = user.users_likes
  # return {'likes':[like.to_dict() for like in likes]}
# current_user.users_likes
  


  # posts = Post.query.filter(like for like in Post.posts_likes if like == current_user).all()
  # print(posts)
  # return {'likes':[like.to_dict() for like in posts]}
  


