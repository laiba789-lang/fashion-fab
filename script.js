// Shopping cart logic
let cart = [];

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartModal() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalDiv = document.getElementById('cartTotal');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, idx) => {
            total += item.price * item.qty;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `<span>${item.name} x${item.qty} - $${item.price * item.qty}</span> <button class="remove-item" data-idx="${idx}">Remove</button>`;
            cartItemsDiv.appendChild(div);
        });
    }
    cartTotalDiv.textContent = `Total: $${total}`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = btn.closest('.collection-card');
            const name = card.getAttribute('data-name');
            const price = parseInt(card.getAttribute('data-price'));
            const img = card.getAttribute('data-img');
            const found = cart.find(item => item.name === name);
            if (found) {
                found.qty += 1;
            } else {
                cart.push({ name, price, img, qty: 1 });
            }
            updateCartCount();
            updateCartModal();
        });
    });
    // Cart modal
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        updateCartModal();
    });
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
    // Remove item
    document.getElementById('cartItems').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const idx = parseInt(e.target.getAttribute('data-idx'));
            cart.splice(idx, 1);
            updateCartCount();
            updateCartModal();
        }
    });
    // Secure checkout
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        // Simulate secure checkout
        alert('Thank you for shopping with Fashion Fab! Your payment is securely processed.');
        cart = [];
        updateCartCount();
        updateCartModal();
        document.getElementById('cartModal').classList.remove('active');
    });
});
