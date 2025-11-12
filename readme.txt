express //Creates the server, handles routes, and manages middleware for the application.
ejs	//Renders dynamic HTML pages on the server by injecting data into view files.
pg	//Manages connections (Pool) and executes SQL queries against a PostgreSQL database.
bcryptjs	//Security: Asynchronously hashes user passwords for secure storage and compares them during login.
express-session	//Stores user-specific state (like logged-in status) between requests using cookies and server storage.
dotenv	//oads secret credentials and environment variables from a .env file into process.env.

nodemon is a utility for Node.js development that automatically restarts the server whenever code files are changed and saved, greatly speeding up the development feedback loop.

npm i express ejs pg bcryptjs express-session dotenv 
npm i nodemon -D