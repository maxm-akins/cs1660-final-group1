from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from gcs_utils import upload_note, get_note

app = FastAPI()

class NoteInput(BaseModel):
    username: str
    note_id: str
    content: str

@app.post("/save_note")
def save_note(note: NoteInput):
    try:
        upload_note(note.username, note.note_id, note.content)
        return {"message": "Note saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get_note/{username}/{note_id}")
def fetch_note(username: str, note_id: str):
    try:
        content = get_note(username, note_id)
        return {"note": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
