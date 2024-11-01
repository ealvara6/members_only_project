const { Router } = require('express');
const clubRouter = Router();
const clubController = require('../controllers/club-controller');

clubRouter.get('/join-club', clubController.getJoinClubView);
clubRouter.post('/join-club', clubController.registerMember);
clubRouter.get('/', clubController.getClubView);



module.exports = clubRouter;
