from google.cloud import storage
from google.cloud.exceptions import NotFound

BUCKET_NAME = "note-master-bucket"

storage_client = storage.Client()

def upload_note(user_id: str, note_id: str, content: str):
    """
    Upload the note content to Cloud Storage.
    The note is stored under the path: users/{user_id}/{note_id}.txt
    """
    bucket = storage_client.bucket(BUCKET_NAME)
    blob = bucket.blob(f"users/{user_id}/{note_id}.txt")
    blob.upload_from_string(content)

def delete_note_gcp(user_id: str, note_id: str) -> None:
    """
    Delete the note file from Cloud Storage.
    Expects the note to be stored at: users/{user_id}/{note_id}.txt
    """
    bucket = storage_client.bucket(BUCKET_NAME)
    blob = bucket.blob(f"users/{user_id}/{note_id}.txt")
    try:
        blob.delete()
    except NotFound:
        return

def get_notes(user_id: str) -> list:
    """
    Retrieve all note contents from Cloud Storage for the specified user.
    All notes are stored with the path: users/{user_id}/{note_id}.txt.
    
    Returns:
        A list of dictionaries where each dictionary contains the note_id and its content.
    """
    bucket = storage_client.bucket(BUCKET_NAME)
    blobs = bucket.list_blobs(prefix=f"users/{user_id}/")
    notes = []
    for blob in blobs:
        parts = blob.name.split("/")
        if len(parts) == 3 and parts[2].endswith(".txt"):
            filename = parts[2]
            note_id = filename[:-4]
            content = blob.download_as_text()
            notes.append({
                "note_id": note_id,
                "content": content
            })
    return notes
