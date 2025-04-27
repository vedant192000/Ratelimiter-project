import bodyParser from "body-parser";
import cors from 'cors';
import httpContext from 'express-http-context';

class AppMiddleware {

    constructor() { }

    public loadMiddlewares(): Array<Function> {

        const { CORS_OPTIONS, BODY_PARSER_OPTIONS } = CONSTANTS;
        const bodyParserMiddleware = bodyParser.json()
        const bodyUrlEncodedMiddleware = bodyParser.urlencoded(BODY_PARSER_OPTIONS)
        const corsMiddleware = cors(CORS_OPTIONS);
        const httpContextMiddleware = httpContext.middleware;

        return [
            httpContextMiddleware,
            bodyParserMiddleware,
            bodyUrlEncodedMiddleware,
            corsMiddleware,
        ];
    }
}

export default AppMiddleware