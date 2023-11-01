from fastapi import APIRouter, Depends
from queries.reviews import ReviewIn, ReviewRepository, Error, ReviewOut
from queries.reviews import ReviewGetOut
from typing import Union, List
from authenticator import authenticator

router = APIRouter()


@router.post("/api/review")
def create_review(
    review: ReviewIn,
    repo: ReviewRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        )
):
    return repo.create(review)


@router.get("/api/review", response_model=Union[List[ReviewGetOut], Error])
def get_all(
    repo: ReviewRepository = Depends(),
):
    return repo.get_all()


@router.get(
        "/api/{post_id}/review", response_model=Union[
            List[ReviewGetOut], Error
        ]
)
def get_review_by_id(
    post_id: int,
    repo: ReviewRepository = Depends(),
):
    return repo.get_by_id(post_id)


@router.get("/api/review/{review_id}",
            response_model=Union[ReviewGetOut, Error])
def get_specific_review(
    review_id: int,
    repo: ReviewRepository = Depends()
):
    return repo.get_specific(review_id)


@router.delete(
        "/api/review/{review_id}",
        response_model=Union[bool, Error]
)
def delete_review(
    review_id: int,
    reviews: ReviewRepository = Depends(),
):
    return reviews.delete(review_id)


@router.put("/api/review/{review_id}", response_model=Union[ReviewOut, Error])
def update_review(
    review_id: int,
    review: ReviewIn,
    account_data: dict = Depends(
        authenticator.get_current_account_data
        ),
    repo: ReviewRepository = Depends()
):
    return repo.update_review(review_id, review)
