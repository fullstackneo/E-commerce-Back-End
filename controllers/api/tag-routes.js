const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      attributes: { exclude: ['category_id'] },
      through: { attributes: [] },
      include: {
        model: Category,
        as: 'category',
      },
    },
    required: true,
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No tag found' });
      } else {
        res.status(200).json(dbData);
      }
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
      through: { attributes: [] },
      include: {
        model: Category,
        as: 'category',
      },
    },
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No tag found with this id' });
      } else {
        res.status(200).json(dbData);
      }
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then(dbData => res.status(200).json(dbData))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(dbData => {
      if (dbData[0] == 0) {
        res.status(404).json({ message: 'No tag found with this id' });
      } 
      res.status(200).json(dbData);
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json('No tag found with this id');
      } else {
        res.status(200).json(dbData);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
