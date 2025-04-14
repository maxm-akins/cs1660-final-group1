from google.cloud import storage

BUCKET_NAME = "your-bucket-name"

def upload_note(username: str, note_id: str, content: str):
    client = storage.Client()
    bucket = client.bucket(BUCKET_NAME)
    blob = bucket.blob(f"{username}/{note_id}.txt")
    blob.upload_from_string(content)

def get_note(username: str, note_id: str) -> str:
    client = storage.Client()
    bucket = client.bucket(BUCKET_NAME)
    blob = bucket.blob(f"{username}/{note_id}.txt")
    return blob.download_as_text()
