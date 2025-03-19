document.addEventListener('DOMContentLoaded', function() {
    // Проверяем и инициализируем систему языков, если она еще не инициализирована
    if (typeof initLanguage === 'function' && (!window.erpLanguage || !window.erpLanguage.current)) {
        initLanguage();
    }
    
    // Load orders
    loadOrders();
    
    // Load products for the dropdown
    loadProductsForDropdown();
    
    // Load suppliers for the dropdown
    loadSuppliers();
    
    // Setup modals
    const orderModal = document.getElementById('orderModal');
    const orderDetailsModal = document.getElementById('orderDetailsModal');
    const createOrderBtn = document.getElementById('createOrderBtn');
    const cancelOrderBtn = document.getElementById('cancelOrderBtn');
    const closeOrderBtn = orderModal.querySelector('.close');
    const closeDetailsBtn = orderDetailsModal.querySelector('.close');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Open modal when Create Order button is clicked
    createOrderBtn.addEventListener('click', function() {
        document.getElementById('orderForm').reset();
        orderModal.style.display = 'block';
        
        // Reset order items with translated labels
        document.getElementById('orderItems').innerHTML = `
            <div class="order-item">
                <div class="form-row">
                    <div class="form-group">
                        <label for="product-0" data-i18n="product">${getTranslation('product', 'Product')}</label>
                        <select id="product-0" class="product-select" required>
                            <!-- Products will be loaded here -->
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="quantity-0" data-i18n="quantity">${getTranslation('quantity', 'Quantity')}</label>
                        <input type="number" id="quantity-0" class="quantity-input" min="1" value="1" required>
                    </div>
                    <div class="form-group">
                        <label for="price-0" data-i18n="price">${getTranslation('price', 'Price')}</label>
                        <input type="number" id="price-0" class="price-input" step="0.01" min="0" required readonly>
                    </div>
                    <div class="form-group">
                        <label for="total-0" data-i18n="total">${getTranslation('total', 'Total')}</label>
                        <input type="number" id="total-0" class="total-input" step="0.01" min="0" required readonly>
                    </div>
                    <button type="button" class="btn-danger remove-item" disabled><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        
        // Load products for the first item
        loadProductsForItem(0);
        
        // Reset summary
        document.getElementById('totalItems').textContent = '1';
        document.getElementById('totalAmount').textContent = formatCurrency(0);
        
        // Apply translations to the dynamic content
        if (typeof applyTranslations === 'function') {
            applyTranslations();
        }
    });
    
    // Close modals when Cancel button is clicked
    cancelOrderBtn.addEventListener('click', function() {
        orderModal.style.display = 'none';
    });
    
    // Close modals when X is clicked
    closeOrderBtn.addEventListener('click', function() {
        orderModal.style.display = 'none';
    });
    
    closeDetailsBtn.addEventListener('click', function() {
        orderDetailsModal.style.display = 'none';
    });
    
    // Close modals when Close button is clicked
    closeModalBtns.forEach(button => {
        button.addEventListener('click', function() {
            orderDetailsModal.style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === orderModal) {
            orderModal.style.display = 'none';
        }
        if (event.target === orderDetailsModal) {
            orderDetailsModal.style.display = 'none';
        }
    });
    
    // Add Item button
    const addItemBtn = document.getElementById('addItemBtn');
    addItemBtn.addEventListener('click', function() {
        addOrderItem();
    });
    
    // Handle order form submission
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const supplierId = document.getElementById('supplierId').value;
        const orderItems = [];
        
        // Get all order items
        const productSelects = document.querySelectorAll('.product-select');
        const quantityInputs = document.querySelectorAll('.quantity-input');
        const priceInputs = document.querySelectorAll('.price-input');
        
        for (let i = 0; i < productSelects.length; i++) {
            orderItems.push({
                product_id: parseInt(productSelects[i].value),
                quantity: parseInt(quantityInputs[i].value),
                cost_price: parseFloat(priceInputs[i].value)
            });
        }
        
        const orderData = {
            supplier_id: parseInt(supplierId),
            items: orderItems,
            notes: '' // Optional notes field
        };
        
        // Create order
        createOrder(orderData);
    });
    
    // Setup filter functionality
    const statusFilter = document.getElementById('statusFilter');
    statusFilter.addEventListener('change', function() {
        applyFilters();
    });
    
    const dateFilter = document.getElementById('dateFilter');
    dateFilter.addEventListener('change', function() {
        applyFilters();
    });
});

// Function to load orders
function loadOrders() {
    fetch('/api/purchase-orders')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load orders');
            }
            return response.json();
        })
        .then(data => {
            // Store orders globally for filtering
            window.allOrders = data.orders;
            
            // Display orders
            displayOrders(data.orders);
        })
        .catch(error => {
            console.error('Error loading orders:', error);
        });
}

// Function to display orders
function displayOrders(orders) {
    const ordersTable = document.getElementById('ordersTable');
    ordersTable.innerHTML = '';
    
    if (orders.length === 0) {
        ordersTable.innerHTML = `<tr><td colspan="6" class="text-center">${getTranslation('noSalesFound', 'No orders found')}</td></tr>`;
        return;
    }
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        
        // Format date
        const date = new Date(order.order_date);
        const formattedDate = date.toLocaleDateString();
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.supplier_name}</td>
            <td>${formattedDate}</td>
            <td>${order.status}</td>
            <td>${formatCurrency(order.total_amount)}</td>
            <td class="action-buttons">
                <button class="action-btn view-btn" data-id="${order.id}" data-i18n="view">
                    ${getTranslation('view', 'View')}
                </button>
                <button class="action-btn delete-btn" data-id="${order.id}" data-i18n="delete">
                    ${getTranslation('delete', 'Delete')}
                </button>
                <button class="action-btn pdf-btn" data-id="${order.id}">
                    <i class="fas fa-file-pdf"></i> <span data-i18n="pdf">
                    ${getTranslation('pdf', 'PDF')}</span>
                </button>
            </td>
        `;
        
        ordersTable.appendChild(row);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-id');
            viewOrderDetails(orderId);
        });
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-id');
            deleteOrder(orderId);
        });
    });
    
    // Add event listeners to pdf buttons
    document.querySelectorAll('.pdf-btn').forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-id');
            generateOrderPDF(orderId);
        });
    });
}

// Function to apply filters
function applyFilters() {
    if (!window.allOrders) return;
    
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    let filteredOrders = window.allOrders;
    
    // Filter by status
    if (statusFilter !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }
    
    // Filter by date range
    if (dateFilter !== 'all') {
        const now = new Date();
        let startDate;
        
        switch (dateFilter) {
            case 'today':
                startDate = new Date(now.setHours(0, 0, 0, 0));
                break;
            case 'week':
                startDate = new Date(now);
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate = new Date(now);
                startDate.setMonth(now.getMonth() - 1);
                break;
        }
        
        filteredOrders = filteredOrders.filter(order => {
            const orderDate = new Date(order.order_date);
            return orderDate >= startDate;
        });
    }
    
    // Display filtered orders
    displayOrders(filteredOrders);
}

// Function to load products for dropdown
function loadProductsForDropdown() {
    fetch('/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load products');
            }
            return response.json();
        })
        .then(data => {
            // Store products globally
            window.allProducts = data.products;
            
            // Load products for the first item
            loadProductsForItem(0);
        })
        .catch(error => {
            console.error('Error loading products:', error);
        });
}

// Function to load products for a specific order item
function loadProductsForItem(index) {
    if (!window.allProducts) return;
    
    const productSelect = document.getElementById(`product-${index}`);
    productSelect.innerHTML = `<option value="">${getTranslation('selectProduct', 'Select a product')}</option>`;
    
    window.allProducts.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} (${formatCurrency(product.price)})`;
        option.dataset.price = product.price;
        productSelect.appendChild(option);
    });
    
    // Add event listener to update price and total when product is selected
    productSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const price = selectedOption.dataset.price || 0;
        const quantity = document.getElementById(`quantity-${index}`).value || 1;
        
        document.getElementById(`price-${index}`).value = price;
        document.getElementById(`total-${index}`).value = (price * quantity).toFixed(2);
        
        updateOrderTotal();
    });
    
    // Add event listener to update total when quantity changes
    const quantityInput = document.getElementById(`quantity-${index}`);
    quantityInput.addEventListener('input', function() {
        const price = document.getElementById(`price-${index}`).value || 0;
        const quantity = this.value || 0;
        
        document.getElementById(`total-${index}`).value = (price * quantity).toFixed(2);
        
        updateOrderTotal();
    });
}

// Function to load suppliers
function loadSuppliers() {
    fetch('/api/suppliers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load suppliers');
            }
            return response.json();
        })
        .then(data => {
            const supplierSelect = document.getElementById('supplierId');
            supplierSelect.innerHTML = '<option value="">Select a supplier</option>';
            
            data.suppliers.forEach(supplier => {
                const option = document.createElement('option');
                option.value = supplier.id;
                option.textContent = supplier.name;
                supplierSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading suppliers:', error);
        });
}

// Function to add a new order item
function addOrderItem() {
    const orderItems = document.getElementById('orderItems');
    const itemCount = orderItems.children.length;
    
    // Create new item row
    const newItem = document.createElement('div');
    newItem.className = 'order-item';
    newItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label for="product-${itemCount}" data-i18n="product">${getTranslation('product', 'Product')}</label>
                <select id="product-${itemCount}" class="product-select" required>
                    <!-- Products will be loaded here -->
                </select>
            </div>
            <div class="form-group">
                <label for="quantity-${itemCount}" data-i18n="quantity">${getTranslation('quantity', 'Quantity')}</label>
                <input type="number" id="quantity-${itemCount}" class="quantity-input" min="1" value="1" required>
            </div>
            <div class="form-group">
                <label for="price-${itemCount}" data-i18n="price">${getTranslation('price', 'Price')}</label>
                <input type="number" id="price-${itemCount}" class="price-input" step="0.01" min="0" required readonly>
            </div>
            <div class="form-group">
                <label for="total-${itemCount}" data-i18n="total">${getTranslation('total', 'Total')}</label>
                <input type="number" id="total-${itemCount}" class="total-input" step="0.01" min="0" required readonly>
            </div>
            <button type="button" class="btn-danger remove-item"><i class="fas fa-trash"></i></button>
        </div>
    `;
    
    orderItems.appendChild(newItem);
    
    // Load products for the new item
    const productSelect = document.getElementById(`product-${itemCount}`);
    loadProductsForDropdown(productSelect);
    
    // Update total items count
    document.getElementById('totalItems').textContent = orderItems.children.length;
    
    // Add event listeners for new item
    setupItemEventListeners(newItem);
}

// Function to update order total
function updateOrderTotal() {
    const totalInputs = document.querySelectorAll('.total-input');
    let totalAmount = 0;
    
    totalInputs.forEach(input => {
        totalAmount += parseFloat(input.value || 0);
    });
    
    document.getElementById('totalAmount').textContent = formatCurrency(totalAmount);
}

// Function to create an order
function createOrder(orderData) {
    fetch('/api/supplier-orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create order');
        }
        return response.json();
    })
    .then(data => {
        // Close modal
        document.getElementById('orderModal').style.display = 'none';
        
        // Reload orders
        loadOrders();
    })
    .catch(error => {
        console.error('Error creating order:', error);
        alert('Failed to create order. Please try again.');
    });
}

// Function to view order details
function viewOrderDetails(orderId) {
    fetch(`/api/supplier-orders/${orderId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load order details');
            }
            return response.json();
        })
        .then(data => {
            const order = data.order;
            const orderDetailsContent = document.getElementById('orderDetailsContent');
            
            // Format date
            const date = new Date(order.order_date);
            const formattedDate = date.toLocaleDateString();
            
            let itemsHtml = '';
            let totalAmount = 0;
            
            order.items.forEach(item => {
                const itemPrice = item.price || item.cost_price || 0;
                const itemTotal = itemPrice * item.quantity;
                totalAmount += itemTotal;
                
                itemsHtml += `
                    <tr>
                        <td>${item.product_name}</td>
                        <td>${item.quantity}</td>
                        <td>${formatCurrency(itemPrice)}</td>
                        <td>${formatCurrency(itemTotal)}</td>
                    </tr>
                `;
            });
            
            orderDetailsContent.innerHTML = `
                <div class="order-details">
                    <div class="order-header">
                        <div class="order-info">
                            <p><strong data-i18n="orderID">${getTranslation('orderID', 'Order ID')}:</strong> ${order.id}</p>
                            <p><strong data-i18n="supplier">${getTranslation('supplier', 'Supplier')}:</strong> ${order.supplier_name}</p>
                            <p><strong data-i18n="date">${getTranslation('date', 'Date')}:</strong> ${formattedDate}</p>
                            <p><strong data-i18n="status">${getTranslation('status', 'Status')}:</strong> ${order.status}</p>
                        </div>
                    </div>
                    
                    <div class="order-items">
                        <h3 data-i18n="orderItems">${getTranslation('orderItems', 'Order Items')}</h3>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th data-i18n="product">${getTranslation('product', 'Product')}</th>
                                    <th data-i18n="quantity">${getTranslation('quantity', 'Quantity')}</th>
                                    <th data-i18n="price">${getTranslation('price', 'Price')}</th>
                                    <th data-i18n="total">${getTranslation('total', 'Total')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemsHtml}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" class="text-right"><strong data-i18n="totalAmount">${getTranslation('totalAmount', 'Total Amount')}:</strong></td>
                                    <td><strong>${formatCurrency(totalAmount)}</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            `;
            
            // Show modal
            document.getElementById('orderDetailsModal').style.display = 'block';
            
            // Apply translations to the dynamic content
            if (typeof applyTranslations === 'function') {
                applyTranslations();
            }
        })
        .catch(error => {
            console.error('Error loading order details:', error);
            alert('Failed to load order details. Please try again.');
        });
}

// Helper function to get translation
function getTranslation(key, defaultText) {
  if (typeof window.erpLanguage !== 'undefined' && window.erpLanguage.translate) {
    return window.erpLanguage.translate(key);
  } else if (typeof i18next !== 'undefined' && i18next.t) {
    return i18next.t(key);
  } else if (typeof translations !== 'undefined' && translations[currentLanguage] && translations[currentLanguage][key]) {
    return translations[currentLanguage][key];
  }
  return defaultText;
}

// Function to delete an order
function deleteOrder(orderId) {
    // Create modal for admin password confirmation
    const modalHtml = `
        <div id="delete-order-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 data-i18n="confirmDelete">${getTranslation('confirmDelete', 'Confirm Delete')}</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <p data-i18n="confirmDeletePurchaseOrder">${getTranslation('confirmDeletePurchaseOrder', 'Are you sure you want to delete this purchase order?')}</p>
                    <p data-i18n="enterAdminPassword">${getTranslation('enterAdminPassword', 'Please enter admin password to confirm:')}</p>
                    <input type="password" id="admin-password" class="form-control" data-i18n-placeholder="adminPassword" placeholder="${getTranslation('adminPassword', 'Admin Password')}">
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-dismiss="modal" data-i18n="cancel">${getTranslation('cancel', 'Cancel')}</button>
                    <button class="btn btn-danger" id="confirm-delete-btn" data-i18n="delete">${getTranslation('delete', 'Delete')}</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to the page
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);
    
    // Apply translations to the modal elements
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    } else if (typeof window.erpLanguage !== 'undefined' && window.erpLanguage.init) {
        window.erpLanguage.init();
    } else if (typeof i18next !== 'undefined') {
        i18next.reloadResources().then(() => {
            const elements = document.querySelectorAll('[data-i18n]');
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (i18next.exists(key)) {
                    element.textContent = i18next.t(key);
                }
                // Also translate placeholder if needed
                if (element.hasAttribute('data-i18n-placeholder')) {
                    const placeholderKey = element.getAttribute('data-i18n-placeholder');
                    if (i18next.exists(placeholderKey)) {
                        element.placeholder = i18next.t(placeholderKey);
                    }
                }
            });
        });
    }
    
    // Show the modal
    const modal = document.getElementById('delete-order-modal');
    modal.style.display = 'block';
    
    // Add event listeners
    modal.querySelector('.close').addEventListener('click', function() {
        document.body.removeChild(modalContainer);
    });
    
    modal.querySelector('[data-dismiss="modal"]').addEventListener('click', function() {
        document.body.removeChild(modalContainer);
    });
    
    modal.querySelector('#confirm-delete-btn').addEventListener('click', function() {
        const adminPassword = document.getElementById('admin-password').value;
        
        if (!adminPassword) {
            alert('Please enter admin password');
            return;
        }
        
        // Send delete request with admin password
        fetch(`/api/purchase-orders/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ adminPassword })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.error || 'Failed to delete order'); });
            }
            return response.json();
        })
        .then(data => {
            // Reload orders
            document.body.removeChild(modalContainer);
            loadOrders();
        })
        .catch(error => {
            console.error('Error deleting order:', error);
            alert('Failed to delete order: ' + error.message);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            document.body.removeChild(modalContainer);
        }
    });
}

// Function to generate PDF for an order
function generateOrderPDF(orderId) {
    // Open PDF in a new window
    window.open(`/api/supplier-orders/${orderId}/pdf`, '_blank');
}

// Функция форматирования валюты в зависимости от языка
function formatCurrency(amount) {
    // Если доступна функция из модуля языка, используем её
    if (typeof window.erpLanguage !== 'undefined' && window.erpLanguage.formatCurrency) {
        return window.erpLanguage.formatCurrency(amount);
    }
    
    // Запасной вариант, если функция из модуля языка недоступна
    // Получаем текущий язык
    let currentLanguage = 'en';
    if (typeof window.erpLanguage !== 'undefined' && window.erpLanguage.current) {
        currentLanguage = window.erpLanguage.current();
    } else if (typeof localStorage !== 'undefined') {
        currentLanguage = localStorage.getItem('erp_language') || 'en';
    }
    
    // Форматируем сумму в зависимости от языка
    switch (currentLanguage) {
        case 'ru':
            return `${amount.toFixed(2)} ₽`;
        case 'az':
            return `${amount.toFixed(2)} ₼`;
        default: // en
            return `$${amount.toFixed(2)}`;
    }
}
