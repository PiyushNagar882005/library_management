let cart = [];
let isLoggedIn = false;

const books = {
    CSBS: [
        {name: "Data Structures", price: 500},
        {name: "Python Programming", price: 450}
    ],
    CSE: [
        {name: "Operating Systems", price: 600},
        {name: "DBMS", price: 550}
    ],
    ECE: [
        {name: "Digital Electronics", price: 520},
        {name: "Signals & Systems", price: 480}
    ],
    CIVIL: [
        {name: "Engineering Mechanics", price: 530},
        {name: "Structural Analysis", price: 610}
    ]
};

/* SHOW HOME */
function showHome() {
    document.getElementById("content").innerHTML = `
        <h2>Welcome to ABC College Online Book Store</h2>
        <p>
        Our digital bookstore provides a comprehensive collection of academic books 
        for Engineering students. We offer department-wise curated books 
        designed according to university syllabus.
        </p>

        <h3>Why Choose Us?</h3>
        <ul>
            <li>✔ Latest Edition Books</li>
            <li>✔ Affordable Pricing</li>
            <li>✔ Department-Wise Categorization</li>
            <li>✔ Secure Login System</li>
            <li>✔ Simple Cart Management</li>
        </ul>

        <h3>Available Departments</h3>
        <p>CSBS | CSE | ECE | CIVIL</p>

        <p>
        Use the navigation menu above to login, browse catalogue 
        or manage your cart.
        </p>
    `;
}

/* LOGIN PAGE */
function showLogin() {
    document.getElementById("content").innerHTML = `
        <h2>User Login</h2>
        <br>
        <input type="text" id="username" placeholder="Username"><br><br>
        <input type="password" id="password" placeholder="Password"><br><br>
        <button onclick="login()">Login</button>
    `;
}

function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        isLoggedIn = true;
        alert("Login Successful! Redirecting to Home...");
        showHome();  } // Redirect to Home
    // if (user === "Piyush_88" && pass === "8888") {
    //      isLoggedIn = true;
    //      alert("Login Successful! Redirecting to Home...");
    //      showHome();   // Redirect to Home    
        
    // }
     else {
        alert("Invalid Credentials!");
    }
}

/* LOAD DEPARTMENT */
function loadDepartment(dept) {
    let bookList = books[dept];
    let html = `<h2>${dept} Books</h2>`;

    bookList.forEach(book => {
        html += `
            <p>
                ${book.name} - ₹${book.price}
                <button onclick="addToCart('${book.name}', ${book.price})">
                Add to Cart
                </button>
            </p>
        `;
    });

    document.getElementById("content").innerHTML = html;
}

/* ADD TO CART */
function addToCart(name, price) {
    if (!isLoggedIn) {
        alert("Please login first!");
        return;
    }

    cart.push({name, price});
    document.getElementById("cartCount").innerText = cart.length;
    alert("Book added to cart!");
}

/* SHOW CART */
function showCart() {
    if (!isLoggedIn) {
        alert("Please login first!");
        return;
    }

    let total = 0;
    let html = "<h2>Your Cart</h2>";

    if (cart.length === 0) {
        html += "<p>Your cart is empty.</p>";
    } else {
        html += "<div class='cart-items'>";

        cart.forEach((item, index) => {
            total += item.price;
            html += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>₹${item.price}</span>
                </div>
            `;
        });

        html += "</div>";
        html += `<hr><h3>Total: ₹${total}</h3>`;

        html += `
            <br>
            <button onclick="buyNow()">Buy Now</button>
            <button onclick="clearCart()" class="danger-btn">Clear Cart</button>
        `;
    }

    document.getElementById("content").innerHTML = html;
}
function buyNow() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    alert("🎉 Purchase Successful! Thank you for shopping with us.");
    cart = [];
    document.getElementById("cartCount").innerText = 0;
    showHome();
}

function clearCart() {
    if (cart.length === 0) {
        alert("Cart is already empty!");
        return;
    }

    let confirmClear = confirm("Are you sure you want to clear the cart?");
    if (confirmClear) {
        cart = [];
        document.getElementById("cartCount").innerText = 0;
        alert("Cart cleared successfully!");
        showCart();
    }
}
/* SHOW CATALOGUE */
function showCatalogue() {
    let html = "<h2>Complete Catalogue</h2>";

    for (let dept in books) {
        html += `<h3>${dept}</h3>`;
        books[dept].forEach(book => {
            html += `<p>${book.name} - ₹${book.price}</p>`;
        });
    }

    document.getElementById("content").innerHTML = html;
}

/* INITIAL LOAD */
showHome();