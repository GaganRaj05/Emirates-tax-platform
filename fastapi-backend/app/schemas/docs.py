from pydantic import BaseModel

class SignedUrlRequest(BaseModel):
    signedUrl:str

    