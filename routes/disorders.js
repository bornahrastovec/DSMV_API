const express = require("express");
const Disorder = require("../models/Disorder");
const router = express.Router();

router.get('/', async (req, res) => {
    await res.send("<h1 style='text-align: center;'>Welcome to DSM-V API</h1> <br/> To list all disorders, run a GET request on /api/disorders");
})

/**
 * Returns all disorders
 * 
 * 
 * 
 */

router.get('/disorders', async (req, res) => {
    try {
        const Disorders = await Disorder.find();
        res.json(Disorders);
    } catch (err) {
        res.json({message: err});
    }
 })

 /**
  * Returns all disorder subtypes and categories based on disorder type
  * 
  * @param {string} disorder_type The disorder type
  * 
  * 
  */

router.get('/disorders/:disorder_type', async (req,res) => {
    var disorderId = "";
    switch (req.params.disorder_type) {
        case "neuro":
            disorderId = "5f858d7faed5e42e8411c8d3"
            break;
        case "schizo":
            disorderId = "5f881cecb4216d12b8d78038"
            break;
        default:
            break;
    }

    try {

        let disorders = await Disorder.findById({_id: disorderId});
        res.json(disorders);

    } catch (err) {
        
        res.json({message: err});

    }
})

router.post('/disorders', async (req ,res) => {
    const disorder = new Disorder({
        disorder_type: req.body.disorder_type,
        disorder_categories: req.body.disorder_categories
    });
    try {
        const newDisorder = await disorder.save();
        res.status(201).json(newDisorder);
    } catch (err) {
        res.json({message: err});
    }
})


module.exports = router;