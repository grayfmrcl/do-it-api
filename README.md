# do-it-api

**Authorization**
---
  
  Set `Bearer` token in `authorization` request headers  

* **Headers**
  
  `authorization: Bearer YOUR_TOKEN_HERE`

**Sign Up**
----
  Sig up to the application.

* **URL**

  auth/signup

* **Method:**

  `POST`
  
*  **Body Params**

  | key      | type     | required |
  |---       |---       |---       |
  | name     | String   | no       |
  | email    | Email    | yes      |
  | password | Password | yes      |

* **Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json
  {
    "id": "1qaz2wsx3edc4rfv4rfv5tgb",
    "email": "johndoe@mail.com",
    "name": "John Doe"
  }
  ```
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
  ```json
    { 
      "message" : [ 
        "email is required",
        "password is required"
      ] 
    }
  ```

**Sign In**
----
  Sign in to the application.

* **URL**

  auth/signin

* **Method:**

  `POST`
  
*  **Body Params**

  | key      | type     | required |
  |---       |---       |---       |
  | email    | Email    | yes      |
  | password | Password | yes      |

* **Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json
  {
    "id": "1qaz2wsx3edc4rfv4rfv5tgb",
    "name": "John Doe",
    "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  }
  ```
* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "incorrect email/password" }`

**Get Tasks**
----
  Returns tasks of authenticated user.

* **URL**

  /tasks

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        {
            "_id": "1qaz2wsx3edc4rfv4rfv5tgb",
            "title": "finish semantic-web",
            "due_time": "2018-08-11T05:05:29.716Z",
            "tags": [
                "week 2 portofolio"
            ],
            "completed": true,
            "created_at": "2018-08-11T05:05:29.716Z",
            "updated_at": "2018-08-11T05:15:27.658Z",
            "__v": 0
        },
        {
            "_id": "1qaz2wsx3edc4rfv4rfv5tgb",
            "title": "Finish do-it-api",
            "due_time": "2018-08-11T10:00:00.000Z",
            "tags": [
                "rest-api",
                "week 2 portofolio"
            ],
            "completed": false,
            "created_at": "2018-08-11T05:05:29.716Z",
            "updated_at": "2018-08-11T07:33:00.357Z",
            "__v": 0
        },
    ]
    ```
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "you are unauthorized to make this request" }`

**Add Task**
----
  Create new task for authenticated user.

* **URL**

  /tasks

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Body Params**

    | key      | type            | required |
    |---       |---              |---       |
    | title    | String          | yes      |
    | due_time | Date            |          |
    | tasks    | Array of string |          |

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
    {
        "_id": "1qaz2wsx3edc4rfv4rfv5tgb",
        "due_time": "2018-08-12T01:45:00.000Z",
        "title": "clean room",
        "tags": [],
        "completed": false,
        "created_at": "2018-08-11T07:54:13.876Z",
        "updated_at": "2018-08-11T07:56:11.495Z",
        "__v": 0
    }
    ```
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "you are unauthorized to make this request" }`

**Update Task**
----
  Update an authenticated user's task.

* **URL**

  /tasks/:task_id

* **Method:**

  `PUT`
  
*  **URL Params**

    **Required:**

   `task_id=[integer]`

* **Body Params**

    | key      | type            | required |
    |---       |---              |---       |
    | title    | String          | yes      |
    | due_time | Date            |          |
    | tasks    | Array of string |          |

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
        "_id": "1qaz2wsx3edc4rfv4rfv5tgb",
        "due_time": "2018-08-12T01:45:00.000Z",
        "title": "clean room",
        "tags": [],
        "completed": false,
        "created_at": "2018-08-11T07:54:13.876Z",
        "updated_at": "2018-08-11T07:56:11.495Z",
        "__v": 0
    }
    ```
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "you are unauthorized to make this request" }`

**Delete Task**
----
  Delete an authenticated user's task.

* **URL**

  /tasks/:task_id

* **Method:**

  `DELETE`
  
*  **URL Params**

    **Required:**

   `task_id=[integer]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
        "_id": "1qaz2wsx3edc4rfv4rfv5tgb",
        "due_time": "2018-08-12T01:45:00.000Z",
        "title": "clean room",
        "tags": [],
        "completed": false,
        "created_at": "2018-08-11T07:54:13.876Z",
        "updated_at": "2018-08-11T07:56:11.495Z",
        "__v": 0
    }
    ```
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

**Complete Task**
----
  Mark an authenticated user's task as completed.

* **URL**

  /tasks/:task_id/complete

* **Method:**

  `PATCH`
  
*  **URL Params**

    **Required:**

   `task_id=[integer]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
        "_id": "1qaz2wsx3edc4rfv4rfv5tgb",
        "due_time": "2018-08-12T01:45:00.000Z",
        "title": "clean room",
        "tags": [],
        "completed": true,
        "created_at": "2018-08-11T07:54:13.876Z",
        "updated_at": "2018-08-11T07:56:11.495Z",
        "__v": 0
    }
    ```
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

**Uncomplete Task**
----
  Mark an authenticated user's task as incompleted.

* **URL**

  /tasks/:task_id/uncomplete

* **Method:**

  `PATCH`
  
*  **URL Params**

    **Required:**

   `task_id=[integer]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
        "_id": "1qaz2wsx3edc4rfv4rfv5tgb",
        "due_time": "2018-08-12T01:45:00.000Z",
        "title": "clean room",
        "tags": [],
        "completed": false,
        "created_at": "2018-08-11T07:54:13.876Z",
        "updated_at": "2018-08-11T07:56:11.495Z",
        "__v": 0
    }
    ```
* **Error Response:**

    * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "you are unauthorized to make this request" }`