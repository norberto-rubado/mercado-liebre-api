window.addEventListener('load', function () {
    let addForm = document.getElementById('addForm');
    if (addForm) {
        let quantityInput = document.getElementById('quantity');
        let error = document.querySelector('.error');
        let productId = addForm.productId.value;

        addForm.addEventListener('submit', function (event) {
            event.preventDefault();
            let quantityValue = quantityInput.value;

            if (quantityValue <= 0) {
                error.innerText = 'La cantidad debe ser mayor a 1';
            } else {
                error.innerText = '';
                axios({
                        method: 'post',
                        url: 'http://localhost:3000/api/items',
                        data: {
                            quantity: quantityValue,
                            productId: productId
                        }
                    })
                    .then(response => {
                        if (response.status == '200') {
                            window.location.assign('http://localhost:3000/users/cart')
                        } else {
                            console.log('Error?');
                        }
                    })
                    .catch(errors => {
                        console.log(errors);
                    })
            }
        })

    }
})