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
<img width="517" alt="register" src="https://user-images.githubusercontent.com/58177161/132969219-28f610e6-06e8-4bdd-9916-10a6a27f84da.png" width="40" height="300">



#### Login Page
If the user forgot their password, they could simply click on forgot password and input their email which will send them a link to reset password if the account is registered. Reliv also utilizes session id which recognizes the user and keeps track of the state of their application. 
<img width="495" alt="login" src="https://user-images.githubusercontent.com/58177161/132969221-f344b116-cff8-4e89-acbe-81fc2bdc8a2e.png">

#### All Memories Page with Like/Dislike Functionality and Cursor Based Pagination
To share about their adventure, the user can click on Make A New Memory!
Friends can like and dislike others' posts, and with the incorporation of session id, they are unable to dislike or like more than once. With session id tracking likes and dislikes, Reliv also handles edgecases such as skipping over to 0... 
<img width="1406" alt="memories page" src="https://user-images.githubusercontent.com/58177161/132969318-d02765e6-0b82-4f65-b525-715d4fbff283.png" width="100" height="400">
<img width="1407" alt="memories page with load more" src="https://user-images.githubusercontent.com/58177161/132969321-a4870102-38de-42b2-973a-bcff76ecb1a0.png" width="100" height="400">


#### Make a Memory Page 
User can create a memory by clicking the top-right button and only can do so if they are logged in. 
<img width="862" alt="make a memory button" src="https://user-images.githubusercontent.com/58177161/132969431-4b9dffc9-d5d7-4b78-9639-9690734a1b01.png">
<img width="1392" alt="create a post" src="https://user-images.githubusercontent.com/58177161/132969432-1e4e00fc-d973-466e-9022-ecfd0d20fb2f.png">
<img width="481" alt="cp post zoomed" src="https://user-images.githubusercontent.com/58177161/132969433-6e9045f1-d1b2-4158-b035-c8b51a504839.png">




#### Edit a Memory Page
Through the incorporation of session id in Reliv to monitor authorization, only creators of posts can edit their posts and not of others. As you can see, the option to edit only appears if it's their own post. 
<img width="483" alt="updating a post" src="https://user-images.githubusercontent.com/58177161/132969441-636934d9-245e-482e-81bd-bfff433da8d8.png">
<img width="848" alt="cant edit posts not your own" src="https://user-images.githubusercontent.com/58177161/132969437-6d2de514-2081-4459-90b2-de08d2069c26.png">
<img width="843" alt="can edit posts your own" src="https://user-images.githubusercontent.com/58177161/132969438-efdd6a6f-0b28-4aac-a226-181c06858ca8.png">


#### Walk through/Demo
