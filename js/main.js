const cartButton = document.getElementById('cart-button'),
      modal = document.querySelector('.modal'),
      modalClose = document.getElementById('modal-close'),
      body = document.getElementById('body');


function toggleModal() {
    modal.classList.toggle('active');
    body.classList.toggle('no-scroll');  
}

if (cartButton) {
    cartButton.addEventListener('click', toggleModal);

}

if (modalClose) {
    modalClose.addEventListener('click', toggleModal);
    
}




    new WOW().init();








