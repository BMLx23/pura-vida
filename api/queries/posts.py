from pydantic import BaseModel
from datetime import date
from queries.accounts import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class PostIn(BaseModel):
    title: str
    latitude: float
    longitude: float
    zipcode: str
    body: str
    created_by: int
    created_at: date


class PostOut(BaseModel):
    id: int
    title: str
    latitude: float
    longitude: float
    zipcode: str
    body: str
    created_by: int
    created_at: date


class PostRepository:
    def update(self, post_id: int, posts: PostIn) -> Union[PostOut, Error]:
        # try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE posts
                    SET title = %s
                    , latitude = %s
                    , longitude = %s
                    , zipcode = %s
                    , body = %s
                    , created_by = %s
                    , created_at = %s
                    WHERE id = %s

                    """,
                    [
                        posts.title,
                        posts.latitude,
                        posts.longitude,
                        posts.zipcode,
                        posts.body,
                        posts.created_by,
                        posts.created_at,
                        post_id
                    ]
                )
            # old_data = posts.dict()
            # return PostOut(id=post_id, **old_data)
            return self.posts_in_to_out(post_id, posts)
        # except Exception:
        #     return {"message": "could not update that post"}

    def create(self, posts: PostIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO posts
                        (title,
                        latitude,
                        longitude,
                        zipcode,
                        body,
                        created_by,
                        created_at)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        posts.title,
                        posts.latitude,
                        posts.longitude,
                        posts.zipcode,
                        posts.body,
                        posts.created_by,
                        posts.created_at
                    ]
                )
                print('RESULT ID: ', result)
                id = result.fetchone()[0]
                # old_data = posts.dict()
                # return PostOut(id=id, **old_data)
                return self.posts_in_to_out(id, posts)

    def get_all(self) -> Union[List[PostOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id,
                            title,
                            latitude,
                            longitude,
                            zipcode,
                            body,
                            created_by,
                            created_at

                        FROM posts
                        ORDER BY created_at
                        """
                    )
                    result = []
                    for record in db:
                        post = PostOut(
                            id=record[0],
                            title=record[1],
                            latitude=record[2],
                            longitude=record[3],
                            zipcode=record[4],
                            body=record[5],
                            created_by=record[6],
                            created_at=record[7]
                        )
                        result.append(post)
                    return result
        except Exception:
            return {"message": "could not get all posts"}

    def posts_in_to_out(self, id: int, posts: PostIn):
        old_data = posts.dict()
        return PostOut(id=id, **old_data)

    def get_by_id(self, post_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            id,
                            title,
                            latitude,
                            longitude,
                            zipcode,
                            body,
                            created_by,
                            created_at
                        FROM posts
                        WHERE id = %s
                        """,
                        [post_id]
                    )
                    record = db.fetchone()
                    if record is None:
                        return {"message": "Post not found"}

                    post = PostOut(
                        id=record[0],
                        title=record[1],
                        latitude=record[2],
                        longitude=record[3],
                        zipcode=record[4],
                        body=record[5],
                        created_by=record[6],
                        created_at=record[7]
                    )
                    return post
        except Exception:
            return {"message": "Could not get post by id"}

    def delete(self, id: int) -> Union[None, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM posts WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception:
            return {"message": "could not delete post"}
