const searchBar = document.getElementById('search-bar');
const products = document.querySelectorAll('.product');
const noResultsMessage = document.getElementById('no-results');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total');
const paymentOptions = document.getElementById('payment-options');

let cart = [];

// Função para exibir a forma de pagamento selecionada (opcional)
paymentOptions.addEventListener('change', () => {
    const selectedPaymentMethod = paymentOptions.options[paymentOptions.selectedIndex].text;
    console.log(`Forma de pagamento selecionada: ${selectedPaymentMethod}`);
});


// Função para adicionar um produto ao carrinho
function addToCart(productName, productPrice) {
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        // Se o produto já estiver no carrinho, aumenta a quantidade
        cart[existingProductIndex].quantity += 1;
    } else {
        // Adiciona o novo produto ao carrinho
        cart.push({
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1,
        });
    }
    updateCartDisplay();
}

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td><input type="number" value="${item.price.toFixed(2)}" step="0.01" 
                       onchange="updateItemPrice(${index}, this.value)"></td>
            <td><input type="number" value="${item.quantity}" min="1" 
                       onchange="updateItemQuantity(${index}, this.value)"></td>
            <td>R$ ${subtotal.toFixed(2)}</td>
            <td><button onclick="removeFromCart(${index})">Remover</button></td>
        `;
        cartItemsList.appendChild(row);
    });

    totalPriceElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Função para remover um item do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Função para atualizar o preço de um item no carrinho
function updateItemPrice(index, newPrice) {
    cart[index].price = parseFloat(newPrice) || 0;
    updateCartDisplay();
}

// Função para atualizar a quantidade de um item no carrinho
function updateItemQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity) || 1;
    updateCartDisplay();
}

// Função para filtrar os produtos com base na pesquisa
function filterProducts() {
    const query = searchBar.value.toLowerCase();
    let found = false;

    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(query)) {
            product.style.display = 'block'; // Exibe o produto
            found = true;
        } else {
            product.style.display = 'none'; // Oculta o produto
        }
    });

    // Exibe ou oculta a mensagem de "Nenhum produto encontrado"
    noResultsMessage.style.display = found ? 'none' : 'block';
}

// Adiciona eventos aos botões de "Adicionar ao Carrinho"
products.forEach(product => {
    const button = product.querySelector('.add-to-cart');
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});

// Adiciona o evento de pesquisa ao campo de texto
searchBar.addEventListener('input', filterProducts);


//-------------------------------------------- SCRIPT ANTIGO ----------------------------------------
// Seleciona os elementos da página

/*
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const clearCartButton = document.getElementById('clear-cart');
const products = document.querySelectorAll('.product');
const searchBar = document.getElementById('search-bar');



// Carrinho de compras
let cart = [];

// Função para adicionar um item ao carrinho
function addToCart(productName, productPrice) {
    const product = { name: productName, price: parseFloat(productPrice) };
    cart.push(product);
    updateCartDisplay();
}

// Função para remover um item do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
    cartItemsList.innerHTML = ''; // Limpa a lista de itens do carrinho
    let total1 = 0;

    cart.forEach((item, index) => {
        // Adiciona o item ao carrinho
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} 
                              <button onclick="removeFromCart(${index})">Remover</button>`;
        cartItemsList.appendChild(listItem);

        total1 += item.price;
    });

    totalPriceElement.textContent = `Total: R$ ${total1.toFixed(2)}`;
}

// Função para limpar o carrinho
function clearCart() {
    cart = [];
    updateCartDisplay();
}


 // Função para filtrar os produtos com base na pesquisa
 function filterProducts() {
     const query = searchBar.value.toLowerCase();
     let found = false; // Verifica se algum item foi encontrado

     products.forEach(product => {
         const productName = product.getAttribute('data-name').toLowerCase();
         if (productName.includes(query)) {
             product.style.display = 'block'; // Exibe o produto
             found = true;
         } else {
             product.style.display = 'none'; // Oculta o produto
         }
     });

     // Exibe ou oculta a mensagem de "Nenhum resultado"
     noResultsMessage.style.display = found ? 'none' : 'block';
 }

 // Adiciona o evento de pesquisa ao campo de texto
 searchBar.addEventListener('input', filterProducts);

products.forEach(product => {
    product.style.display = 'none';
});
// Adiciona os eventos aos botões de "Adicionar ao Carrinho"
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');
        addToCart(productName, productPrice);
    });
});

// Adiciona o evento ao botão "Limpar Carrinho"
clearCartButton.addEventListener('click', clearCart);



//FORMULARIO

function calculateTotal() {
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (!price || !quantity) {
        document.getElementById('result').innerText = "Por favor, insira valores válidos.";
        return;
    }

    const total = price * quantity ;
    document.getElementById('result').innerText = `Valor Total: R$ ${total.toFixed(2)}`;
}


function calculateFilteredTotal() {
    let total = 0;

    products.forEach(product => {
        if (product.style.display !== 'none') {
            const price = parseFloat(product.getAttribute('data-price'));
            const quantityInput = product.querySelector('.quantity');
            const quantity = parseInt(quantityInput.value) || 0;
            total += price * quantity;
        }
    });

    resultElement.textContent = `Total dos Produtos Filtrados: R$ ${total.toFixed(2)}`;
}
*/
