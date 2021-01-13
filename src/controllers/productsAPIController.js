const { validationResult } = require('express-validator');
const createError = require('http-errors');

// ******** Sequelize ***********

const { Product } = require('../database/models');
const {Op} = require('sequelize')


module.exports = {
	
	// Root - Show latest products
	async latest (req, res, next) {

        products = await Product.findAll({
            order: [["createdAt", "DESC" ]],
            limit : 5
        }).then (products => {

            let respuesta = {
                meta : {
                    status: 200,
                    total: products.length
                },
                products: products
            }  

            res.json (respuesta)
        })

    },
    
    	// Root - Show all products
	async offers (req, res, next) {

        products = await Product.findAll({
            where: {discount:{[Op.gte]: 50}},
            order: [["createdAt", "DESC" ]]
        }).then (products => {

            let respuesta = {
                meta : {
                    status: 200,
                    total: products.length
                },
                products: products
            }  

            res.json (respuesta)
        })

    }

}