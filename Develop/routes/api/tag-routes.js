const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//get all tags with associated products
router.get('/', async (req, res) => {

  try { const tagData = await Tag.findAll({
    include: { 
      model: Product,
      attributes: ['id','product_name', 'price', 'stock', 'category_id']
    }
  });
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}

});

//get tag by id with associated products
router.get('/:id', async (req, res) => {
  try {
    const idData = await Tag.findByPk(req.params.id, {
      include: { 
        model: Product,
        attributes: ['id','product_name', 'price', 'stock', 'category_id']
      }
    });

    if (!idData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(idData);
  } catch (err) {
    res.status(500).json(err);
  }



});

//add a tag
router.post('/', async (req, res) => {
  try {
    const tagData =  await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});


//update a tag by id
router.put('/:id', (req, res) => {

  try {
    const tagData =  Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData =  Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
