var cat = require('../models/cat');

// List of all cats 
exports.cat_list = async function (req, res) {
    try {
        thecats = await cat.find();
        res.send(thecats);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// VIEWS 
// Handle a show all view 
exports.cat_view_all_Page = async function (req, res) {
    try {
        thecats = await cat.find();
        res.render('cat', { title: 'cat Search Results', results: thecats });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.cat_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await cat.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};


exports.cat_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await cat.findById(req.params.id)
        // Do updates of properties 
        if (req.body.cat_type)
            toUpdate.cat_type = req.body.cat_type;
        if (req.body.cat_weight) toUpdate.cat_weight = req.body.cat_weight;
        if (req.body.cat_color) toUpdate.cat_color = req.body.cat_color;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`);
    }
};


// Handle cat delete on DELETE.
exports.cat_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await cat.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.cat_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await cat.findById(req.query.id)
        res.render('catdetail',
            { title: 'cat Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};



// Handle cat create on POST. 
exports.cat_create_post = async function (req, res) {
    console.log(req.body)
    let document = new cat();
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"cat_type":"steel", "cat_weight":"medium", "age":"14"} 
    console.log('the first' + req.body.cat_type)
    console.log('the second' + req.body.cat_weight)
    document.cat_type = req.body.cat_type;
    console.log(document.cat_type)
    document.cat_weight = req.body.cat_weight;
    document.cat_color = req.body.cat_color;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle building the view for creating a cat.
// No body, no in path parameter, no query.
// Does not need to be async
exports.cat_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('catcreate', { title: 'cat Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a cat.
// query provides the id
exports.cat_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await cat.findById(req.query.id)
        res.render('catupdate', { title: 'cat Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.cat_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await cat.findById(req.query.id)
        res.render('catdelete', {
            title: 'cat Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};