import express from 'express'
import Group from 'express-route-groups'
import ItemsManagementController from './controller/items-master.controller';
import RateLimiterMiddleware from '../common/middlewares/rate-limiter-middleware';
import TokenMiddleware from '../common/middlewares/token-middleware';
import QueueMessagesController from './controller/QueueMessages.controller';

const v1 = express()

const rateLimiter = new RateLimiterMiddleware().getmiddleware
const tokenMiddleware = new TokenMiddleware()
const verifyTokenMiddleware = new TokenMiddleware().verifyAppTokenMiddleware
const itemsManagementController = new ItemsManagementController()
const rabbitMessangerController = new QueueMessagesController();

v1.post('/login',(req,res)=>{ tokenMiddleware.createToken(req,res)} )

v1.use(Group('/items',[verifyTokenMiddleware,rateLimiter], (router: express.Router) => {
    router.get('/list',(req,res)=>{ itemsManagementController.fetch(req,res) })
}));

v1.get('/messages',(req, res) => {
    rabbitMessangerController.fetch(req,res) 
});





export default v1