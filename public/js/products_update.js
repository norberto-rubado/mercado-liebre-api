window.addEventListener("load",function() {

    let form = document.getElementById("formulario-producto")

    var arrayPath = window.location.pathname.split("/");

        //  Campos Inputs 
        const name = document.getElementById('name');
        const brand = document.getElementById('brand');
        const price = document.getElementById('price');
        const discount = document.getElementById('discount');
        const category = document.getElementById('category');
        const image = document.getElementById('image');
        const description = document.getElementById('description');
    
        //  Campos Errores 
        const name_error = document.getElementById('name-error');
        const brand_error = document.getElementById('brand-error');
        const price_error = document.getElementById('price-error');
        const discount_error = document.getElementById('discount-error');
        const category_error = document.getElementById('category-error');
        const image_error = document.getElementById('image-error');
        const description_error = document.getElementById('description-error');
    
        const product = {
            name : "",
            brand : "",
            price : "",
            discount : "",
            category : "",
            image : "",
            description : ""
        } 
    
        if (name_error.innerHTML.trim() != "") {
            setError(name, name_error, name_error.innerHTML.trim());
        }
        if (brand_error.innerHTML.trim() != "") {
            setError(brand, brand, brand_error.innerHTML.trim());
        }
        if (price_error.innerHTML.trim() != "") {
            setError(price, price_error, price_error.innerHTML.trim());
        }
        if (discount_error.innerHTML.trim() != "") {
            setError(discount, discount_error, discount_error.innerHTML.trim());
        }
        if (category_error.innerHTML.trim() != "") {
            setError(category, category_error, category_error.innerHTML.trim());
        }
        if (image_error.innerHTML.trim() != "") {
            setError(image, image_error, image_error.innerHTML.trim());
        }
    
        if (description_error.innerHTML.trim() != "") {
            setError(description, description_error, description_error.innerHTML.trim());
        }
    
        name.addEventListener("blur",function() {
            validarName()
        })
    
        function validarName() {
    
            const valorName = name.value.trim()
    
            if (valorName != ""){
                setSuccess(name, name_error, valorName);
                return true
            } else {
                setError(name, name_error, 'El nombre del producto es obligatorio');
                return false
            }
    
        }
    
        brand.addEventListener("blur",function() {
            validarBrand()
        })
    
        function validarBrand() {
            const valorBrand = brand.value.trim()
            if (valorBrand.value === "" || validator.isEmpty(valorBrand)){
                setError(brand, brand_error, 'El producto debe tener asignado una marca');
                return false
            } else {
                setSuccess(brand, brand_error, valorBrand);
                return true
            }
        }
    
        price.addEventListener("blur",function() {
            validarPrice()
        })
    
        function validarPrice() {
            const valorPrice = price.value.trim()
    
            if (validator.isDecimal(valorPrice) && price.value >= 0 ){
                setSuccess(price, price_error, valorPrice);
                return true
            } else {
                setError(price, price_error, 'El precio del producto debe ser numerico mayor o igual a 0');
                return false
            }
        }
    
        discount.addEventListener("blur",function() {
            validarDiscount()
        })
    
        function validarDiscount() {
            const valorDiscount = discount.value.trim()
    
            if (validator.isDecimal(valorDiscount) && valorDiscount >= 0 && valorDiscount < 100){
                setSuccess(discount, discount_error, valorDiscount);
                return true
            } else {
                setError(discount, discount_error, 'El descuento del producto debe ser mayor o igual a 0 y menor que 100');
                return false
            }
        }
    
        category.addEventListener("blur",function() {
            validarCategory()
        })
    
        function validarCategory() {
            const valorCategory = category.value.trim()
    
            if (valorCategory == "" || validator.isEmpty(valorCategory)){
                setError(category, category_error, 'El producto debe tener asociada una categoria');
                return false
            } else {
                setSuccess(category, category_error, valorCategory);
                return true
            }
        }
    
        image.addEventListener("blur",function() {
            validarImage()
        })
    
        function validarImage() {
            let valorImage = image.value.trim()

            if (
                (!validator.isEmpty(valorImage) && window.location.pathname.includes("create")) || 
                (window.location.pathname.includes("edit")))  {
                if (validator.isEmpty(valorImage)) {
                    valorImage = 0
                }
                setSuccess(image, image_error, valorImage);
                return true
            } else {
                setError(image, image_error, 'Debe seleccionar como minimo una imagen');
                return false
            }
        }
    
        description.addEventListener("blur",function() {
            validarDescription()
        }) 
    
        function validarDescription() {
            const valorDescription = description.value.trim()
    
            if (valorDescription != "" && validator.isLength(valorDescription,{min:20,max:300})){
                setSuccess(description, description_error, valorDescription);
                return true
            } else {
                setError(description, description_error, 'La descripcion del producto debe tener minimo 20 caracteres y maximo 300');
                return false
            }
        }
    
        form.addEventListener("submit",function(event) {
    
            validarName()
            validarBrand() 
            validarPrice() 
            validarDiscount() 
            validarCategory() 
            validarImage() 
            validarDescription() 
    
            if (product.name === "" ||
                product.brand === "" ||
                product.price === "" ||
                product.discount === "" ||
                product.category === "" ||
                product.image === "" ||
                product.description === "") {
                event.preventDefault()
            } 
    
    /*         codigo para actualizar via API */
            
            event.preventDefault()
    
            if (product.name === "" ||
                product.brand === "" ||
                product.price === "" ||
                product.discount === "" ||
                product.category === "" ||
                product.image === "" ||
                product.description === "") {
                console.log("1",product)
            } else {
    
                let input = document.querySelector('input[type="file"]') 
    
/*              let data = new FormData() */
    
/*              for (const file of input.files) { 
                    data.append('files',file,file.name) 
                }  */

                let data = new FormData()

                data.append('image', input.files[0])
    
                data.append('name', product.name)
                data.append('brand', product.brand)
                data.append('price', product.price)
                data.append('discount', product.discount)
                data.append('category', product.category)
                data.append('description', product.description)
    
                fetch ('http://localhost:3000/api/products/' + arrayPath[2], {
                method : 'PATCH',
                body : data,
/*              headers : {'Content-Type': 'multipart/form-data'} */
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
            } 
    
        })
    
        function setError(input, input_error, error) {
            input.style.borderColor = "tomato"
            input_error.innerHTML = error
            switch(input.id) {
                case "name":
                    product.name = ""
                case "brand":
                    product.brand = ""
                case "price":
                    product.price = ""
                case "discount":
                    product.discount = ""
                case "category":
                    product.category = ""
                case "image":
                    product.image = ""
                case "description":
                    product.description = ""
            }
        }
    
        function setSuccess(input,input_error,valor) {
            input.style.borderColor = "teal"
            input_error.innerHTML = ""
            switch(input.id) {
                case "name":
                    product.name = valor
                case "brand":
                    product.brand = valor
                case "price":
                    product.price = valor
                case "discount":
                    product.discount = valor
                case "category":
                    product.category = valor
                case "image":
                    product.image = valor
                case "description":
                    product.description = valor
            }
        }

})