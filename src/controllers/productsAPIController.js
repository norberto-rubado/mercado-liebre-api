const { validationResult } = require('express-validator');
const createError = require('http-errors');

// ******** Sequelize ***********

const { Product } = require('../database/models');
const {Op} = require('sequelize')


module.exports = {
	
	// Root - Show all products
	async index (req, res, next) {

/*      let category = req.params.category */

        let category = "latest"

        console.log(category,req.params)

        if (category == "latest") {
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

        } else {
            if (category == "offers") {
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
       
    }    
}