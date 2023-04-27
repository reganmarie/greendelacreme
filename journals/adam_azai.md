## April 26, 2023:
Today, I worked on:

* Debugging

Today I worked on debugging my replies as it will be a gigantic merge into main and needs to ensure that it passes the pipeline and is ready for deployment.

An aha moment was changing my reply migrations table due to shayne's review that my constraints for replies was wrong.

## April 25, 2023:
Today, I worked on:

* Lottie Animations
* Debugging
* Styling

Today I mainly focused on cleaning up the forum and replies components so that they are ready for presentation. Initially I was going to use animations similar to shayne's hanging plants but I figured out how to use lottie animations at the end of the night and implemented a few animations in the forum list and replies list.

An aha moment was setting the tomato animation to z:index -1 as I had an issue where the bounding box of the animation was gigantic and immutable. Thus i realized I could just place it in a layer behind the threads solving the issue of being unable to actually click on the thread.

## April 24, 2023:
Today, I worked on:

* Replies front end functionality
* Replies styling

Today I added the api endpoints as features on the forum detail pages and got my redux queries to work on the site. I continued styling the replies components and forum components to match the aesthetic that my other teammates designed. Users can now create a reply using a form underneath the thread and edit/delete the reply, if they made it, in a modal. Also debugged a few issues with replies and forum updates turning blank if the user does not change anything in the form.

An aha moment was when shayne helped me debug edit a reply by setting the htmlFor of the modal to ${reply.id}. That ended up solving the issue I had when editing a reply and only getting a single reply's data for the answer and image instead of the specific replies' data.\

## April 22-23, 2023:
Over the weekend, I worked on:

* Reply Migration Table
* Reply Queries and Routers
* Reply Redux

Today I started working on a stretch goal of adding replies to a thread. I made the migration for the new table, reply. Created the backend endpoints for get all, post, put, get and delete a reply as well as the queries for it. Included error handling for all endpoints as well. After all the endpoints were made I set up redux for the new endpoints and ended the day without testing whether my redux queries worked.

An aha moment was realizing that I needed to include hard-coded data, 0, and not a variable for ratings as I have no ideas how to implement the voting system yet.

## April 20, 2023:
Today, I worked on:

* Create a Thread Modal function
* Edit a Thread modal function

Today I worked on adding the features of a user being able to create a thread once clicking on a button create a thread. That button will then pop up a modal with a form allowing users to create a thread. Once the thread is submitted it is instantly added to the page behind the modal, thanks redux invalidating the forum list. A toast notification will appear if the post is successful and a user can exit out of the modal by clicking on the x button in the upper right corner or the exit button. I also added the feature of editing the forum detail page by using a modal again. Once a user, who made that thread, clicks on update thread, they are shown the same form they used to create it to allow them to edit their thread.

An aha moment today was learning how to stop the duplicate toast messages when posting a thread by giving the toast its own unique Id.


## April 19, 2023:
Today, I worked on:

* Forum Editing
* Delete Forum Modal
* Deployment

Today I worked on finishing the functionalities of forum, mainly the feature of users being able to update their forum and delete it as well. I ended up making a modal for both update and delete as well as including a confirmation for deleting a thread. Fixed issue of toast alerts appearing twice and fixing error when updating the thread with no changes does not make the original thread blank.

An aha moment today was realizing that my OnChange = target.value would not pick up the original values of a forum when editing thus the states of the hooks were blank if a user decided to update their post. This would lead to an empty thread as the title, body and image would turn blank. I fixed the issue by setting a value inside each of the inputs and using useEffect to ensure that the values actually exist and are not undefined before inserting them into the input boxes for editing a thread.


## April 18, 2023
Today, I worked on:

* Unit Tests

Today we focused on writing our unit tests in order to get full points in that category. I wrote two unit tests, one for testing a empty list and the other for creating a mock thread. It took awhile to figure it out but we ended up passing our tests at the end of the day.

An aha moment was figuring out that we had to override our own authentication for these unit tests as we have no account associated with these unit tests.


## April 17, 2023

Today, I worked on:

* Creating a Thread FrontEnd
* Error page for invalid routes

After the long break I was able to get into the groove of coding quite fast and had a productive day. Initially started the day with debugging with Regan for the dropdown feature of editing a thread, a return statement was needed to actually show the dropdown items. Brandon brought up a good issue with inputting an nonexisting id in the url path for a specific form only shows a blank page. From that statement I decided to add a 404 page to any url that does not exist in our routing. I was able to make a modal instead of a new page to allow logged in users to create a post that instantly adds the new thread without refreshing the page, bless redux. Spent the rest of the day styling the modal to look clean and add closing buttons to exit the modal.

An aha moment was fixing the syntax error in the dropdown component as I noticed there was no return statement for the function.


## April 6, 2023

Today, I worked on:

* Styling the Forum page
* Debugging protected Routes

We were able to solve the issue with route redirection if user is authorized to view a page or not. A single if conditional statement was needed before our return to actually return null for token if it was null. I paired with regan for the day and we collaborated on styling and formatting the forum page of our project. We ended up making the threads look very similar to our wireframe, and only requires minimal work beyond it. There needs to be a bit more content on the fourm page as it looks bad with all the empty white space currently.

An aha moment today was learning about tailwind stling in detail and how simple statements as space between sets our tags exactly in the way we want it. As well as learning about accordions with tailwind.


## April 4, 2023

Today, I worked on:

* Implementing FE auth for Forum.js
* Protecting and redirecting routes

Today's goal was to finish front end authorization by adding the credentials include to forumApi and making a forum.js file to view wheter we could grab our thread data. We were successful in that endeavor but ran into a blocker regarding protecting the actual url routes for certain js files. We tried multiple navigation react route functionals, conditionals, ternaries and nested routes to solve the issue but kept running into different issues once one side was protected.

An aha moment was learning about navigate and useNavigate as well as learning a bit about Typescript through the time I spent reading the Redux documentation.


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

Today I mainly focused on starting to implement authentication for our project while everyone else debugged the delete and put endpoints merge requests along with the error handling of them as well. I followed curtis's videos to garner a greater understanding of how  the authentication works. I ended up finishing the login and create user endpoints for our project and had to stop to allow others in the group to complete some endpoints. Now we need to discuss on spliting in pairs to finish authenication/change endpoints and start working on the frontend portion of our MVP.

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
