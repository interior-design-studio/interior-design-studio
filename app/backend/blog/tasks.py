import os
import time

from celery import shared_task


@shared_task
def delete_image_task(path: str):

    time.sleep(0.5)

    if os.path.isfile(path):
        try:
            os.remove(path)
        except Exception:
            pass
