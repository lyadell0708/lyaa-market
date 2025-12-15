// LOGIN
function login() {
    const username = document.getElementById("username").value;
    if (username === "") {
        alert("Username tidak boleh kosong");
        return;
    }
    localStorage.setItem("username", username);
    window.location.href = "dashboard.html";
}

// CEK LOGIN
function cekLogin() {
    const user = localStorage.getItem("username");
    if (!user) {
        window.location.href = "index.html";
    }
    document.getElementById("userWelcome").innerText = "Halo, " + user;
    loadProducts();
}

// LOGOUT
function logout() {
    localStorage.removeItem("username");
    window.location.href = "index.html";
}

// TAMBAH PRODUK
function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const image = document.getElementById("productImage").files[0];

    if (!name || !price || !image) {
        alert("Lengkapi data produk");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.push({ name, price, image: reader.result });
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
    };
    reader.readAsDataURL(image);
}

// LOAD PRODUK
function loadProducts() {
    const list = document.getElementById("productList");
    list.innerHTML = "";
    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.forEach(p => {
        list.innerHTML += `
            <div class="product-card">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <p>Rp ${p.price}</p>
            </div>
        `;
    });
}
