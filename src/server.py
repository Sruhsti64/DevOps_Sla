from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from huggingface_hub import hf_hub_download
from llama_cpp import Llama
from fastapi.responses import StreamingResponse
import warnings

warnings.filterwarnings("ignore")

# Download the model
model_path = hf_hub_download(
    repo_id="TheBloke/Mistral-7B-Instruct-v0.2-GGUF",
    filename="mistral-7b-instruct-v0.2.Q4_K_M.gguf"
)

llm = Llama(model_path=model_path, n_ctx=4096, verbose=False)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    message: str

@app.post("/chat")
async def chat(query: Query):
    def generate():
        response = llm.create_chat_completion(
            messages=[
                {"role": "system", "content": "You are a medical chatbot specializing in skin diseases. Always answer in a structured, numbered format if applicable."},
                {"role": "user", "content": query.message}
            ],
            max_tokens=400,
            stream=True,  # ✅ Enable streaming
        )
        for chunk in response:
            if "choices" in chunk and "delta" in chunk["choices"][0]:
                content = chunk["choices"][0]["delta"].get("content", "")
                if content:
                    yield content

    return StreamingResponse(generate(), media_type="text/plain")