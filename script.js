function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('newsletter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  const message = document.getElementById('subscribe-message');
  if (email) {
    message.textContent = `Thanks for subscribing, ${email}!`;
    message.style.color = '#28a745';
    e.target.reset();
  } else {
    message.textContent = 'Please enter a valid email.';
    message.style.color = 'red';
  }
});
