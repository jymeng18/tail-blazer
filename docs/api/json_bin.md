# Create Bin (POST)
Will not need most likely.

# Read from Bin (GET):

https://api.jsonbin.io/v3/b/<BIN_ID>/<BIN_VERSION_NO | latest>

Header: X-Master-key: YOUR_MASTER_API

Example output:
{
    "record": "Hello world",
    "metadata": {
        "id": "69sbcnmwcnmsbnmsl",
        "private": true,
        "createdAt": "2026-03-29T04:34:42.834Z",
        "name": "CMPT276"
    }
}



# Update to Bin (PUT)
https://api.jsonbin.io/v3/b/<BIN_ID> 

Header: X-Master-key: YOUR_MASTER_API
Body(Example): 

{
  "sample": "Hello world"
}

Example output: 
{
    "sample": "Hello world",
    "metadata": {
        "parentId": "69c8abe25fdde574550d39bsdsdsds",
        "private": true
    }
}



# Very Important API Notes: 
- Whatever was in the Bin before the Update(PUT) request will get overwritten. 
- JSONBin has no appending API feature, this means somewhere in our source code
  we must have an object array that tracks each and every AnimalReport, and refetch it
  each time, with supporting util functions like addReport(...), updateReport(...), etc,.


