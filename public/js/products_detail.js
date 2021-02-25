window.addEventListener("load",function() {

    let form = document.getElementById("formulario_producto_delete")

    var arrayPath = window.location.pathname.split("/");
    
    form.addEventListener("submit",function(event) {
    
/*  codigo para actualizar via API */
        
        event.preventDefault()

        fetch ('http://localhost:3000/api/products/' + arrayPath[3], {
        method : 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            if (data.status == '200') {
                window.location.assign('http://localhost:3000/products/admin')
            } else {
                console.log('Error?');
            }
        })
        .catch(error => {console.log(error)})
    })
})