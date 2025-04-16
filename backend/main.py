from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from models import Note
from gcp import upload_note, get_notes, delete_note_gcp

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/notes/create/{note_id}")
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

@app.post("/api/notes/delete/{note_id}")
async def delete_note_endpoint(
    note_id: str,
    user_id: str = Query(..., description="The UID of the user who owns the note")
):
    """
    Delete a note for the given user.
    Path param:
      - note_id: the note’s identifier
    Query param:
      - user_id: the owner’s UID
    """
    try:
        delete_note_gcp(user_id, note_id)
        return {"message": "Note deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting note: {e}")

@app.get("/api/notes")
async def read_notes(user_id: str = Query(...)):
    """
    Retrieve all notes for the specified user.
    The notes are expected to be stored under: users/{user_id}/{note_id}.txt.
    
    Query Parameters:
        user_id: The user's unique identifier.
    
    Returns:
        A JSON object with a "notes" key containing a list of note objects.
    """
    try:
        notes = get_notes(user_id)
        return {"notes": notes}
    except Exception as e:
        raise HTTPException(status_code=404, detail="Notes not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
