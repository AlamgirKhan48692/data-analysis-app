# Configration 

class config:
    SQLALCHEMY_DATABASE_URI =(
        "mysql+pymysql://root:@localhost/data_analysis"
    )
    SQLACHEMY_TRACK_MODIFICATION = False

# In app.py 
app.config.from_object(config)


# Database Objects

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# In py

db.init_app(app)