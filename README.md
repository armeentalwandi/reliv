
# reliv
Store your memories in one spot. This application is made for close friends who may live far from one another. Stay connected with your friends by sharing your day to day activities + memories so no matter where you are, you can stay updated!

## Technologies

This fullstack application was made with React, GraphQL, TypeScript, and MySQL. 


## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the backend app in the development mode.\
Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to view it in the browser.

Then, in the web directory, you can run: 

### `npm run dev`

This runs the React application in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Reliv in Action + Demo

#### Registration Page
<img width="500" alt="register" src="https://user-images.githubusercontent.com/58177161/132969219-28f610e6-06e8-4bdd-9916-10a6a27f84da.png" height="700">



#### Login Page
<img width="495" alt="login" src="https://user-images.githubusercontent.com/58177161/132969221-f344b116-cff8-4e89-acbe-81fc2bdc8a2e.png">
If the user forgot their password, they could simply click on forgot password and input their email which will send them a link to reset password if the account is registered. Reliv also utilizes session id which recognizes the user and keeps track of the state of their application. 


#### All Memories Page with Like/Dislike Functionality and Cursor Based Pagination
To share about their adventure, the user can click on Make A New Memory!
Friends can like and dislike others' posts, and with the incorporation of session id, they are unable to dislike or like more than once. With session id tracking likes and dislikes, Reliv also handles edgecases such as skipping over to 0... 
![memories page](https://user-images.githubusercontent.com/58177161/132969872-783d8936-e970-410d-a988-85eb257f08c0.jpeg)



#### Make a Memory Page 
User can create a memory by clicking the top-right button and only can do so if they are logged in. 
<img width="800" alt="make a memory button" src="https://user-images.githubusercontent.com/58177161/132969431-4b9dffc9-d5d7-4b78-9639-9690734a1b01.png">
<img width="1000" alt="create a post" src="https://user-images.githubusercontent.com/58177161/132969432-1e4e00fc-d973-466e-9022-ecfd0d20fb2f.png">





#### Edit a Memory Page
<img width="400" alt="updating a post" src="https://user-images.githubusercontent.com/58177161/132969441-636934d9-245e-482e-81bd-bfff433da8d8.png">
Through the incorporation of session id in Reliv to monitor authorization, only creators of posts can edit their posts and not of others. As you can see, the option to edit only appears if it's their own post. 



#### Walk through/Demo
