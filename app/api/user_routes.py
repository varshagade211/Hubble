from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db


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
    print ('routes following ------------',  following_users)
    return  following_users

@user_routes.route('/<int:id>/followings/<int:newUserId>', methods=['PUT'])
@login_required
def user_add_following(id, newUserId):
    user_current_following_list = User.query.get(id).following.all()
    print('current following list-----', user_current_following_list )
    new_following_user = User.query.get(newUserId)
    print('*******new user-----', new_following_user)
  
    
    if new_following_user not in user_current_following_list:
            user_current_following_list.append(new_following_user)
            
            db.session.commit()
    return {'followings': [x.to_dict() for x in user_current_following_list]}
    

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
    # print ('routes following ------------',  follower_users)
    return  likes_users
   
