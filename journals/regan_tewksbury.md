## April 5, 20203

Today, I worked on:

* Pair programmed with Imron to create a nav bar functionality for a logout button
* Pair programmed with Imron to create a forum view for the front end using RTK QUery.

I pair programmed with Imron to get the forum component up and running using RTK toolkit. Then, I pair programmed with Shayne to get the logout button and navbar component working.

Brandon made a really nice navbar, so we'll use his design to make it look way better!

I had a huge aha moment when I realized that my redirect was not working because I did not await logout before redirecting!


## April 4, 20203

Today, I worked on:

* Pair programmed with Brandon to create a React Component for the sign up form
* Group programmed and researched to write front-end auth for RTK

Brandon is a wizard at front-end and made a great form after I suggested a geek for geeks form and CSS sheet that was Not Great.

We did some hard work researching front-end auth since we're using RTK. We used HMU since it became a blocker and James helped us out by telling us to use credentials:include in our fetchBaseQuery and it worked!

## April 3, 20203

Today, I worked on:

* Create Logout endpoint
* Pair programmed with Shayne to protect our endpoints
* Group programmed to install RTK and create store

Today, the whole group finished backend authentication, installed Tailwind, and installed RTK Query so we can use RTK to control our state for the entire front end. This will be super useful as we create a front end that automatically updates the home feed when a new blog or forum thread is created!

I learned a lot about auth, how to use the information from the JWT token to automatically create the Author in a post request, and protect some endpoints so only the users who created the blog or forum can update or delete it. Shayne is super smart and great with this kind of coding so it was great to watch her code for this!

I personally had some computer issues and am haivng major node_module issues with my GHI so i'm going to get into that today.

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
