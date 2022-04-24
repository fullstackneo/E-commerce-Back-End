const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: Product,
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No category found' });
      } else {
        res.status(200).json(dbData);
      }
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne(
    {
      where: { id: req.params.id },
    },
    {
      include: Product,
    }
  )
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No category found with this id' });
      } else {
        res.status(200).json(dbData);
      }
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then(dbData => res.status(200).json(dbData))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No category found with this id' });
      } else {
        res.status(200).json(dbData);
      }
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json('No category found with this id');
      } else {
        res.status(200).json(dbData);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
