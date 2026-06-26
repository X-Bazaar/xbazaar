/* ===================================
X Bazaar App.js
Part 1
=================================== */

const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const closeLogin = document.getElementById("closeLogin");
const saveLogin = document.getElementById("saveLogin");

const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");

const cartCount = document.getElementById("cartCount");
const productsGrid = document.getElementById("productsGrid");

/* -------------------------
Loading Screen
------------------------- */

window.addEventListener("load", () => {

const loader = document.getElementById("loadingScreen");

if(loader){

loader.style.display="none";

}

});

/* -------------------------
Login
------------------------- */

if(loginBtn){

loginBtn.onclick=()=>{

loginModal.style.display="flex";

}

}

if(closeLogin){

closeLogin.onclick=()=>{

loginModal.style.display="none";

}

}

if(localStorage.getItem("customerName")){

loginBtn.innerHTML=

localStorage.getItem("customerName");

}

if(saveLogin){

saveLogin.onclick=()=>{

if(customerName.value=="" || customerPhone.value.length!=10){

alert("Enter Valid Details");

return;

}

localStorage.setItem(

"customerName",

customerName.value

);

localStorage.setItem(

"customerPhone",

customerPhone.value

);

loginBtn.innerHTML=

customerName.value;

loginModal.style.display="none";

};

}

/* -------------------------
Dummy Products
------------------------- */

const products=[

{

id:1,

name:"Wireless Earbuds",

price:999,

oldPrice:1499,

image:"https://via.placeholder.com/250",

rating:"⭐⭐⭐⭐☆"

},

{

id:2,

name:"Smart Watch",

price:1599,

oldPrice:2999,

image:"https://via.placeholder.com/250",

rating:"⭐⭐⭐⭐⭐"

},

{

id:3,

name:"Bluetooth Speaker",

price:799,

oldPrice:1299,

image:"https://via.placeholder.com/250",

rating:"⭐⭐⭐⭐☆"

}

];

/* -------------------------
Show Products
------------------------- */

function loadProducts(){

productsGrid.innerHTML="";

products.forEach(product=>{

productsGrid.innerHTML+=`

<div class="product-card">

<div class="product-image">

<img src="${product.image}">

</div>

<h3 class="product-name">

${product.name}

</h3>

<div class="price-row">

<div class="product-price">

₹${product.price}

</div>

<div class="old-price">

₹${product.oldPrice}

</div>

</div>

<div class="rating">

${product.rating}

</div>

<div class="product-buttons">

<button

class="add-cart"

onclick="addCart(${product.id})">

Add to Cart

</button>

<button class="buy-now">

Buy Now

</button>

</div>

</div>

`;

});

}

loadProducts();

/* -------------------------
Cart
------------------------- */

let cart=

JSON.parse(

localStorage.getItem("cart")

)||[];

updateCart();

function addCart(id){

const product=

products.find(

p=>p.id===id

);

cart.push(product);

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

updateCart();

alert("Added To Cart");

}

function updateCart(){

cartCount.innerHTML=

cart.length;

}
/* ===================================
X Bazaar App.js
Part 2
Cart Sidebar + Search + Product Popup
=================================== */

const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartIcon = document.querySelector(".cart");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const popup = document.getElementById("productPopup");
const popupImage = document.getElementById("popupImage");
const popupName = document.getElementById("popupName");
const popupPrice = document.getElementById("popupPrice");
const popupDescription = document.getElementById("popupDescription");

const closePopup = document.getElementById("closePopup");

let selectedProduct = null;

/* =====================
Open Cart
===================== */

if(cartIcon){

cartIcon.onclick=()=>{

cartSidebar.classList.add("active");

renderCart();

}

}

if(closeCart){

closeCart.onclick=()=>{

cartSidebar.classList.remove("active");

}

}

/* =====================
Render Cart
===================== */

function renderCart(){

cartItems.innerHTML="";

let total=0;

if(cart.length===0){

cartItems.innerHTML=

"<p class='empty-cart'>Your cart is empty.</p>";

cartTotal.innerHTML="0";

return;

}

cart.forEach((item,index)=>{

total+=item.price;

cartItems.innerHTML+=`

<div class="cart-item">

<img src="${item.image}">

<div class="cart-info">

<h4>${item.name}</h4>

<p>₹${item.price}</p>

<button

class="remove-item"

onclick="removeCart(${index})">

Remove

</button>

</div>

</div>

`;

});

cartTotal.innerHTML=total;

}

/* =====================
Remove Product
===================== */

function removeCart(index){

cart.splice(index,1);

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

updateCart();

renderCart();

}

/* =====================
Search
===================== */

const searchBox = document.getElementById("searchBox");

if(searchBox){

searchBox.onkeyup=function(){

const value=

this.value.toLowerCase();

const cards=

document.querySelectorAll(".product-card");

cards.forEach(card=>{

const text=

card.innerText.toLowerCase();

card.style.display=

text.includes(value)

?

"flex"

:

"none";

});

}

}

/* =====================
Product Popup
===================== */

function showProduct(id){

selectedProduct=

products.find(

p=>p.id===id

);

popup.style.display="flex";

popupImage.src=

selectedProduct.image;

popupName.innerHTML=

selectedProduct.name;

popupPrice.innerHTML=

"₹"+selectedProduct.price;

popupDescription.innerHTML=

"This product is available at the best price on X Bazaar.";

}

if(closePopup){

closePopup.onclick=()=>{

popup.style.display="none";

}

}

/* =====================
Popup Add Cart
===================== */

const popupCart = document.getElementById("popupCart");

if(popupCart){

popupCart.onclick=()=>{

if(selectedProduct){

cart.push(selectedProduct);

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

updateCart();

renderCart();

popup.style.display="none";

}

}

}
