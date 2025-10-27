from fastapi import FastAPI
from llama_cpp import Llama
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Initialize a tiny dummy LLaMA model (adjust path if you have a real one)
# For test purposes, we just check if the import works
try:
    llm = Llama(model_path="dummy_path.bin")  # This won't run inference
except Exception as e:
    llm = str(e)

@app.get("/")
def root():
    return {
        "status": "FastAPI is working!",
        "llama_cpp_python_test": str(llm)
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
