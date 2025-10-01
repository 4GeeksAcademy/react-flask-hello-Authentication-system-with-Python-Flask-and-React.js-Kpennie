from flask import Flask, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS  
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.utils import APIException, generate_sitemap
import os

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'database.db')}"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# JWT Configuration - ADD THIS
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY') or 'your-secret-key-change-in-production'
jwt = JWTManager(app)

MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Add blueprints and commands
setup_admin(app)
setup_commands(app)
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(Exception)
def handle_invalid_usage(error):
    return jsonify({"error": str(error)}), 500 # type: ignore

# Generate sitemap with all endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Serve any other endpoint as a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response

# Run the application
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)