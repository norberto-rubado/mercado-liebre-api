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

    },

	// Create -  Method to store
	store (req, res) {

        const errors = validationResult(req);

		if(errors.isEmpty()){
			const _body = req.body;
			_body.price = Number(req.body.price);
			_body.discount = Number(req.body.discount);
			_body.image = req.file.filename;
			_body.userId = req.session.user.id;
			_body.categoryId = Number(req.body.category);
			_body.brandId = Number(req.body.brand);

			Product.create(_body)
				.then(product => {
                    res.status(201).json({})
				})
				.catch(error => {
                    res.json(error)
                });
		} else {
            res.status(303).json({})
		}

    },
    
    	// Update - Method to update
	update (req, res) {

		const errors = validationResult(req);

		if (errors.isEmpty()) {
			Product.findByPk(req.params.id)
				.then(product => {

					const _body = req.body;

					_body.price = Number(req.body.price);
					_body.discount = Number(req.body.discount);
					_body.image = req.file != undefined ? req.file.filename : product.image;
					_body.userId = req.session.user.id;
					_body.categoryId = Number(req.body.category);
					_body.brandId = Number(req.body.brand);
					// delete _body.brand;
					// delete _body.category;

					return Product.update(_body, {
						where: {
							id: req.params.id
						}
					})
				})
				.then(confirm => {
					res.json({
						status: 200
					})
				})
				.catch(e => console.log(e));

		} else {
			const categories = Category.findAll();
			const brands = Brand.findAll();
	
			Promise.all([categories, brands])
				.then(([categories, brands]) => {
					
					return res.render(
						'products/product-edit-form',
						{ 
							product: req.body,
							id: req.params.id,
							categories,
							brands,
							errors: errors.mapped()
					})
				})
				.catch(e => console.log(e));
		}
    },
    
    	// Delete - Delete one product from DB
	destroy (req, res) {

		Product.destroy({
			where: {
				id: req.params.id
			},
			force: true
		})

		.then(confirm => {
				res.json({
					status: 200
				})
			})
			.catch(e => 
				res.status(303).json({})
			);
	},
}