# Get Together app

Always wanted to make an application to help me and my family and friends get together and have a great time. without hustle of messaging everyone separately.  

## Description
I built this app with intention to implement and demonstrate full scope of the skills that I have acquired during Flatiron school Software engineering program.
This app uses a Rails API and React frontend that can be deployed to a single domain. Both projects are contained in the same repository. All React code is in the `/client` directory.

## Overview 
In the Get Together app users will be able to:
- create new profile;
- login/logout;
- stay logged in (unless clicked 'logout');
- see all events created by other users(sort them by categories, or search my event name or host);
- attend/unattend events created by other users;
- leave comments for events, delete their oun comments;
- create/delete/edit events;
- on My-events page see events they created and events they attending;

## Requirements
- Ruby 2.7.4
- NodeJS (v16), and npm
- Postgresql

## Setup 
Fork and clone this repository into your local environment. Navigate into its directory in the terminal, then run code . to open the files in Visual Studio Code.
- run `bundle install`
- run `rails db:create db:migrate `
- run `npm install --prefix client`

You can use the following commands to run the application in your local environment:
- `rails s` : run the backend on http://localhost:3000
- `npm start --prefix client` : run the frontend on http://localhost:4000

Or as well you can run this command to start the frontend and backend servers(configuration for running in development is in the `Procfile.dev` file):

```sh
heroku local -f Procfile.dev
```

## See deployed application 

https://get-together-project-2022.herokuapp.com/