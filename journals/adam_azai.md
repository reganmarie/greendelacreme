
## April 3, 2023

Today, I worked on:

* Tailwind, Toastify installation
* BrowserRouter Setup
* Redux Toolkit for Front-End Authentication
* Issue creation
* Sign Up Page


Today I worked alongside Brandon to install tailwind css and react-toastify, a message alert library, to have the ability to style our js pages. We also managed GitLab throughout the day to see what new issues and merge requests that Shayne and Regan needed to finish the backend authentication. I realized that we needed a Browser Router and Routes in our App.js to view different js pages on different urls and thus merged that feature into main. I started working on the Sign Up page but forgo my progress as we needed to focus on completing the pending merge requests. As a group we finished backend authentication, protecting endpoints, installing tailwind, and starting implement rtk for frontend authentication at the end of the day.

An aha moment today was learning how amazing redux is from curtis's videos and further explaining from shayne and regan. Its functionality is amazing in how the states refresh once any data is changed throughout the site and how we do not need to fetch the urls multiple times in our js pages. And no need for useEffect in our js pages as well.




## March 30, 2023

Today, I worked on:
* Authentication for users

Today I mainly focused on starting to implement authentication for our project while everyone else debugged the delete and put endpoints merge requests along with the error handling of them as well. I followed curtis's videos to garner a greater understanding of how  the authentication works. I ended up finishing the login and create user endpoints for our project and had to stop to allow others in the group to complete some endpoints. Now we need to discuss on spilting in pairs to finish authenication/change endpoints and start working on the frontend portion of our MVP.

An aha moment today was discovering on how we protect the password of a user from being a part of the pydantic model as we use a hashed_password variable to protect the password string from being returned. As well as learning that some of the endpoints are already coded for us in the jwtdown library provided.


## March 29, 2023

Today, I worked on:

* Creating the POST, GET, GET endpoints for forum table database
* Error handling for endpoints

Today we focused on getting our endpoints for our MVP done and spilt into coding pairs for the day. Me and regan worked smoothly on the endpoints but ran into some issues in validating the pydantic timestamp models and made the decision alongside with shayne and brandon to switch the created_on column from timestamp to datetime. We discovered that we can use try and except blocks in our routers for error handling instead of our queries. Got the hang of making endpoints and getting used to FastAPI day by day. The next goal is to start authorization in order to grab the id of the user who makes a thread.

An aha moment today was learning how to grab our foreign key data and display the informations stored in that table. Adjusting our ThreadOut model to the columns of accounts allows us to now grab the accounts'username and any other information we may want to grab in the future.


## March 28, 2023

Today, I worked on:

* Creating the forum table by making the first migration
* Learning how to merge into main with merge requests and closing issues with the group

Today we had our first standup as a group. I ended up as scrum master for the day and simply explained what we did yesterday and what our goals for today was. I would like to say that we reached the goals we set our group up for. Each of us ended up getting experience in creating a migration and learning how to approve/set up merge requests in GitLab.

Today I found that we can alter our migrated tables to include the foreign keys at a later date so we do not need to stress over potential stretch goal migrations in the future. The alter SQL statement allows us to alter the migration table down the line.




- As a developer I want users who create a thread/blog to have their author_id automatically attached to the
  post upon sending the 'POST' requests by using the auth token
- So that the thread/blog post is connected to an actual user and can be traced back to either of them
- As a developer I want to protect the crud endpoints
- So that only logged in users can use the features of our site
