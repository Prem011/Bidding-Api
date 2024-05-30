### Test of the Bidding api covering the main functionality including their input's and outputs
### Usage
Once the server is running, you can access the API endpoints using tools like Postman or curl. Here are the available endpoints:

User Routes
### Register a User ###
Endpoint: POST /users/register

*Input*
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}

*Output*
{
  "message": "User registration successful"
}
                  
**Errors *: 
*err1.*
400 Bad Request : validation errors

{
  "errors": [
    {
      "msg": "Username is required",
      "param": "username",
      "location": "body"
    },
    ...
  ]
}
                
*err2* 
Error : 409 Conflict: User already exists.

{
  "message": "User already exists with this username"
}

      
### Login a User ###
Endpoint: POST /users/login 
pass the field for authentication :

*Input*

{
  "username": "john_doe",
  "password": "password123"
}

*Output*
200 OK: Login successful.

{
  "message": "Login successful"
}

*Errors*
*err1*
400 Bad Request: Validation errors.
{
  "errors": [
    {
      "msg": "Username is required",
      "param": "username",
      "location": "body"
    },
    ...
  ]
}

*err2*
401 Unauthorized: Invalid credentials
{
  "message": "Invalid credentials"
}

### Get User Profile ###
Endpoint: GET /users/profile
*Output*
200 OK: Profile rendered successfully

in json format :

{
  "message": "Profile rendered page successfully"
}

*Error*
500 Internal Server Error: An error occurred while loading the profile

In json format

{
  "message": "An error occurred while loading the profile. Please try again."
}

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### ITEM ROUTES ###

1. Get All Items

Endpoint: GET /items

*Output*
200 OK: Returns an array of items with pagination details

in json format -

{
  "message": "Retrieve auction items with pagination",
  "items": [
    {
      "_id": "60b5916d7a1e3d001fafd372",
      "name": "Sample Item",
      "description": "Sample Description",
      "starting_price": 100,
      "current_price": 150,
      "image_url": "sample.jpg",
      "end_time": "2022-06-30T12:00:00.000Z",
      "createdAt": "2022-05-31T12:00:00.000Z"
    },
    ...
  ],
  "pagination": {
    "totalItems": 100,
    "totalPages": 10,
    "currentPage": 1,
    "pageSize": 10
  }
}

2. Get Item by ID :-
   Endpoint:  GET /items/:id

*Output*
200 OK: Returns the details of the specified item.

*In json format* 

{
  "message": "Retrieve a single auction item by ID successfully",
  "item": {
    "_id": "60b5916d7a1e3d001fafd372",
    "name": "Sample Item",
    "description": "Sample Description",
    "starting_price": 100,
    "current_price": 150,
    "image_url": "sample.jpg",
    "end_time": "2022-06-30T12:00:00.000Z",
    "createdAt": "2022-05-31T12:00:00.000Z"
  }
}

errors**

err1. 404 Not Found: Item not found.
{
  "message": "Item not found"
}

err2. 500 Internal Server Error: An error occurred while retrieving the item.
{
  "message": "Internal server error",
  "error": "error details"
}


3. Create an Item :-
   Endpoint: POST /items
*Input*
name: Sample Item
description: Sample Description
starting_price: 100
current_price: 150
image_url: [image file]
end_time: 2022-06-30T12:00:00.000Z

*Output*
. 201 Created: Item successfully created.
   {
  "message": "Item successfully created",
  "item": {
    "_id": "60b5916d7a1e3d001fafd372",
    "name": "Sample Item",
    "description": "Sample Description",
    "starting_price": 100,
    "current_price": 150,
    "image_url": "sample.jpg",
    "end_time": "2022-06-30T12:00:00.000Z",
    "createdAt": "2022-05-31T12:00:00.000Z"
  }
}

err1. 400 Bad Request: Validation errors.

{
"errors": [
  {
    "msg": "Name is required",
    "param": "name",
    "location": "body"
  },
  ...
]
}

err2. 500 Internal Server Error: An error occurred while creating the item.

{
  "message": "Internal server error",
  "error": "error details"
}

4. Update an Item
Endpoint: PUT /items/:id
*Output*
 returns a success message along with the details of the updated item.

5. Delete an Item
Endpoint: DELETE /items/:id
*output*
If successful, returns a success message indicating that the item has been deleted.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Bid Route ###
*Get All Bids for an Item*
Endpoint: GET /items/:itemId/bids
Middleware: isLoggedIn, verifyToken
Controller Function: bidController.getAllBidsForItemsWithItemId
Description: Retrieves all bids associated with a specific item.

Expected Output:
*Success:*
Status Code: 200 OK
Content Type: JSON
   Body: An array of bid objects.
   
Error:
err1. 
Status Code: 400 Bad Request
Body: { "message": "Invalid item ID format" } if itemId format is invalid.

err2.
Status Code: 404 Not Found
Body: { "message": "Item not found" } if item with itemId does not exist.

err3.
Status Code: 500 Internal Server Error
Body: { "message": "Internal Server Error", "error": <error_message> } for any other internal errors.


## Place a Bid on an Item ##
Endpoint: POST /items/:itemId/bids
Middleware: isLoggedIn, verifyToken
Controller Function: bidController.postBid
Description: Allows a user to place a bid on a specific item.

*Expected Input: *
itemId: The ID of the item on which the bid is being placed (path parameter).
bid_amount: The amount of the bid (body parameter).

{
  "bid_amount": 150
}

Expected Output:
Success:
Status Code: 201 Created
Content Type: JSON
Body: {
  "message": "Bid placed successfully",
  "bid": {
    "_id": "60b5916d7a1e3d001fafd372",
    "itemId": "60b590b67a1e3d001fafd36f",
    "userId": "60b590207a1e3d001fafd36e",
    "bid_amount": 150,
    "createdAt": "2022-05-31T12:00:00.000Z",
    "__v": 0
  }
}

Error:
*err1.  *
Status Code: 400 Bad Request
Body: { "message": "bid amount must be greater than current price" } if the bid amount is not greater than the item's current price.

*err2.*
Status Code: 404 Not Found
Body: { "message": "Item not found" } if item with itemId does not exist.

*err3.*
Status Code: 500 Internal Server Error
Body: { "message": "Internal Server Error", "error": <error_message> } for any other internal errors.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Notification Route ###

Get User Notifications

Endpoint : GET /notifications

Response
200 OK: Returns an array of notifications for the authenticated user.

[
  {
    "_id": "60b5916d7a1e3d001fafd372",
    "user_id": "60b590b67a1e3d001fafd36f",
    "message": "You have a new bid",
    "is_read": false,
    "createdAt": "2022-05-31T12:00:00.000Z"
  }
]


**Mark Notifications as Read**
Endpoint :- POST /notifications/mark-read

Response
Success : 200 OK: Notifications marked as read.

{
  "message": "Notifications marked as read"
}

*Errors*
err1. 500 Internal Server Error: An error occurred while marking notifications as read.
{
  "message": "Internal server error",
  "error": "error details"
}








