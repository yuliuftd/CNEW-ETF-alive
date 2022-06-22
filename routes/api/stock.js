const express = require("express");
const router = express.Router();
const config = require("config");

const Stock = require("../../models/Stock")

router.get("/:stock_code", async(req, res) => {
    try{
        const {stock_code} = req.params
        const foundStock = await Stock.findOne({stock_code})
        foundStock == null ? res.status(200).send("Can not find this stock") : res.status(200).send(foundStock)
    }catch(err){
        return res.status(400).send(err.message)
    }
})
router.post("/upload", async(req, res) => {
    const {stock_code, stock_name, current_price, lastclose_price, price_change,holdings, pe_ttm, dividen, growthrate} = req.body;
    try{
        let stock = new Stock({
            stock_code, stock_name, current_price, lastclose_price, price_change,holdings, pe_ttm, dividen, growthrate
        })
        await stock.save();
        res.status(200).send("New Stock Saved ...")
    }catch(err) {
        res.status(400).send(`Something wrong when save this stock ${stock_name}`)
    }
})
router.delete("/:stock_code", async(req, res) => {
    console.log(req.params);
    try{
        const {stock_code } = req.params
        const foundStock = await Stock.findOne({stock_code})
        console.log(foundStock);
        await foundStock.remove()
        res.status(200).send(`${stock_code} deleted ...`)
    }catch(err){
        res.status(400).send(err.message)
    }
})

router.delete("/", async(req, res) => {
    try{
        await Stock.deleteMany({})
        res.status(200).send("All records deleted ...")
    }catch(err) {
        res.status(400).send(err.message)
    }
})

module.exports = router;