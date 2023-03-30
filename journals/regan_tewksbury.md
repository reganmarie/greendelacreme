## March 28, 2023

Today, I worked on:

* Created a PUT API Endpoint

Today, the whole group got 2 POST requests, 2 GET requests, and 1 PUT request for both forum and blog tables up.

Then, someone who did not author the code tested and approved the merge request then merged to main.

We verified the table in Beekeeper as well. It was really cool to get the API endpoints up without using Django and writing so much more code with FastAPI. My biggest lesson was the corect order of id=forum_id on this line:  return ThreadOut(id=forum_id, **old_data) -upside down smiley face-.

## March 29, 2023

Today, I worked on:

* Creating a table migration for users
* Familiarizing myself with Gitlab workflow

Today, the whole group (Shayne, Brandon, Adam, and I) each created a table migration or finalized the dev env for all of us to work from. We also created merge requests and practiced writing those and attaching the corresponding issues to them.

Then, someone who did not author the code tested and approved the merge request then merged to main.

We verified the table in Beekeeper as well. It was really cool to learn how to manually create a table without an ORM and to learn the Git workflow. I also learned how to get Beekeeper up and running and connected to the database, so it was also really gratifying to write a table migration and see the table in Beekeeper!
