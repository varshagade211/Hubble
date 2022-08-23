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
    user_current_following_list = User.query.get(id).following
    #----why the list cannot work out to append a new following to db?-------
    # user_current_following_list = User.query.get(id).following.all()
  
    # print('current following list-----', type(user_current_following_list) ) => it prints like raw sql commend
    # print('8888888888888888-----', user_current_following_list.all() )
    new_following_user = User.query.get(newUserId)
    # print('*******-----', current_user.following.all())
  
    
    if new_following_user not in user_current_following_list:
            # print('ddddddddd---------')
            user_current_following_list.append(new_following_user)
            db.session.commit()
    return {'followings': [x.to_dict() for x in user_current_following_list]}


@user_routes.route('/<int:id>/followings/<int:removeUserId>', methods=['DELETE'])
@login_required
def remove_following(id, removeUserId):
    user_current_following_list = User.query.get(id).following
    
    remove_user = User.query.get(removeUserId)
    print('0000000000000 delete backend')
  
    
    if remove_user in user_current_following_list:
            user_current_following_list.remove(remove_user)
            

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
   
