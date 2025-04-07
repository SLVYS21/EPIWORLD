const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyparser = require('body-parser');
const cors = require('cors');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const cron = require('node-cron')
const helmet = require('helmet')

dotenv.config();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: false }));

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(1076, () => console.log("Server running on port 1076"));
})
.catch((err) => console.log(err));

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
    info: {
        title: "Admin API",
      version: "1.0.0",
      description: "API for managing Society ERP",
      contact: {
          name: "Sylvanus BONI",
          email: "sylvanusboni21@gmail.com",
        },
        servers: ["http://localhost:1076"],
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    },
    apis: ["./routes/**/*.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


// app.use("/api");

app.use("/api/", require('./routes/test.route'));

app.use("/api/lost", require('./routes/Lost/lost.route'));

app.use("/api/", require('./routes/user.route'));

app.use("/api", require("./routes/Cantine/menu.route"));

app.use("/api", require("./routes/Cantine/dailypoint.route"))

app.use("/api", require("./routes/Cantine/order.route"))

app.use('/api', require('./routes/Stack/post.route'))

app.use('/api', require('./routes/Stack/thread.route'))


app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

cron.schedule('* * * * *', () => {
    //orders();
});