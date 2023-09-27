import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const paymentModalEl = document.getElementById('payment-card')
const closeModalEl = document.getElementById('close-modal')
const payButtonEl = document.getElementById('pay-button')
const messageEl = document.getElementById('message')
const nameInputEl = document.querySelector('.card-name')
const orderArray = []

document.addEventListener('click', (e) => {
    if(e.target.dataset.add){
        addOrder(e.target.dataset.add)
    } else if(e.target.dataset.remove){
        removeOrder(e.target.dataset.remove)
    } else if(e.target.id === "complete-order"){
        e.preventDefault()
        paymentModalEl.style.display = "block"
    } else if(e.target === paymentModalEl || e.target === closeModalEl || e.target === payButtonEl){
        paymentModalEl.style.display = "none"
    } if(e.target === payButtonEl){
        greetingMessage()
    }
})

function greetingMessage(){
    let message = `
    <h1 class="greetings">Thanks, ${nameInputEl.value}! Your order is on its way!</h1>
    `
    messageEl.innerHTML = message
    document.getElementById('order').innerHTML = ''
}

function removeOrder(orderId){
    const targetOrderObj = orderArray.findIndex((item) => {
        return item.id == orderId
    })

    if(targetOrderObj !== -1){
        orderArray.splice(targetOrderObj, 1)
        renderOrder()
    }
}

function displayOrder(){
    let orderItems = '<h1 class="user-order">Your order</h1>'
    let totalPrice = 0
    orderArray.forEach((order) => {
        orderItems += `
        <div class="order-start">
            <span class="order-name">${order.name}</span>
            <span class="remove-button" data-remove="${order.id}">remove</span>
            <span class="order-price">$${order.price}</span>
        </div>`
        totalPrice += order.price
    })

    orderItems += `
    <hr>
    <div class="order-mid">
        <span class="total">Total Price:</span>
        <span class="total-price">$${totalPrice.toFixed(2)}<span>
    </div>
    <div class="order-end">
        <button id="complete-order">Complete Order</button>
    </div>`
    return orderItems
}

function addOrder(orderId){
    const targetOrderObj = menuArray.filter((item) => {
        return item.id == orderId
    })[0]

    orderArray.push({
        id: uuidv4(),
        name: targetOrderObj.name,
        price: targetOrderObj.price
    })
    messageEl.innerHTML = ''
    renderOrder()
}

function renderOrder(){
    document.getElementById('order').innerHTML = displayOrder()
}

function getmenuHTML(){
    let menuItems = ''
    menuArray.forEach((item) => {
        menuItems += `
        <div class="menu-wrapper">
            <div class="menu-start">
                <p class="emoji">${item.emoji}</p>
            </div>
            <div class="menu-mid">
                <h2 class="name">${item.name}</h2>
                <p class="ingredients">${item.ingredients}</p>
                <h3 class="price">$${item.price}</h3>
            </div>
            <div class="menu-end">
                <i class="fa-regular fa-plus add-icon" id="icon-${item.id}" data-add="${item.id}"></i>
            </div>
        </div>`
    })
    return menuItems
}

function renderMenu(){
    document.getElementById('menu').innerHTML = getmenuHTML()
}

renderMenu()

