/**
 * <%MIDDLEWARE_DESCRIPTION%>
 */
const <%MIDDLEWARE_NAME_VAR%> = {<%if(MIDDLEWARE_WITH_INIT)%>
    /**
     * Initialization for <%MIDDLEWARE_NAME%> middleware
     * @param app Express App
     * @param envVars App's Environment Variable
     */
    init(app: any, envVars: any) {
        /** YOUR INITIALIZATION CODE GOES HERE */
    },<%endif%>
    /**
     * Middleware function for <%MIDDLEWARE_NAME%> middleware
     * @param req Express Request Object
     * @param res Express Response Object
     * @param next Express Next Function
     */
    middleware(req: any, res: any, next: Function) {
        if (!req.error) {
            const { app } = req,
                appConfig = app.get("config"),
                eventManager = app.get("eventManager");
            /**
                HOWTO:
                - Getting runtime config:
                + appConfig.get("CONFIG_NAME.CONFIG_FIELD.NESTED_CONFIG_FIELD");
                
                - Placing EVENT HOOKS
                + eventManager.fire(EVENT_NAME, ...ARGUMENTS_TO_BE_PASSED);
             */
            console.verbose(`[<%MIDDLEWARE_NAME%>] is running for ${req.url}`);
            /** YOUR MIDDLEWARE CODE GOES HERE */

            console.verbose(`[<%MIDDLEWARE_NAME%>] has finished for ${req.url}`);
        }
        next();
    }
};

export default <%MIDDLEWARE_NAME_VAR%>;
