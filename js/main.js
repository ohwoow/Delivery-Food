'use strict';

const   body = document.getElementById('body'),
        modal = document.querySelector('.modal'),
        modalUser = document.getElementById('modal-user'),
        modalCart = document.getElementById('modal-cart'),
        userButton = document.getElementById('user-button'),
        cartButton = document.getElementById('cart-button'),
        modalCloseUser = document.getElementById('modal-close-user'),
        modalCloseCart = document.getElementById('modal-close-cart'),
        formLogin = document.getElementById('login-form'),
        loginInput = document.getElementById('input-email'),
        passwordInput = document.getElementById('input-pass'),
        buttonOut = document.querySelector('.button-out'),
        userName = document.querySelector('.user-name'),
        cardsRestaraunts = document.querySelector('.cards-restaraunts'),
        promo = document.querySelector('.promo'),
        itemGoods = document.querySelector('.item-goods'),
        headerLogo = document.querySelector('.header__logo'),
        cardsMenu = document.querySelector('.cards-menu'),
        restaurantsTitle = document.querySelector('.restaurant__title'),
        infoRating = document.querySelector('.item__info-rating'),
        infoMinPrice = document.querySelector('.item__info-price'),
        infoCategory = document.querySelector('.item__info-category'),
        modalCartBody = document.querySelector('.modal__body'),
        cartTotalPrice = document.querySelector('.modal__footer-total-price'),
        buttonClearCart = document.querySelector('.button-modal--cancel');
        

let login = localStorage.getItem('Delivery-food');
let saveCart = localStorage.getItem('Delivery-cart');

const cart  = [];


// *Functions


const getData = async function(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
    }

    return await response.json();
};



function toggleModalUser() {
    modalUser.classList.toggle('active');
    body.classList.toggle('no-scroll');  
}
function toggleModalCart() {
    modalCart.classList.toggle('active');
    body.classList.toggle('no-scroll');  
}

function closeModalCart() {
    modalCart.classList.toggle('active');
    body.classList.toggle('no-scroll');  
}
function closeModalUser() {
    modalUser.classList.toggle('active');
    body.classList.toggle('no-scroll');
    loginInput.style.borderBottomColor = '';    
}



function authorized() {
    console.log('Вы вошли в аккаунт');


    function logOut() {

        login = null;

        localStorage.removeItem('Delivery-food');
        localStorage.removeItem('Delivery-cart');
        
        buttonOut.style.display = 'none';
        userName.style.display = 'none';
        userButton.style.display = 'block';

        buttonOut.removeEventListener('click', logOut);
        checkAuth();
    }

    userName.textContent = login;

    userButton.style.display = 'none';
    buttonOut.style.display = 'inline-block';
    userName.style.display = 'block';

    buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
    console.log('Вы не вошли в аккаунт');

    function logIn(event) {
        event.preventDefault();

        if (loginInput.value != 0) {
            login = loginInput.value;
            localStorage.setItem('Delivery-food', login);
    
            userButton.removeEventListener('click', toggleModalUser);
            modalCloseUser.removeEventListener('click', closeModalUser);
            formLogin.removeEventListener('submit', logIn);
    
            formLogin.reset();
    
            checkAuth();
            closeModalUser();
        } else {
            loginInput.style.borderBottomColor = 'red';
        }
    }

    userButton.addEventListener('click', toggleModalUser);
    modalCloseUser.addEventListener('click', closeModalUser);
    formLogin.addEventListener('submit', logIn);
}




function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

checkAuth();


function createCardRestaraunts(restaraunt) {

    const { image, kitchen, name, price, products, stars, 
    
    time_of_delivery: timeOfDelivery } = restaraunt;
    
    const card = `
        <div class="cards__item wow fadeInLeft" data-info="${[name, price, stars, kitchen]}"  data-products="${products}"  data-wow-delay='0.2s'>                          
            <div class="cards__item-img">
            <a>  
                <img src="${image}" alt="Pizza +">
            </a>
            </div>
            <div class="cards__item-wrapper">
                <div class="cards__item-header">
                    <div class="item__header-name">
                        <a  class="item__header-link">${name}</a> 
                    </div>
                    <span class="item__header-time">${timeOfDelivery} мин.</span>
                </div>
                <div class="cards__item-info">
                    <div class="item__info-rating">
                        <img src="img/star.svg" alt="star">
                        ${stars}
                    </div>
                    <div class="item__info-price">От ${price}₽</div>
                    <div class="item__info-category">${kitchen}</div>
                </div>
            </div>
        </div>
        `;

    cardsRestaraunts.insertAdjacentHTML('beforeend', card);
}


function createCardGood(goods) {

    const { description, id, image, name, price } = goods;

    const card = document.createElement('div');
    card.className = 'cards__item cards__item--goods wow fadeInRight';
    card.insertAdjacentHTML('beforeend', 
    `                        
        <div class="cards__item-img cards__item-img--shop">
        <a href="#">  
            <img src="${image}" alt="Pizza +">
        </a>
        </div>
        <div class="cards__item-wrapper">
            <div class="cards__item-header">
                <div class="item__header-name">
                    <a href="" class="item__header-link item__header-link--reg">${name}</a> 
                </div>
            </div>

            <div class="cards__item-info">
                <div class="item__info-ingredietns">${description}</div>
            </div>
            <div class="cards__button">
                <button type="button" class="button button-cart--shop" id="${id}">
                    <span class="cards__button-text">В корзину</span>
                    <img src="img/cart-shop.svg" alt="" class="cards__button-img">
                </button>
                <div class="cards__button-price">${price}₽</div>
            </div>
        </div>
        
    `);

    cardsMenu.insertAdjacentElement('beforeend', card);
    
}



function openGoods(event) {

    const target = event.target;
    
    const restaraunt = target.closest('.cards__item');
    
    if (login) {
        if (restaraunt) {

            const info = restaraunt.dataset.info.split(',');

            const [name, price, stars, kitchen] = info;            

            cardsMenu.textContent = '';  

            cardsRestaraunts.classList.add('hide');
            promo.classList.add('hide');
            itemGoods.classList.remove('hide');

            restaurantsTitle.textContent = name;
            infoRating.textContent = stars;
            infoMinPrice.textContent = 'От ' + price + '₽';
            infoCategory.textContent = kitchen;

            getData(`../db/${restaraunt.dataset.products}`).then(function(data) {
                data.forEach(createCardGood);
            });
        }
    
    } else {
        toggleModalUser();
    }  
}




if (headerLogo) {
    headerLogo.addEventListener('click', function () {
        cardsRestaraunts.classList.remove('hide');
        promo.classList.remove('hide');
        itemGoods.classList.add('hide');
    });
}


function addToCard(event) {
    const target = event.target;

    const buttonAddToCard = target.closest('.button-cart--shop');
    if (buttonAddToCard) {
        const card = target.closest('.cards__item--goods');
        const title = card.querySelector('.item__header-link--reg').textContent;
        const cost = card.querySelector('.cards__button-price').textContent;
        const id = buttonAddToCard.id;

        const food = cart.find(function (item) {
           return item.id === id; 
        });

        if (food) {
            food.count += 1;
        } else {
            cart.push({   
                id,
                title,
                cost,
                count: 1
            });
        }
    }
}

function renderCard() {
    modalCartBody.textContent = '';

    cart.forEach(function({ id, title, cost, count }) {
        const itemCart = `
        <div class="food-row">
            <span class="food-row__name">${title}</span>
            <strong class="food-row__price" data-id="${id}">${cost}</strong>
            <div class="food-row__counter">
                <button class="counter__button counter-minus" data-id="${id}">-</button>
                <span class="counter__num">${count}</span>
                <button class="counter__button counter-plus" data-id="${id}">+</button>
            </div>
        </div>
        `;

        modalCartBody.insertAdjacentHTML('afterbegin', itemCart);
    });

    const totalPrice = cart.reduce(function(result, item) { 
        return result + (parseFloat(item.cost) * item.count);   
    }, 0);

    cartTotalPrice.textContent = totalPrice +' ₽';
}

function changeCount(event) {
    const target = event.target;

    if (target.classList.contains('counter__button')) {
        const food = cart.find(function(item) {
            return item.id === target.dataset.id;
        });
        
        if (target.classList.contains('counter-minus')) {
            food.count--;
            if (food.count === 0) {
                cart.splice(cart.indexOf(food), 1);
            }
        };
        if (target.classList.contains('counter-plus')) food.count++;
        renderCard(); 
    }
}

function init() {
    getData('./db/partners.json').then(function(data) {
    
        data.forEach(createCardRestaraunts);
    
    });

    buttonClearCart.addEventListener('click', function() {
        cart.length = 0;
        renderCard();
    });

    modalCartBody.addEventListener('click', changeCount);

    cardsMenu.addEventListener('click', addToCard);
    
    modalCloseCart.addEventListener('click', closeModalCart);

    cartButton.addEventListener('click', function() {
        renderCard();
        toggleModalCart();
    });

    cardsRestaraunts.addEventListener('click', openGoods);

}

init();


new WOW().init();








