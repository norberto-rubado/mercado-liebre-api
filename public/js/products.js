window.addEventListener("load",function() {

    fetch ("http://localhost:3000/api/products/latest") 
    .then (function(respuesta) {
        return respuesta.json()
    })
    .then (function(info){
        let linea = ""
        for (let i=0; i< info.products.length;i++) {
            linea += "<p class='products-title'>" + info.products[i].name + "</p>" + "<img src='../images/products/" + info.products[i].image + "'>" 
            document.getElementById("ul-latest").innerHTML = "<li>" + linea + "</li>" 
        }    
    })
    .catch (err => {
        return res.send(err)
    })

    fetch ("http://localhost:3000/api/products/offers") 
    .then (function(respuesta) {
        return respuesta.json()
    })
    .then (function(info){
        let linea = ""
        for (let i=0; i< info.products.length;i++) {
            linea += "<p class='products-title'>" + info.products[i].name + "</p>" + "<img src='../images/products/" + info.products[i].image + "'>" 
            document.getElementById("ul-offers").innerHTML = "<li>" + linea + "</li>" 
        }    
    })
    .catch (err => {
        return res.send(err)
    })
})