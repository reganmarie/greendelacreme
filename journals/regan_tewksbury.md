## March 30, 2023

Today, I worked on:

* Created a DELETE API Endpoint
* Pair Programmed with Shayne to debug PUT endpoint

Today, the whole group completed all of the API endpoints! -celebrate confetti emoji-

I worked with Shayne to get a 404 error on a PUT request that does not have an existing forum id and did the DELETE endpoint on my own.
We merged with main and again, I learned about Git workflow as a some merges were made this morning and my working branch for PUT was behind.

I had an aha moment for working with FastAPI as I haven't really done much with FastAPI at this point. Conceptually, I understand it, but the implementation is obviously much harder than Django because it's not quite as plug and play, so it's very interesting to figure out.

## March 29, 2023

Today, I worked on:

* Created a PUT API Endpoint

Today, the whole group got 2 POST requests, 2 GET requests, and 1 PUT request for both forum and blog tables up.

Then, someone who did not author the code tested and approved the merge request then merged to main.

We verified the table in Beekeeper as well. It was really cool to get the API endpoints up without using Django and writing so much more code with FastAPI. My biggest lesson was the corect order of id=forum_id on this line:  return ThreadOut(id=forum_id, **old_data) -upside down smiley face-.

## March 28, 2023

Today, I worked on:

* Creating a table migration for users
* Familiarizing myself with Gitlab workflow

Today, the whole group (Shayne, Brandon, Adam, and I) each created a table migration or finalized the dev env for all of us to work from. We also created merge requests and practiced writing those and attaching the corresponding issues to them.

Then, someone who did not author the code tested and approved the merge request then merged to main.

We verified the table in Beekeeper as well. It was really cool to learn how to manually create a table without an ORM and to learn the Git workflow. I also learned how to get Beekeeper up and running and connected to the database, so it was also really gratifying to write a table migration and see the table in Beekeeper!
