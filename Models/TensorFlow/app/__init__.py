from flask import Flask, jsonify
from app.routes import routes_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10 MB limit
    CORS(app)
    app.register_blueprint(routes_bp)

    @app.errorhandler(413)
    def request_entity_too_large(error):
        return jsonify({'error': 'File is too large. Max size is 10MB.'}), 413

    return app

# Path: app/routes.py
