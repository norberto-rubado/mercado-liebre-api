window.addEventListener('load', function () {
    const cartItems = document.querySelector('#cartItems');
    if (cartItems) {
        cartItems.addEventListener('click', eventDelegation);

        function eventDelegation(e) {
            e.preventDefault();
            let productId = e.target.previousElementSibling.value;
            if (e.target.id == 'removeButton') {
                axios({
                        method: 'delete',
                        url: 'http://localhost:3000/api/items',
                        data: {
                            id: productId
                        }
                    })
                    .then(response => {
                        if (response.status == '200') {
                            window.location.reload()
                        } else {
                            console.log('Error?');
                        }
                    })
                    .catch(errors => {
                        console.log(errors);
                    })
            };
        }
    }

})