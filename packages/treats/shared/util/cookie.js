export const getCookie = (name, req) => {
    if (process.env.BUILD_TARGET === "client") {
        let result;
        const value = `; ${document.cookie}`,
            parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            result = parts
                .pop()
                .split(";")
                .shift();
        }
        return result;
    } else if (process.env.BUILD_TARGET === "server") {
        return req.cookies[name];
    }
    return false;
};
