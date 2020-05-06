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
        cardsMenu = document.querySelector('.cards-menu');

        

let login = localStorage.getItem('Delivery-food');


// *Functions

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


function createCardRestaraunts() {
    
    const card = `
        <div class="cards__item wow fadeInLeft" data-wow-delay='0.2s'>                          
            <div class="cards__item-img">
            <a>  
                <img src="img/card-image.jpg" alt="Pizza +">
            </a>
            </div>
            <div class="cards__item-wrapper">
                <div class="cards__item-header">
                    <div class="item__header-name">
                        <a  class="item__header-link">Пицца плюс</a> 
                    </div>
                    <span class="item__header-time">50 мин</span>
                </div>
                <div class="cards__item-info">
                    <div class="item__info-rating">
                        <img src="img/star.svg" alt="star">
                        4.5
                    </div>
                    <div class="item__info-price">От 900 ₽</div>
                    <div class="item__info-category">Пицца, роллы</div>
                </div>
            </div>
        </div>
        `;

    cardsRestaraunts.insertAdjacentHTML('beforeend', card);
}

createCardRestaraunts();
createCardRestaraunts();
createCardRestaraunts();

function createCardGood() {
    const card = document.createElement('div');
    card.className = 'cards__item wow fadeInRight';
    card.insertAdjacentHTML('beforeend', 
    `                        
        <div class="cards__item-img cards__item-img--shop">
        <a href="#">  
            <img src="img/shop-image-6.png" alt="Pizza +">
        </a>
        </div>
        <div class="cards__item-wrapper">
            <div class="cards__item-header">
                <div class="item__header-name">
                    <a href="" class="item__header-link item__header-link--reg">Ролл с креветкой стандарт</a> 
                </div>
            </div>

            <div class="cards__item-info">
                <div class="item__info-ingredietns">Рис, водоросли нори, креветки отварные, сыр сливочный, огурцы</div>
            </div>
            <div class="cards__button">
                <button type="button" class="button button-cart--shop">
                    <span class="cards__button-text">В корзину</span>
                    <img src="img/cart-shop.svg" alt="" class="cards__button-img">
                </button>
                <div class="cards__button-price">250 ₽</div>
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
            cardsRestaraunts.classList.add('hide');
            promo.classList.add('hide');
            itemGoods.classList.remove('hide');
    
            cardsMenu.textContent = '';
    
            createCardGood();
            createCardGood();
            createCardGood();
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



// Statement 

modalCloseCart.addEventListener('click', closeModalCart);

cartButton.addEventListener('click', toggleModalCart);

cardsRestaraunts.addEventListener('click', openGoods);





new WOW().init();








