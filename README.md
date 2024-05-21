# Green de la Creme

**Team:**

* Shayne Buac - Software Developer
* Adam Azai - Software Developer
* Brandon Gomez - Software Developer
* Regan Tewksbury - Software Developer

## Design

Green de la Creme is a social media platform designed especially for plant enthusiasts. The platform enables users to create accounts, connect with other plant owners, ask questions, share knowledge, and write blog posts.

The application has a microservice architecture, with the front and back end separated. The back end uses FastAPI and includes a directory for the application. This directory includes the migrations directory, queries directory, routers directory, and tests directory. The application also includes automatic table migrations written in the migrations folder. The front end uses React and Redux and has directories for blog components, forum components, and the Redux store.

The platform provides an interactive and engaging experience for plant enthusiasts and enables them to share knowledge and connect with others who share their passion for plants. Green de la Creme's goal is to create a vibrant community of plant owners who learn from each other and share their experiences, which creates a more connected and informed plant community.

## Wireframe Diagram

<img src="/docs/wireframe.png" />

## How to Run the App

### Clone the Repository
 
1. On the command line, navigate to the directory where you want to clone the project. Use `cd [directory-name-here]` to move into your desired directory.
2. To clone the repository, type ``` git clone https://gitlab.com/green-de-la-creme/green-de-la-creme.git ```
3. Switch into the project directory by typing cd green-de-la-creme


### Running Project Locally

1. Type ``` docker compose build ``` on the command line
2. Type ``` docker compose up ``` on the command line

These commands run four containers on your Docker Desktop. You do not need to create volumes since the Docker commands automatically generate them for you.

### Viewing FastAPI Docs and React Front End

1. You can view the FastAPI docs at http://localhost:8000/docs in your internet browser.
2. The React-based front end is available at http://localhost:3000 in your internet browser.
3. The front end utilizes React and Redux, which means the store and state can be viewed with the React and Redux Google Chrome extensions in the JavaScript console.

## Routing and API Outline

On Green de la Creme, you can view a list of blog posts, write and edit your own posts, and leave comments and likes on posts that inspire you. You can also explore our forum section, where you will find various questions on all things plants. If you're feeling especially knowledgeable, share your own question or reply to someone else's. You always have the ability to edit and delete your own forum questions.

Each page of our front end has a navigation bar to provide easy access to all features within the application. Below is a complete breakdown of each front-end URL.

#### React Routes

- **Home Page** `http://localhost:3000`
  - Landing page with information about the site, example blog posts, the FAQ, and team information
- **Signup** `http://localhost:3000/signup`
  - Sign up for the Green de la Creme
- **Login** `http://localhost:3000/login`
  - Log into your account
- **List of Blogs** `http://localhost:3000/blogs`
  - View a list of all blogs that every user has created
  - Buttons for editing and deleting blogs if your account is the creator
  - Option to like and comment on blog posts, view blog comments, and edit or delete your comment
- **List of Forum Threads** `http://localhost:3000/forum`
  - View a list of all the forum threads that every user has created
- **Forum Thread Detail Page** `http://localhost:3000/forum/:id`
  - The detail view of one forum thread to view the answers other users have posted
  - Buttons for editing and deleting the thread if your account is the creator
  - Option to reply to forum questions with your answers and edit or delete your reply
- **Resources Page** `http://localhost:3000/resources`
  - Resources with external links for education on plant ownership and garden upkeep
- **About** `http://localhost:3000/about`
  - Under construction: coming soon!

#### Green_Creme Directory

This is a walkthrough of Green de la Creme's backend, located in the "green_creme" directory. We'll break it down step-by-step:

First, you see a "migrations" file containing all the migration files for the SQL database. This includes the forum table, blog table, users table, forum replies table, and blog comments table.

Next, in the "queries" directory, several repositories handle all the CRUD functions for each table. This includes an accounts repository for accounts, blogs, blog comments, forums, and forum replies. There is also a `pool.py` file that connects to the database.

Each repository has Pydantic models to define the structure of the data. For example, the Pydantic models for accounts include an `Error` class, a `DuplicateAccountError` class, an `AccountIn` class, and an `AccountOutWithPassword` class for returning an account with its hashed password.

Similarly, there are Pydantic models for blogs, blog comments, and forums. Each Pydantic model has an `Error` class to handle errors, an `In` class for creating data, and an `Out` class to return data.

The "routers" file contains the FastAPI endpoints for blogs, accounts, forums, blog comments, forum replies, and account functions such as login, logout, and signup.

Last, there is a "tests" directory, which has unit tests for blog and forum endpoints to ensure the accuracy of the code.

Together, all these components work seamlessly to create the ultimate social media experience for plant owners.

### FastAPI Endpoints

##### Blogs

<details>
<summary markdown="span">GET /blogs - List of All Blog Posts</summary>

```
[
  {
    "id": 4,
    "title": "Plants That Like Shaded Areas",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://images.pexels.com/photos/3718448/pexels-photo-3718448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "created_on": "2023-04-18T16:16:24.673221",
    "author_id": 1,
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "regan",
    "last": "tewks"
  },
  {
    "id": 3,
    "title": "Watering Schedule",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://www.pexels.com/photo/a-person-spraying-water-with-a-spray-bottle-5137558/",
    "created_on": "2023-04-10T16:42:45.837062",
    "author_id": 1,
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "regan",
    "last": "tewks"
  },
  {
    "id": 1,
    "title": "Plants for Interior Design",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://images.pexels.com/photos/4503819/pexels-photo-4503819.jpeg?auto=compress&cs=tinysrgb&w=800",
    "created_on": "2023-04-10T16:41:47.231049",
    "author_id": 1,
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "regan",
    "last": "tewks"
  }
]
```

</details>

<details>
<summary markdown="span">GET /blogs/{blog_id} - Get One Blog Post</summary>

```
{
  "id": 3,
  "title": "Watering Schedule",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://www.pexels.com/photo/a-person-spraying-water-with-a-spray-bottle-5137558/",
  "created_on": "2023-04-10T16:42:45.837062",
  "author_id": 1,
  "username": "regan",
  "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
  "first": "regan",
  "last": "tewks"
}
```

</details>

<details>
  <summary markdown="span">POST /blogs - Create a Blog Post</summary>

  ##### Input:

  ```
  {
  "title": "Best Plants for Office Spaces?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
  ```

  ##### Output:

  ```
{
  "id": 2,
  "title": "Best Plants for Office Spaces?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "created_on": "2023-04-28T16:52:45.609069",
  "author_id": 1
}
```

</details>

<details>
  <summary markdown="span">PUT /blogs/{blog_id} - Edit a Blog Post </summary>

  ##### Input:

  ```
  {
  "title": "3 Best Plants for Home Office Spaces?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
  ```

  ##### Output:

  ```
{
  "id": 2,
  "title": "3 Best Plants for Office Spaces?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "created_on": "2023-04-28T16:52:45.609069",
  "author_id": 1
}
```

</details>

<details>
  <summary markdown="span">DELETE /blogs/{blog_id} - Delete a Blog Post </summary>

  ##### Input:

  ```
  {
  "id": 2
  }
  ```

  ##### Output:

  ```
  True
  ```

</details>

##### Forum Threads

<details>
<summary markdown="span">GET /forum - List of All Forum Threads</summary>


```
[
  {
    "id": 9,
    "title": "Fun Watering Schedules for Plants?",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://images.pexels.com/photos/5137558/pexels-photo-5137558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "author_id": 1,
    "created_on": "2023-04-20T11:48:32.085243",
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17"
  },
  {
    "id": 7,
    "title": "Good Starter Plants? ",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://images.pexels.com/photos/4505447/pexels-photo-4505447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "author_id": 1,
    "created_on": "2023-04-20T11:31:55.414440",
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17"
  },
  {
    "id": 4,
    "title": "Low Maintainance Office Plants",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://images.pexels.com/photos/4153232/pexels-photo-4153232.jpeg?auto=compress&cs=tinysrgb&w=800",
    "author_id": 1,
    "created_on": "2023-04-10T16:44:44.030373",
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17"
  }
]
```

</details>

<details>
<summary markdown="span">GET /forum/{forum_id} - Get One Forum Thread</summary>

  ```
  {
    "id": 9,
    "title": "Fun Watering Schedules for Plants?",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "image": "https://images.pexels.com/photos/5137558/pexels-photo-5137558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "author_id": 1,
    "created_on": "2023-04-20T11:48:32.085243",
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17"
  }
  ```

</details>

<details>
  <summary markdown="span">POST /forum - Create a Forum Thread</summary>

   ##### Input:

  ```
  {
  "title": "Best Plants for Shaded House Corners?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
  ```

  ##### Output:

  ```
  {
  "title": "Best Plants for Shaded House Corners?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  "author_id": 1,
  "created_on": "2023-04-20T11:48:32.085243",
  "username": "regan",
  "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17"
  }
  ```

</details>

<details>
  <summary markdown="span">PUT /forum/{forum_id} - Edit a Forum Thread</summary>

  ##### Input:

  ```
  {
  "title": "Best Plants for Shaded Apartment Corners?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
  ```

  ##### Output:

  ```
  {
  "title": "Best Plants for Shaded Apartment Corners?",
  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "image": "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  "author_id": 1,
  "created_on": "2023-04-20T11:48:32.085243",
  "username": "regan",
  "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17"
  }
  ```

</details>

<details>
  <summary markdown="span">DELETE /Forum/{forum_id} - Delete a Forum Thread </summary>

  ##### Input:

  ```
  {
  "id": 9
  }
  ```

  ##### Output:

  ```
  True
  ```

</details>

##### Blog Comments

<details>
<summary markdown="span">GET /comments - List of All Comments for One Blog </summary>
<br>


```
[
  {
    "id": 1,
    "author_id": 1,
    "blog_id": 4,
    "response": "Look at this cute lil snake plant!! 🐍🌿😍",
    "image": null,
    "created_on": "2023-04-20T14:58:30.203218",
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "regan",
    "last": "tewks"
  },
  {
    "id": 2,
    "author_id": 1,
    "blog_id": 4,
    "response": "Wow! Adorable 🥰🥰",
    "image": null,
    "created_on": "2023-04-20T14:59:01.381381",
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "regan",
    "last": "tewks"
  }
]
```

</details>

<details>
<summary markdown="span">POST /comments - Create a Blog Comment </summary>
<br>

##### Input:

```
{
  "response": "Wow, so cool!",
  "image": "leaf.png",
  "blog_id": 4
}
```

##### Output:

```
{
  "id": 9,
  "author_id": 1,
  "blog_id": 4,
  "response": "Wow, so cool!",
  "image": "leaf.png",
  "created_on": "2023-04-27T17:47:56.288824"
}
```

</details>

<details>
<summary markdown="span">PUT /comments/{comment_id} - Update a Blog Comment </summary>
<br>

##### Input:

```
{
  "response": "Wow, so cool! I love that!",
  "image": "leafwithheart.png"
}
```

##### Output:

```
{
  "id": 9,
  "author_id": 1,
  "blog_id": 4,
  "response": "Wow, so cool! I love that!",
  "image": "leafwithheart.png",
  "created_on": "2023-04-27T17:47:56.288824"
}
```

</details>

<details>
<summary markdown="span">DELETE /comments/{comment_id} - Delete a Blog Comment </summary>
<br>

 ##### Input:

  ```
  {
  "id": 2
  }
  ```

  ##### Output:

  ```
  True
  ```

</details>

##### Forum Replies

<details>
<summary markdown="span">GET /replies - List of All Forum Replies</summary>


```
[
  {
    "id": 4,
    "author_id": 1,
    "forum_id": 1,
    "answer": "Try a ZZ plant! They're pretty cute, too!",
    "image": "zzplant.png",
    "created_on": "2023-04-25T15:01:40.121767",
    "rating": 0,
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "Regan",
    "last": "Tewksbury"
  },
  {
    "id": 3,
    "author_id": 1,
    "forum_id": 1,
    "answer": "Maybe try some bamboo",
    "image": "bamboo.png",
    "created_on": "2023-04-25T15:00:49.268921",
    "rating": 0,
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "Regan",
    "last": "Tewksbury"
  },
  {
    "id": 2,
    "author_id": 1,
    "forum_id": 1,
    "answer": "Have you tried a snake plant?",
    "image": "snakeplant.png",
    "created_on": "2023-04-25T14:59:42.317108",
    "rating": 0,
    "username": "regan",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
    "first": "Regan",
    "last": "Tewksbury"
  }
]
```

<details>
<summary markdown="span">GET /replies/{reply_id} - Get One Forum Reply</summary>

```
{
  "id": 4,
  "author_id": 1,
  "forum_id": 1,
  "answer": "Try a ZZ plant! They're pretty cute, too!",
  "image": "zzplant.png",
  "created_on": "2023-04-25T15:01:40.121767",
  "rating": 0,
  "username": "regan",
  "avatar": "https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[…]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17",
  "first": "Regan",
  "last": "Tewksbury"
}
```

</details>
</details>

<details>
  <summary markdown="span">POST /replies - Create a Forum Reply </summary>

  ##### Input:

  ```
  {
    "forum_id": 1,
    "answer": "Try a ZZ plant! They're pretty cute, too!",
    "image": "zzplant.png",
    "rating": 0
  }
  ```

  ##### Output:

  ```
  {
  "id": 9,
  "author_id": 1,
  "forum_id": 2,
  "answer": "Try a ZZ plant! They're pretty cute, too!",
  "image": "zzplant.png",
  "created_on": "2023-04-28T16:52:46.160412",
  "rating": 0
  }
  ```

</details>

<details>
  <summary markdown="span">PUT /replies/{reply_id} - Edit a Forum Reply </summary>

  ##### Input:

  ```
  {
    "forum_id": 1,
    "answer": "Try a ZZ plant! They're really cute, too!",
    "image": "zzplant.png",
    "rating": 0
  }
  ```

  ##### Output:

  ```
  {
  "id": 9,
  "author_id": 1,
  "forum_id": 2,
  "answer": "Try a ZZ plant! They're really cute, too!",
  "image": "zzplant.png",
  "created_on": "2023-04-28T16:52:46.160412",
  "rating": 0
  }
  ```

</details>

<details>
<summary markdown="span">DELETE /replies/{reply_id} - Delete a Forum Reply </summary>
<br>

 ##### Input:

  ```
  {
  "id": 2
  }
  ```

  ##### Output:

  ```
  True
  ```

</details>

##### Blog Likes

<details>
<summary markdown="span">GET /likes - List of All Likes For One Blog</summary>

<br>


```
[
  {
    "id": 12,
    "account_id": 1,
    "blog_id": 4,
    "username": "sbshayne"
  },
  {
    "id": 13,
    "account_id": 2,
    "blog_id": 4,
    "username": "iluvplants"
  }
]
```

</details>

<details>
<summary markdown="span">POST /likes - Create a Blog Like</summary>

<br>

Parameter: `blog_id` (integer)

##### Input:

```
{
  "id": 15,
  "account_id": 1,
  "blog_id": 4
}
```
##### Output:

  ```
  {
    "id": 15,
    "account_id": 1,
    "blog_id": 4,
    "username": "sbshayne"
  }
  ```

</details>

<details>
<summary markdown="span">DELETE /likes/{like_id} - Delete a Blog Like</summary>

<br>

##### Input:

  ```
  {
  "id": 15
  }
  ```

  ##### Output:

  ```
  True
  ```

</details>

##### Accounts

<details>
<summary markdown="span">POST /api/accounts - Create an Account</summary>

```
{
  "first": "name",
  "last": "name",
  "username": "username",
  "email": "name@email.com",
  "password": password"
}
```
</details>
