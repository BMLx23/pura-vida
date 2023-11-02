from apscheduler.schedulers.background import BackgroundScheduler
from .tasks import delete_schedule

scheduler = BackgroundScheduler()

# scheduler.add_job(delete_schedule, 'interval', seconds=15)

# Cron is scheduled on UTC time
scheduler.add_job(delete_schedule, 'cron', hour=2, minute=10, second=0)
