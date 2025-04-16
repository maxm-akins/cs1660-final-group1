from google.cloud import storage

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
        if len(parts) >= 2:
            note_id = parts[1]  # Extract note_id from the path
            content = blob.download_as_text()
            notes.append({"note_id": note_id, "content": content})
    return notes
