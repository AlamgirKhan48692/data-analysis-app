import os
import uuid
from werkzeug.utils import secure_filename
from flask import current_app


def generate_unique_filename(filename):
    """
    Generate a unique filename while preserving the original extension.
    """
    extension = os.path.splitext(filename)[1].lower()
    return f"{uuid.uuid4().hex}{extension}"


def save_file(file, user_id):
    """
    Save uploaded file in:
    uploads/data_sources/user_<id>/

    Returns:
        dict: File information
    """

    original_filename = secure_filename(file.filename)

    stored_filename = generate_unique_filename(original_filename)

    upload_folder = current_app.config["UPLOAD_FOLDER"]

    user_folder = os.path.join(
        upload_folder,
        f"user_{user_id}"
    )

    os.makedirs(user_folder, exist_ok=True)

    storage_path = os.path.join(
        user_folder,
        stored_filename
    )

    file.save(storage_path)

    return {
        "original_filename": original_filename,
        "stored_filename": stored_filename,
        "storage_path": storage_path,
        "file_extension": os.path.splitext(original_filename)[1].lower(),
        "file_size": os.path.getsize(storage_path),
        "mime_type": file.mimetype
    }