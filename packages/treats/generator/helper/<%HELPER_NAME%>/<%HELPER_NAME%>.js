/**
 * <%HELPER_DESCRIPTION%>
 */
const <%HELPER_NAME_VAR%>= {
    app: undefined,
    /**
     * Initialization for <%HELPER_NAME%> Helper
     * @param app Express App
     * @param envVars App's Environment Variables
     */
    init(app, envVars) {
        this.app = app;
        app.set("<%HELPER_NAME%>", this);
        /** YOUR INITIALIZATION CODE GOES HERE */
        console.info("[<%HELPER_NAME%> Helper] <%HELPER_NAME%> initialized");
        return true;
    },
    /**
     * Garbage collection for <%HELPER_NAME%> Helper
     */
    destroy() {
        if (this.app) {
            this.app = undefined;
            /** YOUR GARBAGE COLLECTION CODE GOES HERE */
            console.info("[<%HELPER_NAME%> Helper] <%HELPER_NAME%> destroyed");
            return true;
        }
        return false;
    },
    /** YOUR HELPER METHODS GOES HERE */
    example() {
        console.info("Example helper method called for <%HELPER_NAME%>");
        return true;
    }
};

export default <%HELPER_NAME_VAR%>;
