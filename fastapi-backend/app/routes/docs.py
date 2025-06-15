from fastapi import APIRouter, HTTPException
from app.config.tika_client import tika_client
from app.schemas.docs import SignedUrlRequest

router = APIRouter()

@router.post('/generate-report')
async def generate_report(request: SignedUrlRequest):
    try:
        response = await tika_client.extract_text(request.signedUrl)
        return response
    except HTTPException:
        raise  
    except Exception as e:
        print(f"Error in extract_text route: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "msg": "Internal server error"
            }
        )