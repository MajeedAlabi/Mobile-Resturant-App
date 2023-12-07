import { menuArray } from "./data.js";
let payForm = document.getElementById("form")

let cart = []
let totalPrice = 0 

//CLICKS ON THE DOCUMENT
document.addEventListener("click",function(e){
    if(e.target.dataset.add){
        handleAddBtn(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        handleSubtractBtn(e.target.dataset.remove)
    }
})

//GET MENU LIST
function getMenuHtml(){
    let orders = ""
    menuArray.forEach(function(menu){
        orders+= `
        <div class="section-menu">
            <div class="menu">
                <img src="${menu.image}"/>
                <div class="menu-description">
                    <h3>${menu.name}</h3>
                    <p>${menu.ingredients}</p>
                    <h3>$${menu.price}</h3>
                </div>
                <button data-add="${menu.id}">+</button>
            </div>
            <hr>
        </div>`
    })
    return orders
}

//RENDER MENU LIST
function renderMenuHtml(){
    document.getElementById("section").innerHTML = getMenuHtml()
}

renderMenuHtml()

//ADD BUTTON (TAKING YOUR ORDER)
function handleAddBtn(itemId){
    const targetObject = menuArray.filter(function(menu){
        return itemId == menu.id
    })[0]

    cart.push(targetObject)
    totalPrice += targetObject.price 
    document.getElementById("checkout").classList.remove("hidden")
    renderCheckoutHtml()
}

//REMOVE BUTTON 
function handleSubtractBtn(itemId){
    const targetObject = menuArray.filter(function(menu){
        return itemId == menu.id
    })[0]

    const itemIndex = cart.indexOf(targetObject)

    cart.splice(itemIndex,1)
    totalPrice -= targetObject.price
    renderCheckoutHtml()
    if(totalPrice == 0){
        document.getElementById("checkout").classList.add("hidden")
    }
}

//CHECKOUT
function getCheckoutHtml(){
    let cartItems = ""
    cart.forEach(function(item){
        cartItems += `
        <div class="styleCart">
            <h3>${item.name} <button id="btn-remove" data-remove="${item.id}">remove</button></h3>
            <h3>$${item.price}</h3>
        </div>`
    })
    return cartItems
}

function totalPriceItem(){
        let totalPrices = `
        <div class="styleCart">
            <h3>Total Price: </h3>
            <h3>$${totalPrice}</h3>
        </div>`
    return totalPrices
}

//RENDER CHECKOUT
function renderCheckoutHtml(){
    document.getElementById("checkout-cart").innerHTML = getCheckoutHtml()
    document.getElementById("total-price").innerHTML = totalPriceItem()
}

//MAKING FORM VISIBLE
document.getElementById("complete-order").addEventListener("click", function(){
    payForm.classList.remove("hidden")
})

//SUBMITTING FORM
payForm.addEventListener("submit", function(e){
    e.preventDefault()
    const payFormData = new FormData(payForm)
    const name = payFormData.get("name")

    document.getElementById("checkout").innerHTML = `
        <div class="approved">
            <h2>Thanks, ${name}! Your order is on its way!</h2>
        </div>`
        
    payForm.classList.add("hidden")
})