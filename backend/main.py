from fastapi import FastAPI, HTTPException, Query
from models import Note
from gcp import upload_note, get_note

app = FastAPI()

@app.post("/api/notes/{note_id}")
async def create_note(note_id: str, note: Note):
    """
    Create or update a note for the given user.
    The note is stored under the path: users/{note.user_id}/{note_id}.txt.
    The note_id path parameter is used as the canonical note ID.
    """
    try:
        note.note_id = note_id  
        note.bucket_path = f"users/{note.user_id}/{note_id}.txt"
        upload_note(note.user_id, note_id, note.content)
        return {"message": "Note uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading note: {e}")

@app.get("/api/notes/{note_id}")
async def read_note(note_id: str, user_id: str = Query(...)):
    """
    Retrieve a note for the specified user.
    The note is expected to be found at: users/{user_id}/{note_id}.txt.
    The client must provide the user_id as a query parameter.
    """
    try:
        content = get_note(user_id, note_id)
        return {"content": content}
    except Exception as e:
        raise HTTPException(status_code=404, detail="Note not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
