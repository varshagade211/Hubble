from flask import Blueprint, jsonify, session, request, redirect
from app.models import Post ,Note, db
from app.forms.note_form import NoteForm
from flask_login import current_user, login_user, logout_user, login_required

note_routes = Blueprint('notes', __name__, "")

# get all notes DONE
@note_routes.route("/note/all")
def get_all_post():
    notes = Note.query.all()
    print("THIS IS NOTES", notes)
    response = [note.to_dict() for note in notes ]
    return {'note': response}
 

# get all notes by post id  DONE
@note_routes.route('/posts/<int:post_id>/notes')
def one_note(post_id):
    notes = Note.query.filter(Note.post_id == post_id).all()
    response = [note.to_dict() for note in notes ]
    return {'note': response}

# delete note by id DONE 
@note_routes.route("/notes/<int:id>", methods=["Delete"])
@login_required
def make_note(id):
        note = Note.query.get(id)
        if note.user_id != current_user.get_id():
         redirect('api/auth/unauthorized')

        db.session.delete(note)
        db.session.commit()


# post comment by post id
@note_routes.route("/post/<int:post_id1>/notes", methods=["POST"])
@login_required

def post_note(post_id1):

    post = Post.query.get(post_id1)

    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        note1 = Note(
            description=form.data['description'],
            post_id=post.id,
            user_id=current_user.get_id()
        )
        
        db.session.add(note1)
        db.session.commit()
        response = [note1.to_dict()]
        return {'note': response }

    return {'errors': form.errors}, 401


#edit note by comment id
@note_routes.route('/note/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    note = Note.query.get(id)

    if note.user_id != current_user.get_id():
        redirect('api/auth/unauthorized')

    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        note.description=form.data['description']


        db.session.commit()
        return note.to_dict()

    return {'errors': form.errors}, 401
