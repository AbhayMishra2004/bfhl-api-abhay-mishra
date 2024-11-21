# BFHL API Task

A full-stack application that processes arrays of numbers and alphabets, built with React (frontend) and Flask (backend).


## Tech Stack

### Frontend
- React
- CSS
- Fetch API

### Backend
- Flask
- Python
- CORS

## API Endpoints

### GET /bfhl
Returns operation code

```
{
"operation_code": 1
}
```


### POST /bfhl
Processes array data and returns filtered results

Sample Request:

```
{
"data": ["M","1","334","4","B","Z","a","7"],
"file_b64": "BASE_64_STRING"
}
```


## Note
The backend is hosted on Render free tier and may take up to 120 seconds to start up on first request.

## Live URLs
- Frontend: [Your frontend URL]
- Backend: [Your backend URL]/bfhl

## Author
Abhay Mishra