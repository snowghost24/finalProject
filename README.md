# React Voice Command App

## About This Boilerplate

This is a Node/Express/React app which uses IBM-Watson conversation platform to provice voice assitance.

## Try any of the following



``
change the background color of the talk button to <your color>
change the background color of the stop button  to <your color>
insert the logo image
insert the title image
change the background color of the image container to <your color>

``

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following commands:

```
yarn install
cd client
yarn install
cd ..
``

After both installations complete, run the following command in your terminal:

```
yarn start
```

That's it, your app should be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

After confirming that you have an up to date git repository and a Heroku app created, complete the following:

1. Build the React app for production by running the following command:

```
yarn build
```

2. Add and commit all changes to git

3. Push to Heroku

If all previous steps were followed correctly, your application should be deployed to Heroku!
