from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from routes import router
from config import env

app = FastAPI()

app.include_router(router, prefix="/api")

@app.exception_handler(404)
async def not_found_handler(request: Request, exec):
    return JSONResponse(
        status_code=404,
        content={
            "status": 404,
            "message": "NOT_FOUND",
            "prettyMessage": "The requested resource was not found.",
        }
    )
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=env["HOST"], port=env["PORT"])
