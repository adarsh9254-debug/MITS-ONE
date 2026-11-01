from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.user import User, StudentProfile
from app.schemas.auth_schema import UserRegister, UserLogin, TokenResponse, UserOut
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/register", response_model=TokenResponse, summary="Student Account Registration")
def register_student(user_in: UserRegister, db: Session = Depends(get_db)):
    """
    Registers a new student account:
    1. Validates that email and enrollment number are unique.
    2. Hashes password securely with Bcrypt.
    3. Creates User record with role='student' and StudentProfile record.
    4. Issues a JWT access token for immediate login.
    """
    # Check if email is already taken
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists."
        )

    # Check if enrollment number is already registered
    existing_enrollment = db.query(StudentProfile).filter(
        StudentProfile.enrollment_number == user_in.enrollment_number
    ).first()
    if existing_enrollment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Enrollment number '{user_in.enrollment_number}' is already registered."
        )

    # Create user with hashed password
    new_user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role="student",
        is_active=True
    )
    db.add(new_user)
    db.flush()  # Generates new_user.id for profile foreign key

    # Create student profile
    new_profile = StudentProfile(
        user_id=new_user.id,
        enrollment_number=user_in.enrollment_number.strip().upper(),
        department_code=user_in.department_code.strip().upper(),
        semester=user_in.semester,
        cgpa=8.5,
        skills="Python, FastAPI, React.js, SQL",
        interests="AI, Full-Stack, Competitive Programming"
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_user)

    # Generate JWT token
    access_token = create_access_token(subject=new_user.id, role=new_user.role)

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserOut.model_validate(new_user)
    )

@router.post("/login", response_model=TokenResponse, summary="User Authentication (Student or Admin)")
def login_user(user_in: UserLogin, db: Session = Depends(get_db)):
    """
    Authenticates a user via email and password:
    1. Looks up User record.
    2. Verifies password hash using Bcrypt.
    3. Issues signed JWT access token containing subject ID and role.
    """
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account is inactive. Please contact administration."
        )

    access_token = create_access_token(subject=user.id, role=user.role)

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserOut.model_validate(user)
    )

@router.get("/me", response_model=UserOut, summary="Retrieve Authenticated User Profile")
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """
    Returns the profile and role details of the currently authenticated user.
    """
    return UserOut.model_validate(current_user)
