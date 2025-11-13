let Products = [{
    id:1,
    name: "Laptop",
    price: 999.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB5b2ESJ-kPsLfiC5SyRLDxUBZwLTgzIm5BQ&s",    
    description: "A high-performance laptop suitable for all your computing needs.",
}, {
    id:2,
    name: "Smartphone", 
    price: 699.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNcMzCahiBKLZ2QleCjIvfk1sjnaO0DIXVRg&s",    
    description: "A sleek smartphone with the latest features and technology.",
},
{
    id:3,
    name: "Headphones",
    price: 199.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcDEQ5oturBbwzi0uJscalDGzNQcgD5ZyJGQ&s",
    description: "Noise-cancelling headphones for an immersive audio experience.",
},
{   id:4,
    name: "Smartwatch",
    price: 299.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Ewzw1VDdfYIolmoDTzCjXYl1ZvAZEFFvKQ&s",
    description: "A stylish smartwatch to keep you connected on the go.",
}];  
localStorage.setItem("products", JSON.stringify(Products));

function displayProducts() {
    let displayPro = document.getElementById("displaypro");
    let products = JSON.parse(localStorage.getItem("products"));
    let str = "";   
    products.forEach((product) => {
        str += `
        <div class="col-3 mb-3">
        <div class="card h-100 bg-black text-white border border-white border-2 " style="width: 18rem;">
        <div class="overflow-hidden">
            <img src="${product.image}" class="h-100" alt="${product.name}">
        </div>
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">$${product.price}</p>
                <button type="button" class="btn btn-outline-light">Buy Now</button>
                <button type="button" class="btn btn-outline-light" onclick="return deleteProduct(${product.id})">Delete</button>
                <button type="button" class="btn btn-outline-light" onclick="return editdata(${product.id})">Edit</button>
            </div>
        </div>
    </div>
        `;
    });
    displayPro.innerHTML = str;

}
displayProducts();

function addProduct() {
    document.getElementById("adddata").innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
    <form onsubmit="return saveProduct()">
        <div class="mb-3">
            <label for="productName" class="form-label">Product Name</label>
            <input type="text" class="form-control" id="productName" required>
        </div>  
        <div class="mb-3">
            <label for="productPrice" class="form-label">Product Price</label>
            <input type="number" step="0.01" class="form-control" id="productPrice" required>
        </div>  
        <div class="mb-3">
            <label for="productImage" class="form-label">Product Image URL</label>
            <input type="text" class="form-control" id="productImage" required>
        </div>
        <div class="mb-3">
            <label for="productDescription" class="form-label">Product Description</label>
            <textarea class="form-control" id="productDescription" rows="3" required></textarea>
        </div>  
        <button type="submit" class="btn btn-primary">Save Product</button>
    </form>
</div>
    `;

    return false;
}

function saveProduct() {
    let name = document.getElementById("productName").value;
    let price = parseFloat(document.getElementById("productPrice").value);
    let image = document.getElementById("productImage").value;
    let description = document.getElementById("productDescription").value;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({
        name: name,
        price: price,
        image: image,
        description: description,
    });
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    document.getElementById("form").innerHTML = "";
    return false;
}  

function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
     products.filter((index) => index.id !== id);
    console.log(id);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

function editdata(id) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let prod = products.find((p) => p.id === id);
    document.getElementById("adddata").innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
    <form onsubmit="return updateProduct(${id})">
        <div class="mb-3">
            <label for="productName" class="form-label">Product Name</label>
            <input type="text" class="form-control" id="productName" value="${prod.name}" required>
        </div>  
        <div class="mb-3">
            <label for="productPrice" class="form-label">Product Price</label>
            <input type="number" step="0.01" class="form-control" id="productPrice" value="${prod.price}" required>
        </div>
        <div class="mb-3">
            <label for="productImage" class="form-label">Product Image URL</label>
            <input type="text" class="form-control" id="productImage" value="${prod.image}" required>
        </div>
        <div class="mb-3">
            <label for="productDescription" class="form-label">Product Description</label>
            <textarea class="form-control" id="productDescription" rows="3" required>${prod.description}</textarea>
        </div>  
        <button type="submit" class="btn btn-primary">Update Product</button>
    </form>
</div>
    `;
    return false;
}
function updateProduct(id) {
    let name = document.getElementById("productName").value;
    let price = parseFloat(document.getElementById("productPrice").value);  
    let image = document.getElementById("productImage").value;
    let description = document.getElementById("productDescription").value;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let prodIndex = products.findIndex((p) => p.id === id);
    products[prodIndex] = {
        id: id,
        name: name,
        price: price,
        image: image,
        description: description,
    };
    localStorage.setItem("products", JSON.stringify(products)); 
    displayProducts();
    document.getElementById("adddata").innerHTML = "";
    return false;
}
