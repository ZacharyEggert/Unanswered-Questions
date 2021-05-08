const router = require('express').Router();
const { Quotes, Philosophers } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const philData = await Philosophers.findAll({
            include: [{ model: Quotes }],
        });
        res.status(200).json(philData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const philData = await Philosophers.findByPk(req.params.id, {
            include: [{ model: Quotes }],
        });
        if (!philData) {
            res.status(404).json({ message: 'No philosopher found with that id!' });
            return;
        }
        res.status(200).json(philData);
    } catch (err) {
        res.status(500).json(err)
    }
});

//create a philosopher
router.post('/', async (req, res) => {
    try {
        const philData = await Philosophers.create(req.body);
        res.status(200).json(philData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a philosopher by its `id` value
router.put('/:id', async (req, res) => {
    try {
      const philData = await Philosophers.update(
        {
          philosopher_name: req.body.philosopher_name,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if(!philData) {
        res.status(404).json({ message: 'No philosopher found with this id!' });
        return;
      }
      res.status(201).json(philData);
    } catch (err) {
      res.status(400).json(err);
    }
});

//delete a philosopher
router.delete('/:id', async (req, res) => {
    try {
        const philData = await Philosophers.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!philData) {
            res.status(404).json({ message: 'No philosopher found with this id!' });
            return;
        }

        res.status(200).json(philData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;