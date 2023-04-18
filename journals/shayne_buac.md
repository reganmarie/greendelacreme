## April 6, 2023
Today, I:
* Reviewed Imron's merge request for the forum frontend auth
* Finished reformatting the routes and adding protection and redirection to the appropriate pages and made the merge request for it
* Started working on the blog list frontend view for the feed with Brandon (I was the driver and he was the navigator)
* Learned more about Tailwind :)

## April 5, 2023
Today, I worked on:
* Adding functionality to the sign-up form with Brandon (he was the driver and I was the navigator)
* Helping Regan with her logout button functionality
* Making routes and adding protection to them in App.js
* Fixing the duplicate toasts

## April 4, 2023
Today, I worked on:
* Creating a login form
* Adding functionality to the login form (so making sure signed up users can actually login)
* Frontend auth for blogApi
* Styling the login page

I pair programmed with Adam where I was the driver and he was the navigator. I already had the login form and its functionality made beforehand, so we focused on making sure that logged in users can see a protected endpoint. I made a BlogList component to test that and we came across a blocker with this as we were struggling to understand Redux frontend auth. James came to help and all we needed to add was `credentials: 'include'` to the `fetchBaseQuery` in `blogApi` and that allowed logged in users to see the blog list whereas logged out users saw an empty page.

Furthermore, after class, I worked on styling the login page to get familiar with Tailwind.

## April 3, 2023
Today, I worked on:
* Adding protection to all the endpoints
* Changing the create and update endpoints so that you no longer need to put the author_id into the request body

I pair programmed with Regan today where I was the main coder and she was my navigator. We were able to get the create endpoints to work so that the author_id of the newly created blogs and forum threads are automatically link to the logged in user's id.

We came across a blocker for the PUT endpoint where we kept getting a 400 bad request but no other context. We tried putting print statements and realized it was not printing the db or result after the SQL statement, so we thought the problem was with the SQL statement and it turned out it was. After trying many things, Adam came in to help and pointed out that we were missing the blog_id in the list to correspond to `WHERE id = %s`. Now, I'll make sure to keep in mind that every time we put `%s`, there has to be a corresponding value in the list!

## April 2, 2023
Today, I tried to understand auth by doing it myself in my name branch. I got everything to work in the back-end, including sign up, login, logout, get token, protect an endpoint (create blog), and make it so that users can login with either their email or username.

## March 31, 2023
Today, I worked on:
* Organizing GitLab

With the consent of my team, I created three milestones:
* Migration Tables
* Forum API Endpoints
* Blog API Endpoints

## March 30, 2023
Today, I worked on:
* Reviewing 6 merge requests
* Debugging my team's code

I reviewed 6 merge requests for the following:
* GET all threads endpoint
* GET a single forum thread's details endpoint
* PUT blog endpoint
* PUT thread endpoint
* GET a blog's details endpoint
* DELETE blog endpoint

I primarily reviewed merge requests by myself and occasionally asked questions to the assignee if I had any issues. Additionally, I assisted Imron with debugging his auth code.

Brandon and I came across a blocker for his PUT blog endpoint merge request where the PUT requests were returning a status 200 when I tried updating an id that did not exist. We came to the solution to use another try-except block that utilized the `get_one` method to check if the object exists first before updating it. Regan was then able to incorporate that into the other PUT endpoint for the forum threads, and we did similar logic for the delete endpoints as they were initially returning true for every request!

## March 29, 2023
Today, I worked on:
* Making the first endpoint for the blogs page with Brandon (POST /blogs)
* Making the GET /blogs endpoint to get all blogs
* Debugging code with the entire green team

I pair programmed with Brandon where I was the driver and Brandon was the navigator. We finished the pydantic models for blogs and the POST /blogs endpoint to enable creation of blogs in the backend.

We came across a blocker where we kept getting an error when we tested the endpoint on localhost:8000/docs and realized it had to do with the `on_created` property. We talked to the entire team as they had the same blocker. After extensively reading through resources, I came up with the solution to use `datetime = datetime.now()` for the pydantic model for BlogOut and add `created_on` to the `RETURNING` SQL statement. It took many trials and errors but I'm glad we were able to resolve this! :)

## March 28, 2023
Today, I worked on:
* Setting up the development environment
* Configuring all the Docker files
* Adding dependencies to the requirements.txt file
* Adding files and folders to organize the file structure for our backend
* Making a merge request for this issue which was approved and got our team started on coding for the project!
* Reviewing a merge request and familiarizing myself more with Git

As a group, we got to work on the migrations together where each person got the chance to make a migration file, make a merge request, and approve a merge request. I specifically made a migration file to alter the `forum` and `blog` tables to add an author_id column which is a foreign key to the accounts table. This will be helpful to reuse later on when we add more tables and want to add foreign keys to our existing ones for our stretch goals (blog comments and thread replies)!

## March 24, 2023
Cloned the project and made a new a branch 'shayne' to look at the code and play around with it.
