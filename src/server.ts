// the polyfills must be one of the first things imported in node.js.
// The only modules to be imported higher - node modules with es6-promise 3.x or other Promise polyfill dependency
// (rule of thumb: do it if you have zone.js exception that it has been overwritten)
// if you are including modules that modify Promise, such as NewRelic,, you must include them before polyfills
import "angular2-universal-polyfills";
import "ts-helpers";
import "./__workaround.node"; // temporary until 2.1.1 things are patched in Core

import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as compression from "compression";
import * as request from "request";
import * as url from "url";

// Angular 2
import { enableProdMode } from "@angular/core";

// Angular 2 Universal
import { createEngine } from "angular2-express-engine";

// App
import { MainModule } from "./node.module";

// Routes
import { routes } from "./server.routes";

// enable prod for faster renders
enableProdMode();

const app = express();

// Express View
app.engine(".html", createEngine({
    ngModule: MainModule,
    providers: [
        // use only if you have shared state between users
        // { provide: "LRU", useFactory: () => new LRU(10) }

        // stateless providers only since it's shared
    ]
}));
app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "../target"));
app.set("view engine", "html");
app.set("json spaces", 4);

app.use(cookieParser("Angular 2 Universal"));
app.use(bodyParser.json());
app.use(compression());

function cacheControl(req, res, next) {
    // instruct browser to revalidate in 60 seconds
    res.header("Cache-Control", "max-age=60");
    next();
}
// Serve static files
app.use("/assets", cacheControl, express.static(path.join(__dirname, "../target/assets"), {maxAge: 30}));

function ngApp(req, res) {
    res.render("index", {
        req,
        res,
        // time: true, // use this to determine what part of your app is slow only in development
        preboot: false,
        baseUrl: "/",
        requestUrl: req.originalUrl,
        originUrl: `http://localhost:${ app.get("port") }`
    });
}

// All routes are handled by ngApp
app.get("*", ngApp);

// Server
let server = app.listen(app.get("port"), () => {
    console.log(`Listening on: http://localhost:${server.address().port}`);
});
