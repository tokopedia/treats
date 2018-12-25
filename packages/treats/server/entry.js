import "@babel/polyfill";
import http from "http";
import app from "@@BUILD_SERVER_APP_PATH@@";

const server = http.createServer(app),
    { port } = app.get("envVars");

let currentApp = app;

server.listen(port, () => {
    console.info(`Application started on port ${port}`);
});

if (process.env.NODE_ENV === "development") {
    server.on("upgrade", global.__WDS_PROXY.upgrade);
}

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("@@BUILD_SERVER_APP_PATH@@", () => {
        server.removeListener("request", currentApp);
        server.on("request", app);
        currentApp = app;
    });
}
