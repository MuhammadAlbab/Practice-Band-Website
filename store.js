/*
Membuat code untuk mengecek atau memastikan document telah terload sebelum mengakses bagian-bagian yang berbeda.
SANGAT PENTING UNTUK DIMILIKI DI SETIAP PROJECT JAVASCRIPT!!!
*/
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

/*
Membuat semua event listener untuk semua items yang telah berhasil terload pada document, yang diload pada awal code diatas 
*/

function ready() {
    
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

/*
Membuat beebagai macam event yang melakukan hal berbeda seperti menambah atau menghapus item pada cart, mengupdate quantity dll.
*/

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var itemName = shopItem.getElementsByClassName('shop-item-name')[0].innerText
    var itemPrice = shopItem.getElementsByClassName('shop-item-price')[0].innerText.replace('Rp', '')
    var itemImageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(itemName, itemPrice, itemImageSrc)
    updateCartTotal()
}


/*
Catatan: Saat menambah element baru pada document perlu memastikan untuk memasang semua event listener yang dibutuhkan pada document tsb.
         karena mereka tdk ada atau tidak terbaca saat pemasangan dicode awal event listener (ready fucntion).
         karena document ini ditambahkan setelah ready function terpanggil, jadi perlu dipanggil ulang
*/

function addItemToCart(itemName, itemPrice, itemImageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-name')
    for ( var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == itemName) {
            alert('This Item is already added to the cart bro!!!')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${itemImageSrc}">
            <span class="cart-item-name">${itemName}</span>
        </div>
        <span class="cart-price cart-column">${'Rp' + itemPrice }</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>     
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
/*
    Contoh pemasangan ulang event listener, karena document ini ditambahkan setelah ready function terpanggil.
*/
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rp', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rp. ' + total
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function purchaseClicked(){
    alert('Thank You!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}