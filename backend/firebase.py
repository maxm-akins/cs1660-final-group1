from google.cloud import firestore

# Uses ADC—make sure everyone runs `gcloud auth application-default login`
db = firestore.Client()

def save_user_profile(user_id: str, email: str) -> None:
    """
    Creates or updates a user document in Firestore under 'users/{user_id}'.
    """
    doc_ref = db.collection("users").document(user_id)
    doc_ref.set({
        "user_id": user_id,
        "email": email,
        "created_at": firestore.SERVER_TIMESTAMP,
    }, merge=True)

def get_user_profile(user_id: str) -> dict | None:
    """
    Retrieves the user document from Firestore. Returns None if not found.
    """
    doc = db.collection("users").document(user_id).get()
    if doc.exists:
        return doc.to_dict()
    return None

def change_user_note_count(user_id: str, delta: int = 1) -> None:
    """
    Atomically increments (or decrements, if delta is negative) the
    'num_notes' field on the Firestore document users/{user_id}.
    If the field doesn't exist yet, it's created starting from zero.
    """
    user_ref = db.collection("users").document(user_id)
    user_ref.set(
        {"num_notes": firestore.Increment(delta)},
        merge=True
    )