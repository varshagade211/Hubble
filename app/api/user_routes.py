from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()



@user_routes.route('/<int:id>/followings')
@login_required
def user_following(id):
    following_users = User.query.get(id).to_dict_get_followings()
    # print ('routes following ------------',  following_users)
    return  following_users


@user_routes.route('/<int:id>/followers')
@login_required
def user_follower(id):
    follower_users = User.query.get(id).to_dict_get_followers()
    # print ('routes following ------------',  follower_users)
    return  follower_users


@user_routes.route('/<int:id>/likes')
@login_required
def user_likes(id):
    likes_users = User.query.get(id).to_dict_get_likes()
    # print ('routes likes ------------',  user_likes)
    return  likes_users

