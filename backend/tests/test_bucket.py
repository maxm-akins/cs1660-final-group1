from google.cloud import storage

def test_bucket(bucket_name):
    try:
        client = storage.Client()
        bucket = client.bucket(bucket_name)
        
        blobs = bucket.list_blobs()
        print(f"Objects in bucket '{bucket_name}':")
        count = 0
        for blob in blobs:
            print(f" - {blob.name}")
            count += 1
        
        if count == 0:
            print("The bucket is empty.")
        else:
            print(f"Total objects: {count}")

        test_blob = bucket.blob("test_object.txt")
        test_blob.upload_from_string("This is a test.")
        print("Test object uploaded.")

        test_blob.delete()
        print("Test object deleted.")

    except Exception as e:
        print(f"Error testing bucket: {e}")

if __name__ == "__main__":
    BUCKET_NAME = "note-master-bucket"
    test_bucket(BUCKET_NAME)
