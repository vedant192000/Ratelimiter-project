
const constants = {
    CORS_OPTIONS: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    },
    BODY_PARSER_OPTIONS: { extended: true }
}
export default constants