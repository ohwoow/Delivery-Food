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
        userName = document.querySelector('.user-name');


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

// Statement 

modalCloseCart.addEventListener('click', closeModalCart);

cartButton.addEventListener('click', toggleModalCart);



new WOW().init();








