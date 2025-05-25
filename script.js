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

