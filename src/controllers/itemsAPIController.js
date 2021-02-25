const {
    Product,
    Item,
    User
} = require('../database/models');

function minusPercent(n, p) {
    return n - (n * (p / 100));
}

module.exports = {

    // Agrega producto al carrito
    addToCartAPI(req, res, next) {
        Product.findByPk(req.body.productId, {
                include: ["user"],
            })
            .then(product => {
                let price =
                    Number(product.discount) > 0 ?
                    product.price - (product.price * product.discount) / 100 :
                    product.price;

                if (req.body.userId) {
                    var userId = req.body.userId
                } else {
                    var userId = req.session.user.id
                }

                Item.create({
                        salePrice: price,
                        quantity: req.body.quantity,
                        subTotal: price * req.body.quantity,
                        state: 1,
                        userId: userId,
                        sellerId: product.user.id,
                        productId: product.id,
                    })
                    .then((item) => {
                        let response = {
                            meta: {
                                status: 201,
                                message: 'Product added to cart'
                            },
                            data: {
                                item: item
                            }
                        }
                        res.send(response);
                    })
                    .catch(err => {
                        res.send(err.message)
                    });
            })
            .catch(err => {
                res.send(err.message)
            })
    },

    removeFromCartAPI(req, res, next) {
        Item.destroy({ // Destroy devuelve el número de registros que fueron detruidos
                where: {
                    id: req.body.id,
                },
                force: true 
            })
            .then(response => {
                if (response > 0) {
                    res.json({
                        status: 200
                    })
                } else {
                    console.log('No se borró nada');
                }
            })
            .catch(err => {
                res.send(err.message)
            });
    }
}