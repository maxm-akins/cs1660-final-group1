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

def get_note(user_id: str, note_id: str) -> str:
    """
    Retrieve the note content from Cloud Storage.
    The note is expected to be located at: users/{user_id}/{note_id}.txt
    """
    bucket = storage_client.bucket(BUCKET_NAME)
    blob = bucket.blob(f"users/{user_id}/{note_id}.txt")
    return blob.download_as_text()
