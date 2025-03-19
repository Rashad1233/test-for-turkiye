document.addEventListener('DOMContentLoaded', function() {
    // Initialize language system
    if (typeof initLanguage === 'function') {
        initLanguage();
    }
    
    // Load transactions
    loadTransactions();
    
    // Load products for the dropdown
    loadProductsForDropdown();
    
    // Setup modal
    const modal = document.getElementById('transactionModal');
    const addTransactionBtn = document.getElementById('addTransactionBtn');
    const cancelTransactionBtn = document.getElementById('cancelTransactionBtn');
    const closeBtn = modal.querySelector('.close');
    
    // Open modal when Add Transaction button is clicked
    addTransactionBtn.addEventListener('click', function() {
        document.getElementById('transactionForm').reset();
        // Устанавливаем текущую дату в поле даты
        if (document.getElementById('transactionDate')) {
            document.getElementById('transactionDate').valueAsDate = new Date();
        }
        // Инициализируем поле общей суммы
        updateTotalAmount();
        modal.style.display = 'block';
    });
    
    // Close modal when Cancel button is clicked
    cancelTransactionBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Add event listeners for recalculating total amount
    const quantityInput = document.getElementById('transactionQuantity');
    const priceInput = document.getElementById('transactionPrice');
    
    // Function to calculate and update total amount
    function updateTotalAmount() {
        const quantity = parseInt(quantityInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        const total = quantity * price;
        
        // If we have a total amount field, update it
        const totalField = document.getElementById('transactionTotal');
        if (totalField) {
            totalField.value = total.toFixed(2);
        }
    }
    
    // Add event listeners to quantity and price inputs
    quantityInput.addEventListener('input', updateTotalAmount);
    priceInput.addEventListener('input', updateTotalAmount);
    
    // Handle transaction form submission
    const transactionForm = document.getElementById('transactionForm');
    transactionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productId = parseInt(document.getElementById('transactionProduct').value);
        const quantity = parseInt(document.getElementById('transactionQuantity').value);
        const unitPrice = parseFloat(document.getElementById('transactionPrice').value || 0);
        const notes = document.getElementById('transactionNotes').value || '';
        
        // Рассчитываем общую сумму
        const totalAmount = quantity * unitPrice;
        
        const transactionData = {
            product_id: productId,
            quantity: quantity,
            transaction_type: document.getElementById('transactionType').value,
            unit_price: unitPrice,
            total_amount: totalAmount,
            notes: notes
        };
        
        // If transaction type is Sale, make quantity negative
        if (transactionData.transaction_type === 'Sale') {
            transactionData.quantity = -transactionData.quantity;
        }
        
        // Add transaction
        addTransaction(transactionData);
    });
    
    // Setup filter functionality
    const filterType = document.getElementById('filterType');
    filterType.addEventListener('change', function() {
        applyFilters();
    });
    
    const dateRange = document.getElementById('dateRange');
    dateRange.addEventListener('change', function() {
        applyFilters();
    });
    
    // Add event listener for language changes
    document.addEventListener('languageChanged', function() {
        updateTableHeaders();
        // Reload transactions to update language
        loadTransactions();
    });
    
    // Add event listener for when translations are applied
    document.addEventListener('translationsApplied', function(event) {
        console.log('Translations applied for language:', event.detail.language);
        // Force update of table headers and UI elements after translations are applied
        updateTableHeaders();
    });
});

// Helper function to get translation
function getTranslation(key, defaultText) {
  if (typeof translations !== 'undefined' && translations[currentLanguage] && translations[currentLanguage][key]) {
    return translations[currentLanguage][key];
  }
  return defaultText;
}

// Function to update table headers
function updateTableHeaders() {
  // Update table headers
  const tableHeaders = document.querySelectorAll('.data-table th');
  if (tableHeaders.length > 0) {
    tableHeaders.forEach(th => {
      const key = th.getAttribute('data-i18n');
      if (key) {
        const translation = getTranslation(key, th.textContent);
        th.textContent = translation;
      }
    });
  }
  
  // Update page header
  const pageHeader = document.querySelector('.main-header h1');
  if (pageHeader) {
    const key = pageHeader.getAttribute('data-i18n');
    if (key) {
      pageHeader.textContent = getTranslation(key, pageHeader.textContent);
    }
  }
  
  // Update Add Transaction button
  const addTransactionBtn = document.querySelector('#addTransactionBtn span');
  if (addTransactionBtn) {
    const key = addTransactionBtn.getAttribute('data-i18n');
    if (key) {
      addTransactionBtn.textContent = getTranslation(key, addTransactionBtn.textContent);
    }
  }
  
  // Update filter labels and options
  const filterLabels = document.querySelectorAll('.filter-group label');
  filterLabels.forEach(label => {
    const key = label.getAttribute('data-i18n');
    if (key) {
      label.textContent = getTranslation(key, label.textContent);
    }
  });
  
  const filterOptions = document.querySelectorAll('.filter-group select option');
  filterOptions.forEach(option => {
    const key = option.getAttribute('data-i18n');
    if (key) {
      option.textContent = getTranslation(key, option.textContent);
    }
  });
  
  // Update modal text
  const modalTitle = document.querySelector('#transactionModal h2');
  if (modalTitle) {
    const key = modalTitle.getAttribute('data-i18n');
    if (key) {
      modalTitle.textContent = getTranslation(key, modalTitle.textContent);
    }
  }
  
  const modalLabels = document.querySelectorAll('#transactionModal label');
  modalLabels.forEach(label => {
    const key = label.getAttribute('data-i18n');
    if (key) {
      label.textContent = getTranslation(key, label.textContent);
    }
  });
  
  const modalButtons = document.querySelectorAll('#transactionModal button');
  modalButtons.forEach(button => {
    const key = button.getAttribute('data-i18n');
    if (key) {
      button.textContent = getTranslation(key, button.textContent);
    }
  });
}

// Function to load transactions
function loadTransactions() {
    // Update table headers before loading data
    updateTableHeaders();
    
    // Добавляем временную метку для предотвращения кэширования
    const timestamp = new Date().getTime();
    
    fetch(`/api/transactions?_=${timestamp}`)
        .then(response => {
            console.log('API Response Status:', response.status);
            
            if (!response.ok) {
                throw new Error(getTranslation('errorLoadingTransactions', 'Failed to load transactions'));
            }
            return response.json();
        })
        .then(data => {
            // Отладочная информация о структуре данных
            console.log('Transactions data received:', data);
            if (data.transactions && data.transactions.length > 0) {
                console.log('First transaction example:', data.transactions[0]);
                console.log('Available fields:', Object.keys(data.transactions[0]).join(', '));
            }
            
            // Проверяем структуру ответа
            if (!data.transactions) {
                console.error('API did not return transactions array:', data);
                return;
            }
            
            // Store transactions globally for filtering
            window.allTransactions = data.transactions;
            
            // Display transactions
            displayTransactions(data.transactions);
        })
        .catch(error => {
            console.error(getTranslation('errorLoadingTransactions', 'Error loading transactions:'), error);
        });
}

// Function to display transactions
function displayTransactions(transactions) {
    const transactionsTable = document.getElementById('transactionsTable');
    transactionsTable.innerHTML = '';
    
    if (transactions.length === 0) {
        const noTransactionsText = getTranslation('noData', 'No transactions found');
        transactionsTable.innerHTML = `<tr><td colspan="9" class="text-center">${noTransactionsText}</td></tr>`;
        return;
    }
    
    // Функция для форматирования денежной суммы
    function formatCurrency(amount) {
        // Если значение пустое или не определено
        if (amount === null || amount === undefined || amount === '') {
            return '-';
        }
        
        // Если это строка, пробуем преобразовать в число
        if (typeof amount === 'string') {
            // Удаляем все нечисловые символы, кроме точки и запятой
            amount = amount.replace(/[^\d.,]/g, '');
            // Заменяем запятую на точку, если есть
            amount = amount.replace(',', '.');
        }
        
        // Преобразуем в число
        const numValue = parseFloat(amount);
        
        // Проверяем, успешно ли преобразовано
        if (isNaN(numValue)) {
            return '-';
        }
        
        // Форматируем с двумя десятичными знаками и символом валюты
        return '$' + numValue.toFixed(2);
    }
    
    // Функция для получения значения из объекта с проверкой на null/undefined
    function safeProp(obj, prop, defaultValue = '-') {
        // Проверяем наличие свойства в разных вариантах (camelCase, snake_case)
        const propVariants = [prop, prop.replace(/([A-Z])/g, '_$1').toLowerCase()]; // camelCase -> snake_case
        
        // Проверяем основной объект
        for (const p of propVariants) {
            if (obj[p] !== null && obj[p] !== undefined && obj[p] !== '') {
                return obj[p];
            }
        }
        
        // Проверяем вложенные объекты, которые могут содержать дополнительные данные
        const possibleContainers = ['additionalData', 'metadata', 'extendedProperties', 'data', 'properties'];
        for (const container of possibleContainers) {
            if (obj[container]) {
                const containerData = typeof obj[container] === 'string' 
                    ? tryParseJson(obj[container]) 
                    : obj[container];
                
                if (containerData) {
                    for (const p of propVariants) {
                        if (containerData[p] !== null && containerData[p] !== undefined && containerData[p] !== '') {
                            return containerData[p];
                        }
                    }
                }
            }
        }
        
        // Проверяем, есть ли строковое поле 'data', которое может содержать JSON
        if (obj.data && typeof obj.data === 'string') {
            const parsedData = tryParseJson(obj.data);
            if (parsedData) {
                for (const p of propVariants) {
                    if (parsedData[p] !== null && parsedData[p] !== undefined && parsedData[p] !== '') {
                        return parsedData[p];
                    }
                }
            }
        }
        
        return defaultValue;
    }
    
    // Вспомогательная функция для безопасного парсинга JSON
    function tryParseJson(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    }
    
    transactions.forEach((transaction, index) => {
        // Проверяем, что транзакция имеет необходимые поля
        if (!transaction || !transaction.id || !transaction.product_name) {
            console.warn(`Transaction at index ${index} has invalid structure:`, transaction);
            return; // Пропускаем эту транзакцию
        }
        
        // Отладочный вывод для каждой транзакции
        console.log(`Transaction ${index}:`, transaction);
        console.log(`Unit Price:`, safeProp(transaction, 'unitPrice', safeProp(transaction, 'unit_price')));
        console.log(`Total Amount:`, safeProp(transaction, 'totalAmount', safeProp(transaction, 'total_amount')));
        console.log(`Notes:`, safeProp(transaction, 'notes', ''));
        
        const row = document.createElement('tr');
        
        // Format date
        const date = new Date(transaction.transaction_date);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Get translated transaction type
        const translatedType = getTranslation(transaction.transaction_type.toLowerCase(), transaction.transaction_type);
        
        // Получаем данные с безопасной проверкой
        const unitPrice = safeProp(transaction, 'unitPrice', safeProp(transaction, 'unit_price'));
        const totalAmount = safeProp(transaction, 'totalAmount', safeProp(transaction, 'total_amount'));
        const notes = safeProp(transaction, 'notes', '');
        
        // Если общая сумма не предоставлена, но есть цена за единицу, рассчитываем ее
        let displayTotalAmount = totalAmount;
        if ((totalAmount === '-' || totalAmount === '') && unitPrice !== '-') {
            // Преобразуем в числа и умножаем
            const quantity = Math.abs(transaction.quantity);
            const price = parseFloat(unitPrice.toString().replace(/[^\d.,]/g, '').replace(',', '.'));
            if (!isNaN(price)) {
                displayTotalAmount = quantity * price;
            }
        }
        
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${formattedDate}</td>
            <td>${translatedType}</td>
            <td>${transaction.product_name}</td>
            <td>${Math.abs(transaction.quantity)}</td>
            <td>${formatCurrency(unitPrice)}</td>
            <td>${formatCurrency(displayTotalAmount)}</td>
            <td>${notes}</td>
            <td class="action-buttons">
                <button class="action-btn delete-btn" data-id="${transaction.id}">${getTranslation('delete', 'Delete')}</button>
                <button class="action-btn pdf-btn" data-id="${transaction.id}"><i class="fas fa-file-pdf"></i> ${getTranslation('pdf', 'PDF')}</button>
            </td>
        `;
        
        transactionsTable.appendChild(row);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const transactionId = this.getAttribute('data-id');
            deleteTransaction(transactionId);
        });
    });
    
    // Add event listeners to pdf buttons
    document.querySelectorAll('.pdf-btn').forEach(button => {
        button.addEventListener('click', function() {
            const transactionId = this.getAttribute('data-id');
            generateTransactionPDF(transactionId);
        });
    });
}

// Function to apply filters
function applyFilters() {
    if (!window.allTransactions) return;
    
    const filterType = document.getElementById('filterType').value;
    const dateRange = document.getElementById('dateRange').value;
    
    let filteredTransactions = window.allTransactions;
    
    // Filter by type
    if (filterType !== 'all') {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.transaction_type === filterType);
    }
    
    // Filter by date range
    if (dateRange !== 'all') {
        const now = new Date();
        let startDate;
        
        switch (dateRange) {
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
        
        filteredTransactions = filteredTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate >= startDate;
        });
    }
    
    // Display filtered transactions
    displayTransactions(filteredTransactions);
}

// Function to load products for dropdown
function loadProductsForDropdown() {
    console.log('Loading products for dropdown...');
    
    fetch('/api/products')
        .then(response => {
            console.log('Products API response status:', response.status);
            if (!response.ok) {
                throw new Error(getTranslation('errorLoadingProducts', 'Failed to load products'));
            }
            return response.json();
        })
        .then(data => {
            console.log('Products data received:', data);
            
            const productSelect = document.getElementById('transactionProduct');
            if (!productSelect) {
                console.error('Product select element not found');
                return;
            }
            
            const selectProductText = getTranslation('selectProduct', 'Select a product');
            productSelect.innerHTML = `<option value="">${selectProductText}</option>`;
            
            if (!data.products || data.products.length === 0) {
                console.log('No products found or products array is empty');
                const option = document.createElement('option');
                option.value = "";
                option.textContent = getTranslation('noProductsAvailable', "No products available");
                option.disabled = true;
                productSelect.appendChild(option);
                return;
            }
            
            data.products.forEach(product => {
                console.log('Adding product to dropdown:', product);
                const option = document.createElement('option');
                option.value = product.id;
                const stockText = getTranslation('stock', 'Stock');
                option.textContent = `${product.name} (${stockText}: ${product.current_stock})`;
                productSelect.appendChild(option);
            });
            
            console.log('Products dropdown populated with', data.products.length, 'products');
        })
        .catch(error => {
            console.error(getTranslation('errorLoadingProducts', 'Error loading products:'), error);
        });
}

// Function to add a transaction
function addTransaction(transactionData) {
    // Отладочная информация об отправляемых данных
    console.log('Sending transaction data to API:', transactionData);
    
    // Добавляем дату транзакции, если она не предоставлена
    if (!transactionData.transaction_date) {
        const dateInput = document.getElementById('transactionDate');
        transactionData.transaction_date = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];
    }
    
    // Добавляем временную метку для предотвращения кэширования
    const timestamp = new Date().getTime();
    
    fetch(`/api/transactions?_=${timestamp}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
    })
    .then(response => {
        console.log('API Response Status (add transaction):', response.status);
        
        if (!response.ok) {
            throw new Error(getTranslation('errorAddingTransaction', 'Failed to add transaction'));
        }
        return response.json();
    })
    .then(data => {
        // Отладочная информация о полученном ответе
        console.log('API response after adding transaction:', data);
        
        // Close modal
        document.getElementById('transactionModal').style.display = 'none';
        
        // Show success message
        if (typeof showNotification === 'function') {
            showNotification(getTranslation('transactionAddedSuccess', 'Transaction added successfully'), 'success');
        }
        
        // Небольшая задержка перед обновлением данных, чтобы API успел обработать изменения
        setTimeout(() => {
            // Reload transactions
            loadTransactions();
            
            // Reload products dropdown to update stock levels
            loadProductsForDropdown();
        }, 500); // 500ms задержка
    })
    .catch(error => {
        console.error(getTranslation('errorAddingTransaction', 'Error adding transaction:'), error);
        
        // Show error message
        if (typeof showNotification === 'function') {
            showNotification(getTranslation('errorAddingTransaction', 'Failed to add transaction. Please try again.'), 'error');
        } else {
            alert(getTranslation('errorAddingTransaction', 'Failed to add transaction. Please try again.'));
        }
    });
}

// Function to delete a transaction
function deleteTransaction(transactionId) {
    const confirmMessage = getTranslation('deleteTransactionConfirm', 'Are you sure you want to delete this transaction? This may affect inventory levels.');
    
    if (confirm(confirmMessage)) {
        fetch(`/api/transactions/${transactionId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(getTranslation('errorDeletingTransaction', 'Failed to delete transaction'));
            }
            return response.json();
        })
        .then(data => {
            // Show success message
            if (typeof showNotification === 'function') {
                showNotification(getTranslation('transactionDeletedSuccess', 'Transaction deleted successfully'), 'success');
            }
            
            // Reload transactions
            loadTransactions();
            
            // Reload products dropdown to update stock levels
            loadProductsForDropdown();
        })
        .catch(error => {
            console.error(getTranslation('errorDeletingTransaction', 'Error deleting transaction:'), error);
            
            // Show error message
            if (typeof showNotification === 'function') {
                showNotification(getTranslation('errorDeletingTransaction', 'Failed to delete transaction. Please try again.'), 'error');
            } else {
                alert(getTranslation('errorDeletingTransaction', 'Failed to delete transaction. Please try again.'));
            }
        });
    }
}

// Function to generate PDF for a transaction
function generateTransactionPDF(transactionId) {
    // Open PDF in a new window
    window.open(`/api/transactions/${transactionId}/pdf`, '_blank');
}
