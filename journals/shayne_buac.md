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
