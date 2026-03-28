from fastapi import APIRouter, Depends, HTTPException, status
from schemas.user import UserCreate, UserLogin, UserResponse, Token
from api.deps import get_user_service

router = APIRouter()


@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin, user_service=Depends(get_user_service)):
    try:
        access_token = user_service.authenticate(user_credentials)
        if not access_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password",
            )
        return {"access_token": access_token, "token_type": "bearer"}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )


@router.post(
    "/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED
)
async def register(user_data: UserCreate, user_service=Depends(get_user_service)):
    try:
        return user_service.create(user_data)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get("/users", response_model=list[UserResponse])
async def get_all_users(
    skip: int = 0, limit: int = 100, user_service=Depends(get_user_service)
):
    return user_service.get_all(skip=skip, limit=limit)


@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user_by_id(user_id: int, user_service=Depends(get_user_service)):
    user = user_service.get_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    return user


@router.put("/users/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int, user_data: UserCreate, user_service=Depends(get_user_service)
):
    try:
        updated_user = user_service.update(user_id, user_data)
        if not updated_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return updated_user
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.delete("/users/{user_id}")
async def delete_user(user_id: int, user_service=Depends(get_user_service)):
    if not user_service.get_by_id(user_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    success = user_service.delete(user_id)
    if success:
        return {"message": "User deleted successfully"}
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete user",
        )
