from datetime import datetime, timezone
from database.db import db


class DataSource(db.Model):
    __tablename__ = "data_sources"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    # Display name chosen by the user
    name = db.Column(db.String(255), nullable=False)

    # file, database, api, google_sheet, kaggle
    source_type = db.Column(
        db.String(50),
        nullable=False,
        default="file"
    )

    # Original uploaded filename
    original_filename = db.Column(db.String(255))

    # Generated unique filename
    stored_filename = db.Column(db.String(255))

    # csv, xlsx, json, parquet...
    file_extension = db.Column(db.String(20))

    # text/csv, application/json...
    mime_type = db.Column(db.String(100))

    # Size in bytes
    file_size = db.Column(db.BigInteger)

    # Data information
    rows = db.Column(db.Integer)
    columns = db.Column(db.Integer)

    # uploads/data_sources/abc123.csv
    storage_path = db.Column(db.String(500))

    # Upload status
    status = db.Column(
        db.String(30),
        nullable=False,
        default="uploaded"
    )


    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )