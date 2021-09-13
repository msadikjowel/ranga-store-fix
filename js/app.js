const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((productDetails) => productDetails);
  for (const product of allProducts) {
    // const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product col">
    <img class="product-image" src=${product.image}></img>
    <div class = "">
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p> Rating Given: <span style = "color:#008000; font-weight:bold"> ${product.rating.count}</span>,  Averate Rate: <span style = "color:#008000; font-weight:bold">${product.rating.rate}</span> </p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" onclick = 'details(${product.price},${product.rating.rate})' class="btn btn-danger">Details</button>
      </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }

};

/* BONUS part- single detail result after details button clicked */
const details = (price, rate) => {

  const single = document.getElementById("single-data");
  single.classList.add("single-product");

  // adding rating star icon using condition
  if (rate < 3) {
    single.innerHTML = `
    <h2> Price: $ ${price} </h2>
   <h4> Rating: ${rate} 
   <i class="fas fa-star text-warning"></i>
   <i class="fas fa-star text-warning"></i>
   <i class="fas fa-star text-warning"></i>
   <i class="far fa-star text-warning"></i>
   <i class="far fa-star text-warning"></i>
   </h4>
  `
  }
  else {
    single.innerHTML = `
    <h2> Price: $ ${price} </h2>
   <h4> Rating: ${rate} 
   <i class="fas fa-star text-warning"></i>
   <i class="fas fa-star text-warning"></i>
   <i class="fas fa-star text-warning"></i>
   <i class="fas fa-star-half-alt text-warning"></i>
   <i class="far fa-star text-warning"></i>
   </h4>
  `
  }
}
/* const singleData = singleProduct => {
  console.log(singleProduct)

  const dataDiv = document.getElementById("single-data")
  const newDiv = document.createElement('div')
  newDiv.innerHTML = `
    <h2> Category: ${singleProduct.category} </h2>
  `
  dataDiv.appendChild(newDiv);
  // dataDiv.innerHTML = ''
} */


// update total product that clicked to add to cart
let count = 0;
const addToCart = (id, price) => {
  // console.log(id, price)
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  // console.log(element)
  const converted = parseFloat(element);
  // console.log(converted)
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  // console.log(id, value)
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  // console.log(convertedOldPrice, convertPrice)
  const total = convertedOldPrice + convertPrice;
  // console.log(total)
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price").toFixed(2);
  updateTotal();
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");

  /*   console.log(getInputValue("price"), getInputValue("delivery-charge"), getInputValue("total-tax")) */


  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

/*
fetch('https://fakestoreapi.com/products/1')
  .then(res => res.json())
  .then(json => console.log(json)) */


