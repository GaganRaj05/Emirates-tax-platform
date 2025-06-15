from fastapi import FastAPI
from app.routes.docs import router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allowed_origins=['*']
)

app.include_router(router, prefix='/docs')
