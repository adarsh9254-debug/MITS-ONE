from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List

class StudentProfileOut(BaseModel):
    enrollment_number: str
    department_code: str
    semester: int
    cgpa: float
    skills: str
    interests: str

    model_config = ConfigDict(from_attributes=True)

class UserOut(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    role: str
    is_active: bool
    profile: Optional[StudentProfileOut] = None

    model_config = ConfigDict(from_attributes=True)

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    enrollment_number: str  # e.g. "BTMC25O1008"
    department_code: str = "MAC"
    semester: int = 4

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
