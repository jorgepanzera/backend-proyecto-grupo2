
// para esquema de arquitectura general, ver el de pro-mern-stack

// Common Express Project Structure

    // Esta buena, tiene un esquema de arquitectura de la API que se puede usar, incluye tests (no separa app de server)
    https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way

    // Completa con Routes - Controllers - Services - Middleware (jwt/loggers) similar a la anterior (separa app de server)
    https://blog.treblle.com/egergr/

   // Reglas para API Rest
    https://blog.treblle.com/the-10-rest-commandments/


// Database (ORM o sentencias sql)

// ORM (este parece bueno)
https://sequelize.org/docs/v6/category/core-concepts/

// Sentencias sql con cada driver para Node

// Node best praqctices
https://github.com/goldbergyoni/nodebestpractices

Let us go through a typical strucutre of an Express based web application.

project-root/
   node_modules/          // This is where the packages installed are stored
   config/
      db.js                // Database connection and configuration
      credentials.js       // Passwords/API keys for external services used by your app
      config.js            // Environment variables
   models/                 // For mongoose schemas
      books.js
      things.js
   routes/                 // All routes for different entities in different files
      books.js
      things.js
   views/
      index.pug
      404.pug
        ...
   public/                 // All static files
      images/
      css/
      javascript/
   app.js
   routes.js               // Require all routes in this and then require this file in
   app.js
   package.json

   // Morgan express logger
   https://expressjs.com/en/resources/middleware/morgan.html