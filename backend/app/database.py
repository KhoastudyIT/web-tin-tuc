from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# Tạo database engine cho MySQL với phpMyAdmin
engine = create_engine(
    settings.DATABASE_URL,
    # MySQL specific parameters
    pool_pre_ping=True,
    pool_recycle=300,
    pool_size=10,
    max_overflow=20,
    # MySQL driver options
    connect_args={
        "use_unicode": True,
        "autocommit": False,
        "charset": settings.MYSQL_CHARSET,
        "sql_mode": "STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO"
    },
    # Echo SQL queries in debug mode
    echo=settings.DEBUG
)

# Tạo SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Tạo Base class cho models
Base = declarative_base()

def get_db():
    """Dependency để lấy database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def test_connection():
    """Test kết nối database"""
    try:
        with engine.connect() as connection:
            result = connection.execute("SELECT 1")
            return True
    except Exception as e:
        print(f"Database connection error: {e}")
        return False
