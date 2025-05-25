// Newsletter subscription
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thanks for subscribing! 💌');
  });
}

// Search function
function searchProducts() {
  const input = document.getElementById('search-input').value.toLowerCase();
  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
    const name = product.querySelector('h3').textContent.toLowerCase();
    product.style.display = name.includes(input) ? 'block' : 'none';
  });
}

document.getElementById('search-input')?.addEventListener('input', searchProducts);

// Wishlist logic using localStorage for persistence
let wishlist = new Set(JSON.parse(localStorage.getItem('wishlist')) || []);

function updateWishlistCount() {
  document.getElementById('wishlist-count').textContent = wishlist.size;
}

function saveWishlist() {
  localStorage.setItem('wishlist', JSON.stringify([...wishlist]));
}

// Toggle wishlist heart
document.querySelectorAll('.product-wishlist').forEach(btn => {
  const productCard = btn.closest('.product-card');
  const productId = productCard.getAttribute('data-product-id');

  // Set initial state
  if (wishlist.has(productId)) {
    btn.textContent = '❤️';
    btn.classList.add('active');
  }

  btn.addEventListener('click', () => {
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
    saveWishlist();
  });
});

// Wishlist icon click - redirect to wishlist page
const wishlistIcon = document.getElementById('wishlist-icon');
if (wishlistIcon) {
  wishlistIcon.addEventListener('click', () => {
    window.location.href = 'wishlist.html';
  });
}

// Initialize count on load
updateWishlistCount();
