from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Post, User


likes_routes = Blueprint('likes', __name__)






