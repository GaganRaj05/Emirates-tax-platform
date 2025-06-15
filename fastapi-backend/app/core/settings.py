from dotenv import load_dotenv
import os

load_dotenv()

TIKA_SERVER_URL = os.getenv('TIKA_SERVER_URL')
AI_MODEL_URL = os.getenv('LAMMA3_MODEL_URL')



