# Freezr Food Storage Application
---
## Purpose
---
Freezr is an application that allows uers to store their personal food inventory, keeps track of food expiration dates and recommends recipes to use their expiring food. Recipes are provided by the Yummly API http://api.yummly.com/v1.

## Installation
---
To install, simply clone this repository and

    npm install

This will install all necessary dependencies.

## API Documentation > Endpoints
---
### *Create new Users* > POST /api/create_user
**PURPOSE** -This endpoint is used to create a new ```User```.

**BODY** - This endpoint requires a request body with the following syntax:
```
{
    username: STRING,
    email: STRING,
    password: STRING
}
```
> `username` - The user created username that will be displayed on all social features of the application
`email` - The users email that will be used to login to the app
`password` - The user created password to allow the user to login and recieve authentication.

**RESPONSE** - Upon validation success or failure of the request, the server will send back a response in the following syntax:

```
{
    success: BOOL,
    message: STRING
}
```

### Authors
---
* Jonathan Ullberg - https://github.com/jonullberg
* Claudia Cuevas - https://github.com/clcuevas
* Bob Day - https://github.com/bullitbd
* Jay Springate - https://github.com/jayspringate
