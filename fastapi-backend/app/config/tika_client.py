import httpx
import tempfile
import os
from app.core.settings import TIKA_SERVER_URL
from fastapi import HTTPException

class TikaClient:
    def __init__(self, base_url: str = TIKA_SERVER_URL):
        self.base_url = base_url
        self.timeout = httpx.Timeout(30.0)

    async def extract_text(self, fileUrl: str) -> dict:
        headers = {
            'Accept': 'text/plain',
            'Content-Type': 'application/octet-stream'
        }

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                # 1. First download the file
                file_response = await client.get(fileUrl)
                file_response.raise_for_status()
                
                # 2. Create a temporary file
                with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
                    tmp_file.write(file_response.content)
                    tmp_path = tmp_file.name
                
                # 3. Send the file content to Tika
                with open(tmp_path, 'rb') as file_data:
                    tika_response = await client.put(
                        f"{self.base_url}/tika",
                        headers=headers,
                        content=file_data.read()
                    )
                    tika_response.raise_for_status()
                
                # 4. Clean up
                os.unlink(tmp_path)
                
                return {'text': tika_response.text}
                
            except httpx.HTTPStatusError as e:
                if 'tmp_path' in locals() and os.path.exists(tmp_path):
                    os.unlink(tmp_path)
                raise HTTPException(
                    status_code=500,
                    detail={
                        "success": False,
                        "msg": f"Tika processing error: {str(e)}"
                    }
                )
            except Exception as e:
                if 'tmp_path' in locals() and os.path.exists(tmp_path):
                    os.unlink(tmp_path)
                raise HTTPException(
                    status_code=500,
                    detail={
                        "success": False,
                        "msg": f"Unexpected error: {str(e)}"
                    }
                )

tika_client = TikaClient()