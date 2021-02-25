window.addEventListener("load",function() {

    fetch ("http://localhost:3000/api/products/latest") 
    .then (function(respuesta) {
        return respuesta.json()
    })
    .then (function(info){

        let productos = ""
        for (let i=0; i< info.products.length;i++) {

            let price = info.products[i].price - info.products[i].price * info.products[i].discount / 100

			productos += '<div class="col-12 col-sm-6 col-lg-3"> ' +
                            '<section class="product-box"> ' +
                                '<a href="/products/detail/' + info.products[i].id + '"> ' +
                                    '<figure class="product-box_image"> ' +
                                        '<img src="/images/products/' + info.products[i].image +'" alt="' + info.products[i].name + '"> ' +
                                    '</figure> ' +
                                    '<article class="product-box_data"> ' +
                                        '<h2>' + price + '</h2> '
            if(info.products[i].discount > 0) {                            
                productos +=            '<span>' + info.products[i].discount + ' % OFF</span>'
            }

            productos +=                '<p>' + info.products[i].name + '</p> ' +
                                        '<i class="fas fa-truck"></i> ' +
                                    '</article> ' + 
                                '</a> ' +
                            '</section> ' +
                        '</div> ' 

        } 

        document.getElementById("latest-products").innerHTML = productos 
    })
    .catch (error => {console.log(error)})

    fetch ("http://localhost:3000/api/products/offers") 
    .then (function(respuesta) {
        return respuesta.json()
    })
    .then (function(info){

        let productos = ""
        for (let i=0; i< info.products.length;i++) {

            let price = info.products[i].price - info.products[i].price * info.products[i].discount / 100

			productos += '<div class="col-12 col-sm-6 col-lg-3"> ' +
                            '<section class="product-box"> ' +
                                '<a href="/products/detail/' + info.products[i].id + '"> ' +
                                    '<figure class="product-box_image"> ' +
                                        '<img src="/images/products/' + info.products[i].image +'" alt="' + info.products[i].name + '"> ' +
                                    '</figure> ' +
                                    '<article class="product-box_data"> ' +
                                        '<h2>' + price + '</h2> '
            if(info.products[i].discount > 0) {                            
                productos +=            '<span>' + info.products[i].discount + ' % OFF</span>'
            }

            productos +=                '<p>' + info.products[i].name + '</p> ' +
                                        '<i class="fas fa-truck"></i> ' +
                                    '</article> ' + 
                                '</a> ' +
                            '</section> ' +
                        '</div> ' 

        }    

        document.getElementById("offers-products").innerHTML = productos 
    })
    .catch (error => {console.log(error)})


})