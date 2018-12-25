const route = [
    {
        name: "test",
        path: "/test",
        exact: true
    },
    {
        name: "test-detail",
        path: "/test/:q/:st",
        isPush: false
    },
    {
        name: "test2",
        path: "/test2",
        template: "test2"
    },
    {
        name: "test2-detail",
        path: "/test2/:q/:st",
        template: "test2-detail"
    }
];

export default route;
