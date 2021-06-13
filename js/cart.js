function showcart(){
    let cartItems=localStorage.getItem("productinCart");
    cartItems=JSON.parse(cartItems);
    const productcontainer=document.querySelector(".products");
    let cartCost=localStorage.getItem('totalCost');
    
    if(cartItems && productcontainer){
      console.log("running");
      productcontainer.innerHTML='';
      Object.values(cartItems).map(item=>{
          productcontainer.innerHTML +=`
          <div class="product">
            <img src="${item.imageurl}"><span>${item.title}</span
          </div>
          <div class="brand">${item.brand}</div>
          <div class="price">${item.price}</div>
          <div class="quantity"><i class="icon ion-arrow-right-a"></i>${item.cartItemID}</div>
          <div class="total">${item.cartItemID * item.price}</div>
          <div class="action">
            <button type="button" id="deleteRow">Remove</button>
          </div>
          `;
      });

      productcontainer.innerHTML +=`
        <div class="baskettotalContainer">
            <h4 class="basketTotalTitle">
            Total Price
            </h4>
            <h4 class="basketTotal">
            ₹${cartCost}
            </h4>
        </div>
      `;
    }
     
  }
  showcart();

function deleteItem(){
  let parentDiv=document.querySelector(".products");
  console.log(parentDiv)
  
}

  let del_btn=document.getElementById("deleteRow").addEventListener('click',deleteItem);
  
