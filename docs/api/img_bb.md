# Basic Usage of ImgBB

JSONbin has that 200KB limit, so you can't store raw image data (base64 or otherwise) in the bin. Instead you store the image on ImgBB and only save the URL string in JSONbin.

When the user submits the form:

Take the File object from the photo input
Convert it to base64 or use FormData
POST it to ImgBB's API
ImgBB returns a URL like https://i.ibb.co/xyz/photo.jpg
That URL gets stored as photoUrl in your AnimalReport

# API Endpoint for ImgBB (POST):
https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY

The body would look like this: 
{
  method: "POST",
  body: formData // where formData contains the image file
}

# Notes:
Do not set content-type header, browser does this for you for forms. 