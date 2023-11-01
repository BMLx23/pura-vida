from pydantic import BaseModel
from datetime import date
from queries.accounts import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class ReviewIn(BaseModel):
    body: str
    rating: int
    user_id: int
    post_id: int
    created_at: date


class ReviewGetOut(BaseModel):
    id: int
    body: str
    rating: int
    user_id: int
    post_id: int
    created_at: date
    username: str
    title: str


class ReviewOut(BaseModel):
    id: int
    body: str
    rating: int
    user_id: int
    post_id: int
    created_at: date


class ReviewRepository:
    def create(self, reviews: ReviewIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO reviews
                        (body,
                        rating,
                        user_id,
                        post_id,
                        created_at)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        reviews.body,
                        reviews.rating,
                        reviews.user_id,
                        reviews.post_id,
                        reviews.created_at
                    ]
                )
                id = result.fetchone()[0]
                old_data = reviews.dict()
                return ReviewOut(id=id, **old_data)

    def get_all(self) -> Union[List[ReviewGetOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            r.id,
                            r.body,
                            r.rating,
                            r.user_id,
                            r.post_id,
                            r.created_at,
                            u.username,
                            p.title
                        FROM reviews as r
                            INNER JOIN users as u ON r.user_id = u.id
                                INNER JOIN posts as p ON r.post_id = p.id
                        ORDER BY r.created_at
                        """
                    )
                    result = []
                    for record in db:
                        review = ReviewGetOut(
                            id=record[0],
                            body=record[1],
                            rating=record[2],
                            user_id=record[3],
                            post_id=record[4],
                            created_at=record[5],
                            username=record[6],
                            title=record[7]
                        )
                        result.append(review)
                    return result
        except Exception:
            return {"message": "could not get all reviews"}

    def get_by_id(self, post_id: int) -> Union[List[ReviewGetOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            r.id,
                            r.body,
                            r.rating,
                            r.user_id,
                            r.post_id,
                            r.created_at,
                            u.username,
                            p.title
                        FROM reviews as r
                            inner join posts as p on r.post_id = p.id
                                inner join users as u on r.user_id = u.id
                        WHERE p.id = %s
                        """,
                        [post_id]
                    )
                    record = db.fetchall()
                    if record is None:
                        return {"message": "Post not found"}
                    rec = []
                    for r in record:
                        review = ReviewGetOut(
                            id=r[0],
                            body=r[1],
                            rating=r[2],
                            user_id=r[3],
                            post_id=r[4],
                            created_at=r[5],
                            username=r[6],
                            title=r[7]
                        )
                        rec.append(review)
                    return rec
        except Exception:
            return {"message": "Could not get review by id"}

    def delete(self, id: int) -> Union[None, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM reviews WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception:
            return {"message": "could not delete review"}

    def update_review(self,
                      reviews_id: int,
                      reviews: ReviewIn) -> Union[ReviewOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE reviews
                        SET body = %s
                        , rating = %s
                        , user_id = %s
                        , post_id = %s
                        , created_at = %s
                        WHERE id = %s
                        """,
                        [
                            reviews.body,
                            reviews.rating,
                            reviews.user_id,
                            reviews.post_id,
                            reviews.created_at,
                            reviews_id
                        ]
                    )
                    old_data = reviews.dict()
                return ReviewOut(id=reviews_id, **old_data)
        except Exception:
            return {"message": "could not update review"}

    def get_specific(self, review_id: int) -> Union[ReviewGetOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            r.id,
                            r.body,
                            r.rating,
                            r.user_id,
                            r.post_id,
                            r.created_at,
                            u.username,
                            p.title
                        FROM reviews as r
                            INNER JOIN users as u ON r.user_id = u.id
                                INNER JOIN posts as p ON r.post_id = p.id
                        WHERE r.id = %s
                        """,
                        [review_id]
                    )
                    r = db.fetchone()
                    if r is None:
                        return None

                    review = ReviewGetOut(
                            id=r[0],
                            body=r[1],
                            rating=r[2],
                            user_id=r[3],
                            post_id=r[4],
                            created_at=r[5],
                            username=r[6],
                            title=r[7]
                        )
                    print("RESULTS:", result)
                    return review
        except Exception:
            return {"message": "could not get all reviews"}
