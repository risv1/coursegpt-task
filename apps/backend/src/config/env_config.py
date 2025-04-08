import os
from dotenv import load_dotenv

load_dotenv()

env = {
    "HOST": os.getenv("HOST", "127.0.0.1"),
    "PORT": int(os.getenv("PORT", 8000)),
}
