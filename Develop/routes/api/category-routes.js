const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories and associated products
router.get('/', async (req, res) => {
  // be sure to include its associated Products
  try { const categoryData = await Category.findAll({
          include: { 
            model: Product,
            attributes: ['id','product_name', 'price', 'stock', 'category_id']
          }
        });
        res.status(200).json(categoryData);
      } catch (err) {
        res.status(500).json(err);
      }
    });


// get category by id and associated products
router.get('/:id', async (req, res) => {

  try {
    const idData = await Category.findByPk(req.params.id, {
      include: { 
        model: Product,
        attributes: ['id','product_name', 'price', 'stock', 'category_id']
      }
    });

    if (!idData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(idData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// add a new category

router.post('/', async (req, res) => {
  try {
    const categoryData =  await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete a category by id
router.put('/:id', (req, res) => {
  try {
    const categoryData =  Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData =  Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
