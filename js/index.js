const productList=document.querySelector(".product-list");
console.log(productList);
// const showCart=document.querySelector('.cart');
// console.log(showCart)


let cartItemID=1;
eventListeners();

//all event listeners
function eventListeners(){
  window.addEventListener('DOMContentLoaded', () => {
    loadJson();
  });
   productList.addEventListener('click',purchaseProduct);
  //  showCart.addEventListener('click',ShowCart);
}

// this function is used for fetching the data from db.json
function loadJson(){
  fetch('http://localhost:3000/products')            
    .then((response) => {
      return response.json()
   })
   .then((data) => {
     // Work with JSON data here
     
     getData(data);
     filteredMountains = data;
    
    
   
    })
    .catch((err) => {
      // Do something for an error here
      console.log(err);
    })
      
  }
  


  // use this function for display the template using json data in js

function getData(data)
 {
  temp='';
  for (let i in data) {
    
    temp+=`

    <div class="product-item">
          <div class="product-img">
            <img src="${data[i].imageurl}">
            <button type="button" class="add-to-cart-btn" >
              Add To cart
            </button>
          </div>
          <div class="product-content">
            <h3 class="product-name">${data[i].title}</h3>
            <span class="product-brand">${data[i].brand}</span>
            <p class="product-price">${data[i].price}</p>
          </div>
        </div>
      
    `  
  }
  productList.innerHTML=temp;
 
}

// this function is used for search product by title and brand

const nameForm = document.querySelector(".example")
console.log(nameForm);
filteredMountains =[];
nameForm.addEventListener('input',(e)=>{
  e.preventDefault();
  const targElement=e.target.value.toLowerCase();
  const filterCharecter=filteredMountains.filter(filteredMountains=>{
    return filteredMountains.title.toLowerCase().includes(targElement)||filteredMountains.brand.toLowerCase().includes(targElement);
  });
  getData(filterCharecter);
 
})

function submitButton()
{
  alert("search by name and brand");
}

// //created empty_id _(id)  for all id given in html
function _(id){
  return document.getElementById(id);
}


//purchase product
function purchaseProduct(e){
  if(e.target.classList.contains('add-to-cart-btn')){
    let product=e.target.parentElement.parentElement;
    getProductinfo(product);
  }
}

// Get product info After add to cart button click
function getProductinfo(product)
 {
   let productInfo={
      id:cartItemID,
      imageurl:product.getElementsByTagName('img')[0].getAttribute("src"),
      title:product.querySelector('.product-name').textContent,
      brand:product.querySelector('.product-brand').textContent,
      price:product.querySelector('.product-price').textContent
    }
    cartItemID++;
    cartNumbers(productInfo);
    totalCost(productInfo);
  
    // console.log(productInfo)
}  

//function is used for if add product in cart after referace cart value no change
function onLoadcartNumbers()
{

  let productNumbers=localStorage.getItem('cartNumbers');
  
  if(productNumbers){
    document.querySelector('.cart span').textContent=productNumbers;
  }
}


//function for  add and show how many product add in cart
function cartNumbers(productInfo){
  console.log(productInfo);
  let productNumbers=localStorage.getItem('cartNumbers');
  productNumbers=parseInt(productNumbers);
  if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers+1);
    document.querySelector('.cart span').textContent=productNumbers+1;
    }else{
      localStorage.setItem('cartNumbers',1);
      document.querySelector('.cart span').textContent=1;
  }
  setItems(productInfo);
 
}


//for set items in cart
function setItems(productInfo)
{
  let cartItems=localStorage.getItem('productinCart');
  cartItems=JSON.parse(cartItems);

  if(cartItems != null){
    if(cartItems[productInfo.title] == undefined){
      cartItems={
        ...cartItems,
        [productInfo.title]:productInfo
      }
    }
    cartItems[productInfo.title].cartItemID += 1;
  }else{
    cartItems={
      [productInfo.title]:productInfo
    }
    
  }
  productInfo.cartItemID=1;
  localStorage.setItem("productinCart",JSON.stringify(cartItems));
}

//how much total cost of the product which is add in cart
function totalCost(productInfo){
  let cartCost=localStorage.getItem('totalCost');
   console.log(cartCost)
   console.log(typeof cartCost);
  if(cartCost != null){
    cartCost=parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost +
     parseInt(productInfo.price));
   }else{
    localStorage.setItem('totalCost',productInfo.price);
  }
  
}
onLoadcartNumbers();



 
