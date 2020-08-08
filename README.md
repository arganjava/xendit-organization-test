# xendit-organization-test v1.0.0


## Installation

- All the `code` required to get started
- This Service has dependency to other microservice called `comment-service`, so if you want to run locally make sure it already up on port 3001
### Clone

- Clone this repo to your local machine using `https://github.com/arganjava/xendit-organization-test`

### Setup

- install mongoDB run on default port 27017
- install nodejs runtime v12+
- install nodejs editor webstrom/visual studio code
---

### How To run App
- go to root source code
- npm install
- npm start
- if no error the apps will run on port 3000
---

### How To run Test
- go to root source code
- npm test
---

## Features Base On Requirement
- Organization add comment `POST https://xendit-organization.herokuapp.com/orgs/{{organizationName}}/comments`
- Organization show comment `GET https://xendit-organization.herokuapp.com/orgs/{{organizationName}}/comments`
- Organization delete all comments `DELETE https://xendit-organization.herokuapp.com/orgs/{{organizationName}}/comments`
- Organization get members `GET https://xendit-organization.herokuapp.com/orgs/{{organizationName}}/members`

## Additional Features
- Add new organization `POST https://xendit-organization.herokuapp.com/orgs`
- Add new member `POST https://xendit-organization.herokuapp.com/member`
- Organization add member `PUT https://xendit-organization.herokuapp.com//orgs/addMember/{{organizationId}}/{{memberId}}`

- > note: if you want to run locally just used `http://localhost:3000` instead
- > postman doc in folder `postman` file Xendit Organization and Member.postman_collection.json

## Test Case Scenarios
- `Organization add comment` When client input unregistered organization then error message will response code 422 and body message **organization not found**
- `Organization add comment` When client input registered organization then message will response code 200 and body message **{ "comment": "..." }**
- `Organization show comment` When client input unregistered organization then error message will response code 422 and body message **organization not found**
- `Organization show comment` When client input registered organization then message will response code 200 and body message **[{ "comment": "..." }]**
- `Organization delete all comments` When client input unregistered organization then error message will response code 422 and body message **organization not found**
- `Organization delete all comments` When client input registered organization then error message will response code 200 and body message **delete all success**
- `Organization get members` When client input unregistered organization then error message will response code 422 and body message **organization not found**
- `Organization get members` When client input registered organization then error message will response code 200 and body message **{ "_id": "id", "name": "name", "members": [ { "_id": "id", "name": "name", "avatarUrl": "avatarUrl", "totalFollower": 0, "totalFollowerTo": 0, "__v": 0 } ], "__v": 0 }**

## Technical Steps

- add new db repository on `models` folder 
- add new business logic on `services` folder
- create unit test to cover business logic on `test` folder
- add new route `routes` folder
- register all route in `app.js` file
- postman documentation in `postman` folder 

## Author

> Argan Megariansyah arganjava@gmail.com **[Linkedin](https://www.linkedin.com/in/argan-megariansyah-65751a89/)**