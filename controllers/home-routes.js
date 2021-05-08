const router = require('express').Router();
const { Comment, Philosopher, Questions, Quiz, Quotes, User } = require('../models');
const withauth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const quotesData = await Quotes.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const quotes = quotesData.map((quotes) => quotes.get({ plain: true }));
        
        res.render('homepage', {
            logged_in: req.session.logged_in       
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/philosopher/:id', async (req, res) => {
    try {
        const philosopherData = await Philosopher.findAll({
            include:[
                {
                    model: philosophers,
                    attributes: [
                        'id'
                    ],
                },
            ],
        });

        const philosopher = philosopherData.get({ plain: true });

        res.render('philosopher', {
            ...philosopher,
            logged_in: req.session.loggeed_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/quiz/', async (req, res) => {
    try {
        const quizData = await Quiz.findByPK(req.params.id, {
            include:[
                {
                    model: quiz,
                    
                },
            ],
        });

        const quiz = quizData.get({ plain: true });

        res.render('quiz', {
            ...quiz,
            logged_in: req.session.loggeed_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/qotd/:id', async (req, res) => {
    try {
        const quotesData = await Quotes.findByPK(req.params.id, {
            include:[
                {
                    model: quotes,
                    attributes: [
                        'id'
                    ],
                },
            ],
        });

        const quotes = quotesData.get({ plain: true });

        res.render('qotd', {
            ...quotes,
            logged_in: req.session.loggeed_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/', withauth, async (req, res) => {
    try {
        const userData = await User.findByPK(req.session.user_id, {
            attributes: { exclude : ['password'] },
        });

        const user = userData.get({ plain: true });

        res.render('homepage', {
            ...user,
            logged_in: true
        });
    } catch (err) { 
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;