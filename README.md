# db-lab

### User Info:
```json
{
    "id": 1,
    "username": "Sean Banan",
    "password": "Skaka Rumpa",
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

### User /api/users

```
GET /api/users
- Get all the users

POST /api/users
- Register new users

POST /api/users/login
Content-Body JSON Example:
{
    "username": "monke",
    "password": "banana",
}

PUT /api/users
Content-Body JSON Example:
{
    "oldPassword": "banana",
    "newPassword": "apple"
}
- Change the password of the current logged in user
- Requires authorization token
  - Example: 'Authorization: Bearer <USER_TOKEN>'

DELETE /api/users
- Delete the current logged in user
- Requires authorization token
  - Example: 'Authorization: Bearer <USER_TOKEN>'

GET /api/users/{user_id}
- user_id: The ID of the user you want to retrieve infomation from

```

### Posts /api/posts
```
GET: /api/posts
- Get all the posts

POST: /api/posts
Content-Body JSON Example:
{
    "title": "Monke get banana",
    "content": "Banana hanging from tree, Monke need get",
}
- Create a new post for this user
- Requires authorization token
  - Example: 'Authorization: Bearer <USER_TOKEN>'

GET: /api/posts/{post_id}
- Get post by ID

PUT: /api/posts/{post_id}
Content-Body JSON Example:
{
    "newTitle": "Monke got banana",
    "newContent": "Monke now happy",
}
- Edit post by ID
- Requires authorization token
  - Example: 'Authorization: Bearer <USER_TOKEN>'

DELETE: /api/posts/{post_id}
- Delete post by ID
- Requires authorization token
  - Example: 'Authorization: Bearer <USER_TOKEN>'
```