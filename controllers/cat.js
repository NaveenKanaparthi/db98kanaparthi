var cat = require('../models/cat'); 
 
// List of all cats 
exports.cat_list = async function(req, res) { 
    try{ 
        thecats = await cat.find(); 
        res.send(thecats); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
// VIEWS 
// Handle a show all view 
exports.cat_view_all_Page = async function(req, res) { 
    try{ 
        thecats = await cat.find(); 
        res.render('cat', { title: 'cat Search Results', results: thecats }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

 
// for a specific cat. 
exports.cat_detail = function(req, res) { 
    res.send('NOT IMPLEMENTED: cat detail: ' + req.params.id); 
}; 
 
 
// Handle cat delete form on DELETE. 
exports.cat_delete = function(req, res) { 
    res.send('NOT IMPLEMENTED: cat delete DELETE ' + req.params.id); 
}; 
 
// Handle cat update form on PUT. 
exports.cat_update_put = function(req, res) { 
    res.send('NOT IMPLEMENTED: cat update PUT' + req.params.id); 
}; 

// Handle cat create on POST. 
exports.cat_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new cat(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"cat_type":"steel", "cat_weight":"medium", "age":"14"} 
    console.log('the first'+req.body.cat_type)
    console.log('the second'+ req.body.cat_weight)
    document.cat_type = req.body.cat_type;
    console.log(document.cat_type)
    document.cat_weight = req.body.cat_weight; 
    document.cat_color = req.body.cat_color; 
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
};