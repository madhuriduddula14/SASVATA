document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thanks for subscribing! 💌');
});
// Search function
function searchProducts() {
  const input = document.getElementById('search-input').value.toLowerCase();
  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
    const name = product.querySelector('h3').textContent.toLowerCase();
    if (name.includes(input)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Add real-time search as user types
document.getElementById('search-input').addEventListener('input', searchProducts);

const wishlist = new Set();

function updateWishlistCount() {
  document.getElementById('wishlist-count').textContent = wishlist.size;
}

// Toggle wishlist on product hearts
document.querySelectorAll('.product-wishlist').forEach(btn => {
  btn.addEventListener('click', () => {
    const productCard = btn.closest('.product-card');
    const productId = productCard.getAttribute('data-product-id');

    if (wishlist.has(productId)) {
      wishlist.delete(productId);
      btn.textContent = '♡';
      btn.classList.remove('active');
    } else {
      wishlist.add(productId);
      btn.textContent = '❤️';
      btn.classList.add('active');
    }
    updateWishlistCount();
  });
});

// Wishlist icon click: alert with wishlist items (replace with modal if needed)
document.getElementById('wishlist-icon').addEventListener('click', () => {
  if (wishlist.size === 0) {
    alert('Your wishlist is empty.');
    return;
  }
  const names = [...wishlist].map(id => {
    const card = document.querySelector(`.product-card[data-product-id="${id}"]`);
    return card ? card.querySelector('h3').textContent : 'Unknown Product';
  });
  alert('Your Wishlist:\n' + names.join('\n'));
});

// Initialize count on page load
updateWishlistCount();


