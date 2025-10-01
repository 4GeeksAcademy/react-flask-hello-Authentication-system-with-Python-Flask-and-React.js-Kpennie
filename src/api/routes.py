from flask import Blueprint, request, jsonify, current_app
from .models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime

api = Blueprint('api', __name__)

# Keep the existing hello route if you want, or replace everything

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

# Add your authentication endpoints
@api.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'Email already exists!'}), 400
        
        new_user = User(email=email)
        new_user.set_password(password)
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({'message': 'User created successfully!'}), 201
        
    except Exception as e:
        return jsonify({'message': 'Error creating user'}), 500

@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        user = User.query.filter_by(email=email).first()
        
        if user and user.check_password(password):
            # Create JWT token
            access_token = create_access_token(
                identity=user.id,
                expires_delta=datetime.timedelta(hours=24)
            )
            
            return jsonify({
                'token': access_token,
                'message': 'Login successful!',
                'user': user.serialize()
            }), 200
        else:
            return jsonify({'message': 'Invalid credentials!'}), 401
            
    except Exception as e:
        return jsonify({'message': 'Error during login'}), 500

@api.route('/validate-token', methods=['GET'])
@jwt_required()
def validate_token():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user:
        return jsonify({
            'valid': True,
            'user': user.serialize()
        }), 200
    else:
        return jsonify({'valid': False}), 401

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({
        'message': f'Hello {user.email}! Welcome to the private area!',
        'user': user.serialize()
    }), 200