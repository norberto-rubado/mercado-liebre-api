window.addEventListener("load",function() {

    let forms = document.querySelectorAll(".form-producto-delete")

    for (let i = 0; i < forms.length; i++) {
        
        forms[i].addEventListener("submit", event => {
    
/*  codigo para actualizar via API */

        event.preventDefault()

        fetch ('http://localhost:3000/api/products/' + forms[i].id, {
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
    }
})