from flask import Blueprint, jsonify
from flask_login import login_required, current_user
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
    # print ('routes following ------------',  following_users)
    return  following_users


@user_routes.route('/<int:id>/followings/<int:newUserId>', methods=['PUT'])
@login_required
def user_add_following(id, newUserId):
    user_current_following_list = User.query.get(id).following
    #----why the list cannot work out to append a new following to db?-------
    # user_current_following_list = User.query.get(id).following.all()
  
    # print('current following list-----', user_current_following_list ) #=> it prints like raw sql commend
    # print('8888888888888888-----', user_current_following_list.all() )
    new_following_user = User.query.get(newUserId)
    
  
    if new_following_user not in user_current_following_list:
            
            user_current_following_list.append(new_following_user)
            db.session.commit()
    return {'followings': [x.to_dict() for x in user_current_following_list]}


@user_routes.route('/<int:id>/followings/<int:removeUserId>', methods=['DELETE'])
@login_required
def remove_following(id, removeUserId):
    user_current_following_list = User.query.get(id).following
    
    remove_user = User.query.get(removeUserId)
    
    if remove_user in user_current_following_list:
            user_current_following_list.remove(remove_user)
            

    db.session.commit()
    return {'followings': [x.to_dict() for x in user_current_following_list]}
    

@user_routes.route('/<int:id>/followers')
@login_required
def user_follower(id):
    follower_users = User.query.get(id).to_dict_get_followers()
    
    return  follower_users


@user_routes.route('/<int:id>/likes')
@login_required
def user_likes(id):
    likes_users = User.query.get(id).to_dict_get_likes()
    
    return  likes_users



@user_routes.route('/<int:id>/unfollowed')
@login_required
def user_unfollowed(id):
    all_users = User.query.all()
    # to exclude the current user
    selected = [x for x in all_users if x != current_user]
    user_current_following_list = User.query.get(id).following.all()
    # print( "_________________in unfollowed route ", user_current_following_list)
   
    unfollowed_list = [x.to_dict() for x in selected if x not in user_current_following_list]
    return { "unfollowed": unfollowed_list }
   


