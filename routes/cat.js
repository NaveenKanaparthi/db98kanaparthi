var express = require('express');
var router = express.Router();
var cat_controller = require('../controllers/cat');


class cat {
  constructor(cat_type, cat_weight,cat_color) {
    this.cat_type = cat_type;
    this.cat_weight = cat_weight;
    this.cat_color = cat_color;
  }
}

/* GET cat page. */
router.get('/', function(req, res, next) {
  const cat1 = new cat('rangolian', 40, 'black');
  const cat2 = new cat('white cat', 15, 'brown');
  const cat3 = new cat('black cat', 12, 'light black');
  res.render('cat', {cat : [cat1, cat2, cat3]});
});

module.exports = router;

/* GET detail cat page */
router.get('/detail', cat_controller.cat_view_one_Page);

/* GET create cat page */
router.get('/create', cat_controller.cat_create_Page);

/* GET create update page */
router.get('/update', cat_controller.cat_update_Page);

/* GET create cat page */
router.get('/delete', cat_controller.cat_delete_Page);