# db-lab
 
### User Info:
```json
{
    "id": 1,
    "username": "Sean Banan",
    "password": "jdiwjiopdawjdjoiawjiodoawi",
}
```

### Posts Info:
```json
{
    "id": 1,
    "userId": 1,
    "title": "Skaka RUMPA",
    "about": "I denna post ska jag förklara skaka rumpa..."
}
```

User /api/users

    GET: /api/users 
    POST: /api/users
    POST: /api/users/login

    GET: /api/users/{user_id}
    PUT: /api/users/{user_id}
    DELETE: /api/users/{user_id}

* Posts /api/posts

    GET: /api/posts
    POST: /api/posts

    GET: /api/posts/{post_id}
    PUT: /api/posts/{post_id}
    DELETE: /api/posts/{post_id}