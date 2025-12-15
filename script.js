// FORMAT RUPIAH
function rupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

// LOGIN
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Username dan password wajib diisi");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
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
    localStorage.removeItem("password");
    window.location.href = "index.html";
}

// TAMBAH PRODUK
function addProduct() {
    const name = document.getElementById("productName").value;
    const price = parseInt(document.getElementById("productPrice").value);
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

        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productImage").value = "";
    };
    reader.readAsDataURL(image);
}

// LOAD PRODUK
function loadProducts() {
    const list = document.getElementById("productList");
    list.innerHTML = "";
    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.forEach((p, index) => {
        list.innerHTML += `
            <div class="product-card">
                <img src="${p.image}">
                <h3>${p.name}</h3>
                <p>${rupiah(p.price)}</p>

                <input type="number" min="1" value="1" id="qty-${index}">
                <button onclick="orderProduct(${index})">Order</button>
                <button onclick="deleteProduct(${index})">Hapus</button>
            </div>
        `;
    });
}

// ORDER PRODUK
function orderProduct(index) {
    const qty = parseInt(document.getElementById(`qty-${index}`).value);
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products[index];

    const total = product.price * qty;

    alert(`
Pesanan Berhasil!
Produk : ${product.name}
Jumlah : ${qty}
Total  : ${rupiah(total)}
    `);
}

// HAPUS PRODUK
function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
}
