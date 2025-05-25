// Newsletter subscription
// const newsletterForm = document.getElementById('newsletter-form');
// if (newsletterForm) {
//   newsletterForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     alert('Thanks for subscribing! 💌');
//   });
// }

// Search function
const openSearchBtn = document.getElementById('open-search');
const closeSearchBtn = document.getElementById('close-search');
const searchModal = document.getElementById('search-modal');

openSearchBtn.addEventListener('click', () => {
  searchModal.setAttribute('aria-hidden', 'false');
  document.getElementById('modal-search-input').focus();
});

closeSearchBtn.addEventListener('click', () => {
  searchModal.setAttribute('aria-hidden', 'true');
  openSearchBtn.focus();
});
// Search filtering inside modal
const modalSearchInput = document.getElementById('modal-search-input');
const allProducts = document.querySelectorAll('.product-card');

modalSearchInput.addEventListener('input', () => {
  const searchTerm = modalSearchInput.value.trim().toLowerCase();

  allProducts.forEach(product => {
    const productName = product.querySelector('h3').textContent.toLowerCase();
    const productCategory = product.querySelector('p').textContent.toLowerCase();

    const match = productName.includes(searchTerm) || productCategory.includes(searchTerm);
    product.style.display = match ? 'block' : 'none';
  });
});
// 1. Handle modal search "Search" button click
const modalSearchBtn = document.getElementById('modal-search-btn');

modalSearchBtn.addEventListener('click', () => {
  const searchTerm = modalSearchInput.value.trim().toLowerCase();

  allProducts.forEach(product => {
    const productName = product.querySelector('h3').textContent.toLowerCase();
    const productCategory = product.querySelector('p').textContent.toLowerCase();

    const match = productName.includes(searchTerm) || productCategory.includes(searchTerm);
    product.style.display = match ? 'block' : 'none';
  });

  // Optional: Close modal after search
  searchModal.setAttribute('aria-hidden', 'true');
  openSearchBtn.focus();
});

// 2. Allow clicking search icon again to toggle (open/close)
openSearchBtn.addEventListener('click', () => {
  const isHidden = searchModal.getAttribute('aria-hidden') === 'true';
  searchModal.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
  if (isHidden) {
    modalSearchInput.focus();
  } else {
    openSearchBtn.focus();
  }
});


// Close modal on outside click or Escape key
searchModal.addEventListener('click', (e) => {
  if (e.target === searchModal) {
    searchModal.setAttribute('aria-hidden', 'true');
    openSearchBtn.focus();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchModal.getAttribute('aria-hidden') === 'false') {
    searchModal.setAttribute('aria-hidden', 'true');
    openSearchBtn.focus();
  }
});


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


// Cart logic using localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Update cart count in navbar (we'll add this later)
function updateCartCount() {
  const cartCount = Object.values(cart).reduce((total, qty) => total + qty, 0);
  document.getElementById('cart-count').textContent = cartCount;
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add event listeners to all Add to Cart buttons
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const productCard = btn.closest('.product-card');
    const productId = productCard.getAttribute('data-product-id');
    cart[productId] = (cart[productId] || 0) + 1; // Increment quantity
    updateCartCount();
    saveCart();
  });
});

// Initialize cart count on page load
updateCartCount();

//Make cart icon clickable
const cartIcon = document.getElementById('cart-icon');
if (cartIcon) {
  cartIcon.addEventListener('click', () => {
    window.location.href = 'cart.html';  // You'll create this page next
  });
}


