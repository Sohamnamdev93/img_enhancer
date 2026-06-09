from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from enhance import enhance_image
from aesthetic import aesthetic_image

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/enhance")
async def enhance(file: UploadFile = File(...)):
    return enhance_image(file)

@app.post("/aesthetic")
async def aesthetic(file: UploadFile = File(...)):
    return aesthetic_image(file)