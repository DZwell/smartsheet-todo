A simple CRUD app that utilizes [Smartsheet](https://www.smartsheet.com/) as the data store

Technologies used: React, Express, Node, Sinon, Mocha

While building this project, I learned about `create-react-app` which is a nifty little tool that does all of the configurtation of webpack and things like that for you, which is awesome so I could just get to building my app. One of the tidbits I picked up while using `create-react-app` is that it is incredibly opinionated about where the entry point file lives and what it's called. In my case it's `/app/client/public/index.html`. Any renmaing of the folder containg the file or the file itself causes the app to break. In hindsite, I would have set up the React bit first and built out the rest of the folder structure from there. I, however, started my project with the backend first so I was forced to have this wonky folder structure (including two `package.json` files)

To start:
+ 1. Run `git clone https://github.com/DZwell/smartsheet-todo.git`
+ 2. In one terminal window `cd` into `/app/server` and run `npm install` followed by `node index.js`
+ 3. In another terminal window `cd` into `/app/client` and run `npm install` followed by `npm start` 
+ + a. When asked "Would you like to run the app on another port instead?" Select "yes"
+ 4. Go to `localhost:3001` in your browser
+ + a. Run tests in `/app/server` by running `npm test`





