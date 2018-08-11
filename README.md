# do-it-api

**Get Tasks**
----
  Returns json data about a single user.

* **URL**

  /tasks

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Query Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        {
            "_id": "5b6e6ee107935111d8f67112",
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
            "_id": "5b6e6f8007935111d8f67113",
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
    **Content:** `{ error : "You are unauthorized to make this request." }`

**Get Tasks**
----
  Returns json data about a single user.

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
        "_id": "5b6e969b2ee39a32a86a83ec",
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