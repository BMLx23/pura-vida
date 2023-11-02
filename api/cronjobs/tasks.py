from pydantic import BaseModel
from queries.accounts import pool
from typing import Union
from datetime import date, timedelta


class Error(BaseModel):
    message: str


def delete_schedule() -> Union[None, Error]:
    today = date.today()
    yesterday = today - timedelta(days=1)
    tomorrow = today + timedelta(days=1)
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM status
                    WHERE NOT created_on IN (%s, %s, %s)
                    """,
                    [today, yesterday, tomorrow]
                )
                print("status DB has been cleansed")
                return True
    except Exception:
        return {"message": "could not status review"}
