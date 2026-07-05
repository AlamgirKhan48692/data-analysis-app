class Config:
    SQLALCHEMY_DATABASE_URI = (
        "mysql+pymysql://root:@localhost/data_analysis"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False