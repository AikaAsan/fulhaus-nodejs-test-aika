ABOUT THE PROJECT
Fulhaus NodeJS test to build REST API for acronyms.

BUILT WITH
NodeJS, Express, MongoDB and Mongoose

GETTING STARTED

1. Clone the repo
   git clone https://github.com/AikaAsan/be-test.git
2. If you want to use your own MongoDB database, Change DB_CONNECTION in ENV file with your connection string.
   Or create .env file and add DB_CONNECTION = 'mongodb+srv://Aika:aika123@cluster0.lf8h4.mongodb.net/items?retryWrites=true&w=majority'
3. Install NPM packages
   npm install
4. to start the app
   npm start
5. to test the API endpoints use Postman

● GET /acronym?page=1&limit=10&search=:search
○ returns a list of acronyms, pagination using query parameters
○ response headers indicate if there are more results
○ returns all acronyms that fuzzy match against :search

● POST /acronym
○ receives an acronym and definition string
○ adds the acronym definition to the db

● PATCH /acronym/:acronymID
○ updates the acronym for :acronymID

● DELETE /acronym/:acronymID
○ deletes the acronym for :acronymID
