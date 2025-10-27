// CARRINHO
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartCount = document.getElementById('cart-count');
const miniCart = document.getElementById('mini-cart');
const miniCartItems = document.getElementById('mini-cart-items');
const miniCartTotal = document.getElementById('mini-cart-total');
const cartItemsDiv = document.getElementById('cart-items');
const totalPriceP = document.getElementById('total-price');
const emptyCartMsg = document.getElementById('empty-cart');

// ADICIONAR PRODUTO
function addToCart(id, title, price, image) {
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity++;
  else cart.push({ id, title, price, image, quantity: 1 });

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

// REMOVER PRODUTO
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

// ATUALIZAR UI
function updateCartUI() {
  // Contador
  if(cartCount) cartCount.textContent = cart.reduce((acc, i) => acc + i.quantity, 0);

  // Mini-cart
  if(miniCartItems) {
    miniCartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const div = document.createElement('div');
      div.innerHTML = `${item.title} x ${item.quantity} - R$ ${ (item.price*item.quantity).toFixed(2) }`;
      miniCartItems.appendChild(div);
    });
    if(miniCartTotal) miniCartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
  }

  // carrinho.html
  if(cartItemsDiv && totalPriceP && emptyCartMsg) {
    cartItemsDiv.innerHTML = '';
    if(cart.length === 0) {
      emptyCartMsg.style.display = 'block';
      totalPriceP.textContent = 'Total: R$ 0,00';
    } else {
      emptyCartMsg.style.display = 'none';
      let total = 0;
      cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.marginBottom = '0.5rem';
        div.innerHTML = `
          <span>${item.title} x ${item.quantity}</span>
          <span>R$ ${(item.price*item.quantity).toFixed(2)}</span>
          <button onclick="removeFromCart('${item.id}')">Remover</button>
        `;
        cartItemsDiv.appendChild(div);
      });
      totalPriceP.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
  }
}

// MINI-CART TOGGLE
const miniCartBtn = document.getElementById('mini-cart-btn');
if(miniCartBtn) miniCartBtn.addEventListener('click', () => {
  if(miniCart) miniCart.hidden = !miniCart.hidden;
});

// ============================
// AJAX FORMULÁRIO DE CONTATO
// ============================
const contactForm = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

if(contactForm) {
  contactForm.addEventListener('submit', function(e){
    e.preventDefault(); // impede recarregamento

    // Captura dados do formulário
    const formData = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      mensagem: document.getElementById('mensagem').value
    };

    // Simula envio AJAX
    setTimeout(() => {
      // Aqui normalmente você enviaria os dados para um servidor
      console.log('Mensagem enviada:', formData);

      // Exibe mensagem de sucesso
      formResponse.textContent = "Mensagem enviada com sucesso!";
      contactForm.reset();
    }, 500); // simula delay de rede
  });
}

// Inicializa
updateCartUI();
