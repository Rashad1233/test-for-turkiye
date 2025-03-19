/**
 * Language Switcher Functionality for ERP System
 */

// Define available languages
const languages = {
    en: {
        code: 'en',
        name: 'English',
        flag: 'images/flags/en.png',
        currency: {
            symbol: '$',
            position: 'before' // валютный символ до числа
        }
    },
    ru: {
        code: 'ru',
        name: 'Русский',
        flag: 'images/flags/ru.png',
        currency: {
            symbol: '₽',
            position: 'after' // валютный символ после числа
        }
    },
    tr: {
        code: 'tr',
        name: 'Türkçe',
        flag: 'images/flags/tr.png',
        currency: {
            symbol: '₺',
            position: 'after' // валютный символ после числа
        }
    }
};

// Default language
let currentLanguage = localStorage.getItem('erp_language') || 'en';

// Dictionary of translations
const translations = {
    en: {
        // Login page
        'login': 'Login',
        'username': 'Username',
        'password': 'Password',
        
        // Dashboard
        'dashboard': 'Dashboard',
        'totalProducts': 'Total Products',
        'lowStockItems': 'Low Stock Items',
        'activeSuppliers': 'Active Suppliers',
        'recentSales': 'Recent Sales',
        'lowStockAlerts': 'Low Stock Alerts',
        'viewAll': 'View All',
        
        // Navigation
        'products': 'Products',
        'suppliers': 'Suppliers',
        'inventory': 'Inventory',
        'sales': 'Sales',
        'clients': 'Clients',
        'purchaseOrders': 'Purchase Orders',
        'reports': 'Reports',
        'logout': 'Logout',
        
        // User info
        'language': 'Language',
        
        // Common
        'save': 'Save',
        'cancel': 'Cancel',
        'add': 'Add',
        'edit': 'Edit',
        'delete': 'Delete',
        'search': 'Search',
        'filter': 'Filter',
        'loading': 'Loading...',
        'actions': 'Actions',
        'id': 'ID',
        'name': 'Name',
        'description': 'Description',
        'price': 'Price',
        'costPrice': 'Cost Price',
        'confirmDelete': 'Confirm Delete',
        
        // Products page
        'addProduct': 'Add Product',
        'searchProducts': 'Search products...',
        'currentStock': 'Current Stock',
        'minLevel': 'Min Level',
        'supplier': 'Supplier',
        'deleteProductConfirm': 'Are you sure you want to delete this product?',
        
        // Suppliers page
        'addSupplier': 'Add Supplier',
        'searchSuppliers': 'Search suppliers...',
        'contactPerson': 'Contact Person',
        'email': 'Email',
        'phone': 'Phone',
        'address': 'Address',
        'paymentTerms': 'Payment Terms',
        'deleteSupplierConfirm': 'Are you sure you want to delete this supplier?',
        
        // Inventory page
        'inventoryManagement': 'Inventory Management',
        'addTransaction': 'Add Transaction',
        'filterByType': 'Filter by Type:',
        'allTransactions': 'All Transactions',
        'purchases': 'Purchases',
        'purchase': 'Purchase',
        'sale': 'Sale',
        'dateRange': 'Date Range:',
        'allTime': 'All Time',
        'today': 'Today',
        'thisWeek': 'This Week',
        'thisMonth': 'This Month',
        'date': 'Date',
        'type': 'Type',
        'product': 'Product',
        'quantity': 'Quantity',
        'unitPrice': 'Unit Price',
        'totalAmount': 'Total Amount',
        'notes': 'Notes',
        'deleteTransactionConfirm': 'Are you sure you want to delete this transaction?',
        
        // Sales page
        'salesManagement': 'Sales Management',
        'newSale': 'New Sale',
        'salesList': 'Sales List',
        'searchSales': 'Search sales...',
        'allStatuses': 'All Statuses',
        'completed': 'Completed',
        'pending': 'Pending',
        'cancelled': 'Cancelled',
        'client': 'Client',
        'total': 'Total',
        'status': 'Status',
        'createNewSale': 'Create New Sale',
        'selectClient': 'Select Client',
        'addItems': 'Add Items',
        'selectProduct': 'Select Product',
        'add': 'Add',
        'saleSummary': 'Sale Summary',
        'completeSale': 'Complete Sale',
        'saleDetails': 'Sale Details',
        'close': 'Close',
        'lowStockAlert': 'Low Stock Alert',
        
        // Purchase Orders page
        'purchaseOrdersManagement': 'Purchase Orders',
        'createOrder': 'Create Order',
        'orderID': 'Order ID',
        'allOrders': 'All Orders',
        'orderItems': 'Order Items',
        'addItem': 'Add Item',
        'totalItems': 'Total Items',
        'createPurchaseOrder': 'Create Purchase Order',
        'orderDetails': 'Order Details',
        
        // Clients page
        'clientManagement': 'Client Management',
        'newClient': 'New Client',
        'clientsList': 'Clients List',
        'searchClients': 'Search clients...',
        'addNewClient': 'Add New Client',
        'clientDetails': 'Client Details',
        
        // Reports page
        'reportsTitle': 'Reports',
        'availableReports': 'Available Reports',
        'salesReport': 'Sales Report',
        'salesReportDesc': 'View sales performance over time',
        'inventoryReport': 'Inventory Report',
        'inventoryReportDesc': 'Current stock levels and valuation',
        'clientReport': 'Client Report',
        'clientReportDesc': 'Client activity and purchase history',
        'supplierReport': 'Supplier Report',
        'supplierReportDesc': 'Supplier performance and order history',
        'lowStockReport': 'Low Stock Report',
        'lowStockReportDesc': 'Products with low stock levels',
        'financialReport': 'Financial Report',
        'financialReportDesc': 'Revenue, expenses, and profit',
        'reportResults': 'Report Results',
        'exportPDF': 'Export PDF',
        'reportFilters': 'Report Filters',
        'salesReportFilters': 'Sales Report Filters',
        'inventoryReportFilters': 'Inventory Report Filters',
        'clientsReport': 'Clients Report',
        'supplierReportFilters': 'Supplier Report Filters',
        'lowStockReportFilters': 'Low Stock Report Filters',
        'financialReportFilters': 'Financial Report Filters',
        'thisQuarter': 'This Quarter',
        'thisYear': 'This Year',
        'customRange': 'Custom Range',
        'startDate': 'Start Date',
        'endDate': 'End Date',
        'applyFilters': 'Apply Filters',
        'clientFilter': 'Client',
        'statusFilter': 'Status',
        'stockFilter': 'Stock Level',
        'allStockLevels': 'All Stock Levels',
        'lowStock': 'Low Stock',
        'normalStock': 'Normal Stock',
        'highStock': 'High Stock',
        'supplierFilter': 'Supplier',
        'allSuppliers': 'All Suppliers',
        'allClients': 'All Clients',
        'severityFilter': 'Severity Level',
        'allLevels': 'All Levels',
        'critical': 'Critical',
        'requireReplenishment': 'Replenishment Required',
        'outOfStock': 'Out of Stock',
        'salesOverTime': 'Sales Over Time',
        'exportSection': 'Export Section',
        'salesTrendVisualization': 'Sales trend visualization would appear here',
        'salesSummary': 'Sales Summary',
        'totalSales': 'Total Sales',
        'totalRevenue': 'Total Revenue',
        'averageSale': 'Average Sale',
        'exportFullReport': 'Export Full Report',
        'generated': 'Generated',
        'error': 'Error',
        'warning': 'Warning',
        'unknownReportType': 'Unknown report type',
        'errorLoadingReport': 'Error Loading Report',
        'unexpectedError': 'An unexpected error occurred',
        'tryAgainLater': 'Please try again later',
        'noSalesData': 'No sales data available for the selected period',
        
        // Reports page - additional keys
        'noInventoryData': 'No inventory data to display',
        'inventorySummary': 'Inventory Summary',
        'totalProducts': 'Total Products',
        'totalValue': 'Total Value',
        'averageStockLevel': 'Average Stock Level',
        'stockDistribution': 'Stock Distribution',
        'productInventoryDetails': 'Product Inventory Details',
        'noClientData': 'No client data to display',
        'clientsSummary': 'Clients Summary',
        'totalClients': 'Total Clients',
        'activeClients': 'Active Clients',
        'topClients': 'Top Clients',
        'clientName': 'Client Name',
        'totalPurchases': 'Total Purchases',
        'lastPurchase': 'Last Purchase',
        'noSupplierData': 'No supplier data to display',
        'suppliersSummary': 'Suppliers Summary',
        'totalSuppliers': 'Total Suppliers',
        'activeSuppliers': 'Active Suppliers',
        'topSuppliers': 'Top Suppliers',
        'supplierDetails': 'Supplier Details',
        'noLowStockData': 'No low stock items to display',
        'lowStockSummary': 'Low Stock Summary',
        'criticalItems': 'Critical Items',
        'warningItems': 'Warning Items',
        'outOfStockItems': 'Out of Stock Items',
        'stockLevel': 'Stock Level',
        'minStockLevel': 'Min Stock Level',
        'noFinancialData': 'No financial data to display',
        'financialSummary': 'Financial Summary',
        'totalIncome': 'Total Income',
        'totalExpenses': 'Total Expenses',
        'netProfit': 'Net Profit',
        'incomeVsExpenses': 'Income vs Expenses',
        'financialDetails': 'Financial Details',
        
        // Reports page - additional keys for tables and charts
        'salesChart': 'Sales Chart',
        'salesDetails': 'Sales Details',
        'unknownClient': 'Unknown Client',
        'amount': 'Amount',
        'completed': 'Completed',
        'pending': 'Pending',
        'cancelled': 'Cancelled',
        'inventoryDetails': 'Inventory Details',
        'stockStatus': 'Stock Status',
        'category': 'Category',
        'low': 'Low',
        'normal': 'Normal',
        'high': 'High',
        'inventoryValuation': 'Inventory Valuation',
        'clientDetails': 'Client Details',
        'contactInfo': 'Contact Info',
        'orderHistory': 'Order History',
        
        // Product page actions and notifications
        'productAddedSuccess': 'Product added successfully',
        'productUpdatedSuccess': 'Product updated successfully',
        'productDeletedSuccess': 'Product deleted successfully',
        'productAddFailed': 'Failed to add product',
        'productUpdateFailed': 'Failed to update product',
        'productDeleteFailed': 'Failed to delete product',
        'failedLoadProductDetails': 'Failed to load product details',
        'failedLoadSuppliers': 'Failed to load suppliers',
        'errorLoadingProducts': 'Error loading products. Please try again.',
        'none': 'None',
        
        // Additional sales page translations
        'view': 'View',
        'pdf': 'PDF',
        'stock': 'Stock',
        'noSalesFound': 'No sales found',
        'errorLoadingClients': 'Error loading clients',
        'errorLoadingProducts': 'Error loading products',
        'errorLoadingSales': 'Error loading sales',
        'saleCompletedSuccessfully': 'Sale completed successfully',
        'errorCreatingSale': 'Error creating sale',
        'saleDeleted': 'Sale has been deleted',
        'errorDeletingSale': 'Error deleting sale',
        'confirmDeleteSale': 'Are you sure you want to delete this sale?',
        'errorLoadingSaleDetails': 'Error loading sale details',
        'pleaseSelectClient': 'Please select a client',
        'pleaseAddItems': 'Please add items to the sale',
        'items': 'Items',
        'subtotal': 'Subtotal',
        
        // Delete confirmation dialog
        'confirmDeletePurchaseOrder': 'Are you sure you want to delete this purchase order?',
        'enterAdminPassword': 'Please enter admin password to confirm:',
        'adminPassword': 'Admin Password'
    },
    ru: {
        // Login page
        'login': 'Вход',
        'username': 'Имя пользователя',
        'password': 'Пароль',
        
        // Dashboard
        'dashboard': 'Панель управления',
        'totalProducts': 'Всего товаров',
        'lowStockItems': 'Товары с низким остатком',
        'activeSuppliers': 'Активные поставщики',
        'recentSales': 'Недавние продажи',
        'lowStockAlerts': 'Предупреждения о низком остатке',
        'viewAll': 'Показать все',
        
        // Navigation
        'products': 'Товары',
        'suppliers': 'Поставщики',
        'inventory': 'Инвентарь',
        'sales': 'Продажи',
        'clients': 'Клиенты',
        'purchaseOrders': 'Заказы на покупку',
        'reports': 'Отчеты',
        'logout': 'Выход',
        
        // User info
        'language': 'Язык',
        
        // Common actions
        'add': 'Добавить',
        'edit': 'Редактировать',
        'delete': 'Удалить',
        'save': 'Сохранить',
        'cancel': 'Отменить',
        'search': 'Поиск',
        'filter': 'Фильтр',
        'apply': 'Применить',
        'clear': 'Очистить',
        'confirm': 'Подтвердить',
        'back': 'Назад',
        'next': 'Вперед',
        'refresh': 'Обновить',
        'export': 'Экспортировать',
        'import': 'Импортировать',
        'print': 'Печать',
        'download': 'Скачать',
        'upload': 'Загрузить',
        'details': 'Детали',
        
        // Status and notifications
        'success': 'Успешно',
        'error': 'Ошибка',
        'warning': 'Предупреждение',
        'info': 'Информация',
        'loading': 'Загрузка',
        'noData': 'Данные не найдены',
        'confirmation': 'Подтверждение',
        'confirmDelete': 'Подтвердите удаление',
        
        // Common fields
        'id': 'ID',
        'name': 'Имя',
        'description': 'Описание',
        'price': 'Цена',
        'costPrice': 'Себестоимость',
        'status': 'Статус',
        'date': 'Дата',
        'notes': 'Заметки',
        'total': 'Всего',
        'amount': 'Сумма',
        'quantity': 'Количество',
        'type': 'Тип',
        'actions': 'Действия',
        
        // Products page
        'addProduct': 'Добавить товар',
        'editProduct': 'Редактировать товар',
        'productName': 'Название товара',
        'productDescription': 'Описание товара',
        'productPrice': 'Цена товара',
        'productCost': 'Себестоимость товара',
        'currentStock': 'Текущий остаток',
        'minLevel': 'Минимальный уровень',
        'supplier': 'Поставщик',
        'category': 'Категория',
        'searchProducts': 'Поиск товаров...',
        'deleteProductConfirm': 'Вы уверены, что хотите удалить этот товар?',
        
        // Suppliers page
        'addSupplier': 'Добавить поставщика',
        'editSupplier': 'Редактировать поставщика',
        'contactPerson': 'Контактная персона',
        'email': 'Электронная почта',
        'phone': 'Телефон',
        'address': 'Адрес',
        'paymentTerms': 'Условия оплаты',
        'searchSuppliers': 'Поиск поставщиков...',
        'deleteSupplierConfirm': 'Вы уверены, что хотите удалить этого поставщика?',

        // Reports
        'reportsTitle': 'Отчеты',
        'availableReports': 'Доступные отчеты',
        'salesReport': 'Отчет о продажах',
        'salesReportDesc': 'Отслеживайте метрики продаж за определенный период времени',
        'inventoryReport': 'Отчет об инвентаре',
        'inventoryReportDesc': 'Текущие уровни запасов и оценки',
        'clientReport': 'Отчет о клиенте',
        'clientReportDesc': 'Активность клиента и история покупок',
        'supplierReport': 'Отчет поставщика',
        'supplierReportDesc': 'Активность поставщика и история заказов',
        'lowStockReport': 'Отчет о низком остатке',
        'lowStockReportDesc': 'Товары с низким уровнем запасов',
        'financialReport': 'Финансовый отчет',
        'financialReportDesc': 'Доходы, расходы и прибыль',
        'reportResults': 'Результаты отчета',
        'exportPDF': 'Экспортировать в PDF',
        'reportFilters': 'Фильтры отчета',
        'salesReportFilters': 'Фильтры отчета о продажах',
        'inventoryReportFilters': 'Фильтры отчета об инвентаре',
        'clientsReport': 'Отчет о клиенте',
        'supplierReportFilters': 'Фильтры отчета поставщика',
        'lowStockReportFilters': 'Фильтры отчета о низком остатке',
        'financialReportFilters': 'Фильтры финансового отчета',
        'thisQuarter': 'Этот квартал',
        'thisYear': 'Этот год',
        'customRange': 'Пользовательский диапазон',
        'applyFilters': 'Применить фильтры',
        'clientFilter': 'Клиент',
        'statusFilter': 'Статус',
        'stockFilter': 'Уровень запасов',
        'allStockLevels': 'Все уровни запасов',
        'lowStock': 'Низкий остаток',
        'normalStock': 'Нормальный остаток',
        'highStock': 'Высокий остаток',
        'supplierFilter': 'Поставщик',
        'allSuppliers': 'Все поставщики',
        'allClients': 'Все клиенты',
        'severityFilter': 'Уровень критичности',
        'allLevels': 'Все уровни',
        'critical': 'Критический',
        'requireReplenishment': 'Требуется пополнение',
        'outOfStock': 'Отсутствует',
        'salesOverTime': 'Продажи во времени',
        'exportSection': 'Экспортировать раздел',
        'salesTrendVisualization': 'Satış trendi görselleştirmesi burada görünecek',
        'salesSummary': 'Satış özeti',
        'totalSales': 'Toplam satışlar',
        'totalRevenue': 'Toplam gelir',
        'averageSale': 'Ortalama satış',
        'exportFullReport': 'Tam raporu dışa aktar',
        'generated': 'Oluşturuldu',
        'dailyReport': 'Günlük rapor',
        'weeklyReport': 'Haftalık rapor',
        'monthlyReport': 'Aylık rapor',
        'annualReport': 'Yıllık rapor',
        'generateReport': 'Rapor oluştur',
        'exportReport': 'Raporu dışa aktar',
        'noSalesData': 'Seçilen dönem için satış verisi yok',
        
        // Inventory and additional
        'inventorySummary': 'Envanter özeti',
        'totalProducts': 'Toplam ürünler',
        'totalValue': 'Toplam değer',
        'averageStockLevel': 'Ortalama stok seviyesi',
        'stockDistribution': 'Stok dağılımı',
        'productInventoryDetails': 'Ürün envanter detayları',
        'noInventoryData': 'Gösterilecek envanter verisi yok',
        'clientsSummary': 'Müşteriler özeti',
        'totalClients': 'Toplam müşteriler',
        'activeClients': 'Aktif müşteriler',
        'topClients': 'En iyi müşteriler',
        'clientName': 'Müşteri adı',
        'totalPurchases': 'Toplam satın almalar',
        'lastPurchase': 'Son satın alma',
        'noClientData': 'Gösterilecek müşteri verisi yok',
        'suppliersSummary': 'Tedarikçiler özeti',
        'totalSuppliers': 'Toplam tedarikçiler',
        'topSuppliers': 'En iyi tedarikçiler',
        'supplierDetails': 'Tedarikçi detayları',
        'noSupplierData': 'Gösterilecek tedarikçi verisi yok',
        'lowStockSummary': 'Düşük stok özeti',
        'criticalItems': 'Kritik ürünler',
        'warningItems': 'Uyarı ürünleri',
        'outOfStockItems': 'Tükenmiş ürünler',
        'stockLevel': 'Stok seviyesi',
        'minStockLevel': 'Minimum stok seviyesi',
        'noLowStockData': 'Gösterilecek düşük stok ürünü yok',
        'financialSummary': 'Finansal özet',
        'totalIncome': 'Toplam gelir',
        'totalExpenses': 'Toplam giderler',
        'netProfit': 'Net kar',
        'incomeVsExpenses': 'Gelir ve giderler',
        'financialDetails': 'Finansal detaylar',
        'noFinancialData': 'Gösterilecek finansal veri yok',
        'salesChart': 'Satış grafiği',
        'salesDetails': 'Satış detayları',
        'unknownClient': 'Bilinmeyen müşteri',
        'completed': 'Tamamlandı',
        'pending': 'Beklemede',
        'cancelled': 'İptal edildi',
        'inventoryDetails': 'Envanter detayları',
        'stockStatus': 'Stok durumu',
        'low': 'Düşük',
        'normal': 'Normal',
        'high': 'Yüksek',
        'inventoryValuation': 'Envanter değerleme',
        'clientDetails': 'Müşteri detayları',
        'contactInfo': 'İletişim bilgisi',
        'orderHistory': 'Sipariş geçmişi',
        'errorLoadingReport': 'Rapor yükleme hatası',
        'unexpectedError': 'Beklenmeyen bir hata oluştu',
        'tryAgainLater': 'Lütfen daha sonra tekrar deneyin',
        'unknownReportType': 'Bilinmeyen rapor türü',
        
        // Product page actions and notifications
        'productAddedSuccess': 'Ürün başarıyla eklendi',
        'productUpdatedSuccess': 'Ürün başarıyla güncellendi',
        'productDeletedSuccess': 'Ürün başarıyla silindi',
        'productAddFailed': 'Ürün eklenemedi',
        'productUpdateFailed': 'Ürün güncellenemedi',
        'productDeleteFailed': 'Ürün silinemedi',
        'failedLoadProductDetails': 'Ürün detayları yüklenemedi',
        'failedLoadSuppliers': 'Tedarikçiler yüklenemedi',
        'errorLoadingProducts': 'Ürünler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.',
        'none': 'Yok',
        
        // Additional sales page translations
        'view': 'Görüntüle',
        'pdf': 'PDF',
        'stock': 'Stok',
        'noSalesFound': 'Satış bulunamadı',
        'errorLoadingClients': 'Müşterileri yükleme hatası',
        'errorLoadingProducts': 'Ürünleri yükleme hatası',
        'errorLoadingSales': 'Satışları yükleme hatası',
        'saleCompletedSuccessfully': 'Satış başarıyla tamamlandı',
        'errorCreatingSale': 'Satış oluşturma hatası',
        'saleDeleted': 'Satış silindi',
        'errorDeletingSale': 'Satış silme hatası',
        'confirmDeleteSale': 'Bu satışı silmek istediğinizden emin misiniz?',
        'errorLoadingSaleDetails': 'Satış detaylarını yükleme hatası',
        'pleaseSelectClient': 'Lütfen bir müşteri seçin',
        'pleaseAddItems': 'Lütfen satışa ürün ekleyin',
        'items': 'Ürünler',
        'subtotal': 'Ara toplam',
        
        // Sales page translations
        'salesManagement': 'Satış yönetimi',
        'newSale': 'Yeni satış',
        'salesList': 'Satış listesi',
        'searchSales': 'Satışları ara...',
        'allStatuses': 'Tüm durumlar',
        'id': 'ID',
        'client': 'Müşteri',
        'date': 'Tarih',
        'total': 'Toplam',
        'status': 'Durum',
        'actions': 'İşlemler',
        'completed': 'Tamamlandı',
        'pending': 'Beklemede',
        'cancelled': 'İptal edildi',
        'createNewSale': 'Yeni satış oluştur',
        'selectClient': 'Müşteri seçin',
        'addItems': 'Ürün ekle',
        'selectProduct': 'Ürün seçin',
        'add': 'Ekle',
        'saleSummary': 'Satış özeti',
        'completeSale': 'Satışı tamamla',
        'saleDetails': 'Satış detayları',
        'close': 'Kapat',
        
        // Inventory page
        'inventoryManagement': 'Envanter yönetimi',
        'addTransaction': 'İşlem ekle',
        'filterByType': 'Türe göre filtrele:',
        'allTransactions': 'Tüm işlemler',
        'purchases': 'Satın almalar',
        'purchase': 'Satın alma',
        'sale': 'Satış',
        'dateRange': 'Tarih aralığı:',
        'allTime': 'Tüm zamanlar',
        'today': 'Bugün',
        'thisWeek': 'Bu hafta',
        'thisMonth': 'Bu ay',
        'type': 'Tür',
        'product': 'Ürün',
        'quantity': 'Miktar',
        'unitPrice': 'Birim fiyat',
        'totalAmount': 'Toplam tutar',
        'notes': 'Notlar',
        'deleteTransactionConfirm': 'Bu işlemi silmek istediğinizden emin misiniz?',
        
        // Inventory notifications and errors
        'errorLoadingTransactions': 'İşlemleri yükleme hatası',
        'noTransactionsFound': 'İşlem bulunamadı',
        'errorAddingTransaction': 'İşlem ekleme hatası. Lütfen tekrar deneyin.',
        'transactionAddedSuccess': 'İşlem başarıyla eklendi',
        'errorDeletingTransaction': 'İşlem silme hatası. Lütfen tekrar deneyin.',
        'transactionDeletedSuccess': 'İşlem başarıyla silindi',
        'noProductsAvailable': 'Ürün mevcut değil',
        'selectProduct': 'Ürün seçin',
        
        // Delete confirmation dialog
        'confirmDeletePurchaseOrder': 'Bu satın alma siparişini silmek istediğinizden emin misiniz?',
        'enterAdminPassword': 'Onaylamak için yönetici şifresini girin:',
        'adminPassword': 'Yönetici şifresi'
    },
    tr: {
        // Login page
        'login': 'Giriş',
        'username': 'Kullanıcı adı',
        'password': 'Şifre',
        
        // Dashboard
        'dashboard': 'Kontrol paneli',
        'totalProducts': 'Toplam ürünler',
        'lowStockItems': 'Düşük stok ürünleri',
        'activeSuppliers': 'Aktif tedarikçiler',
        'recentSales': 'Son satışlar',
        'lowStockAlerts': 'Düşük stok uyarıları',
        'viewAll': 'Tümünü gör',
        
        // Navigation
        'products': 'Ürünler',
        'suppliers': 'Tedarikçiler',
        'inventory': 'Envanter',
        'sales': 'Satışlar',
        'clients': 'Müşteriler',
        'purchaseOrders': 'Satın alma siparişleri',
        'reports': 'Raporlar',
        'logout': 'Çıkış',
        
        // User info
        'language': 'Dil',
        
        // Common actions
        'add': 'Ekle',
        'edit': 'Düzenle',
        'delete': 'Sil',
        'save': 'Kaydet',
        'cancel': 'İptal',
        'search': 'Ara',
        'filter': 'Filtrele',
        'apply': 'Uygula',
        'clear': 'Temizle',
        'confirm': 'Onayla',
        'back': 'Geri',
        'next': 'İleri',
        'refresh': 'Yenile',
        'export': 'Dışa aktar',
        'import': 'İçe aktar',
        'print': 'Yazdır',
        'download': 'İndir',
        'upload': 'Yükle',
        'details': 'Detaylar',
        
        // Status and notifications
        'success': 'Başarılı',
        'error': 'Hata',
        'warning': 'Uyarı',
        'info': 'Bilgi',
        'loading': 'Yükleniyor',
        'noData': 'Veri bulunamadı',
        'confirmation': 'Onay',
        'confirmDelete': 'Silmeyi onaylayın',
        
        // Common fields
        'id': 'ID',
        'name': 'İsim',
        'description': 'Açıklama',
        'price': 'Fiyat',
        'costPrice': 'Maliyet fiyatı',
        'status': 'Durum',
        'date': 'Tarih',
        'notes': 'Notlar',
        'total': 'Toplam',
        'amount': 'Tutar',
        'quantity': 'Miktar',
        'type': 'Tür',
        'actions': 'İşlemler',
        
        // Products page
        'addProduct': 'Ürün ekle',
        'editProduct': 'Ürünü düzenle',
        'productName': 'Ürün adı',
        'productDescription': 'Ürün açıklaması',
        'productPrice': 'Ürün fiyatı',
        'productCost': 'Maliyet fiyatı',
        'currentStock': 'Mevcut stok',
        'minLevel': 'Minimum seviye',
        'supplier': 'Tedarikçi',
        'category': 'Kategori',
        'searchProducts': 'Ürünleri ara...',
        'deleteProductConfirm': 'Bu ürünü silmek istediğinizden emin misiniz?',
        
        // Suppliers page
        'addSupplier': 'Tedarikçi ekle',
        'editSupplier': 'Tedarikçiyi düzenle',
        'contactPerson': 'İletişim kişisi',
        'email': 'E-posta',
        'phone': 'Telefon',
        'address': 'Adres',
        'paymentTerms': 'Ödeme koşulları',
        'searchSuppliers': 'Tedarikçileri ara...',
        'deleteSupplierConfirm': 'Bu tedarikçiyi silmek istediğinizden emin misiniz?',

        // Reports
        'reportsTitle': 'Raporlar',
        'availableReports': 'Mevcut raporlar',
        'salesReport': 'Satış raporu',
        'salesReportDesc': 'Belirli bir süre boyunca satış metriklerini izleyin',
        'inventoryReport': 'Envanter raporu',
        'inventoryReportDesc': 'Mevcut envanter seviyeleri ve değerleme',
        'clientReport': 'Müşteri raporu',
        'clientReportDesc': 'Müşteri aktivitesi ve satın alma geçmişi',
        'supplierReport': 'Tedarikçi raporu',
        'supplierReportDesc': 'Tedarikçi aktivitesi ve sipariş geçmişi',
        'lowStockReport': 'Düşük stok raporu',
        'lowStockReportDesc': 'Stok seviyesi düşük olan ürünler',
        'financialReport': 'Finansal rapor',
        'financialReportDesc': 'Gelirler, giderler ve kâr',
        'reportResults': 'Rapor sonuçları',
        'exportPDF': 'PDF olarak dışa aktar',
        'reportFilters': 'Rapor filtreleri',
        'salesReportFilters': 'Satış raporu filtreleri',
        'inventoryReportFilters': 'Envanter raporu filtreleri',
        'clientsReport': 'Müşteri raporu',
        'supplierReportFilters': 'Tedarikçi raporu filtreleri',
        'lowStockReportFilters': 'Düşük stok raporu filtreleri',
        'financialReportFilters': 'Finansal rapor filtreleri',
        'thisQuarter': 'Bu çeyrek',
        'thisYear': 'Bu yıl',
        'customRange': 'Özel aralık',
        'applyFilters': 'Filtreleri uygula',
        'clientFilter': 'Müşteri',
        'statusFilter': 'Durum',
        'stockFilter': 'Stok seviyesi',
        'allStockLevels': 'Tüm stok seviyeleri',
        'lowStock': 'Düşük stok',
        'normalStock': 'Normal stok',
        'highStock': 'Yüksek stok',
        'supplierFilter': 'Tedarikçi',
        'allSuppliers': 'Tüm tedarikçiler',
        'allClients': 'Tüm müşteriler',
        'severityFilter': 'Kritiklik seviyesi',
        'allLevels': 'Tüm seviyeler',
        'critical': 'Kritik',
        'requireReplenishment': 'Yenileme gerekli',
        'outOfStock': 'Tükendi',
        'salesOverTime': 'Zaman içinde satışlar',
        'exportSection': 'Bölümü dışa aktar',
        'salesTrendVisualization': 'Satış trendi görselleştirmesi burada görünecek',
        'salesSummary': 'Satış özeti',
        'totalSales': 'Toplam satışlar',
        'totalRevenue': 'Toplam gelir',
        'averageSale': 'Ortalama satış',
        'exportFullReport': 'Tam raporu dışa aktar',
        'generated': 'Oluşturuldu',
        'dailyReport': 'Günlük rapor',
        'weeklyReport': 'Haftalık rapor',
        'monthlyReport': 'Aylık rapor',
        'annualReport': 'Yıllık rapor',
        'generateReport': 'Rapor oluştur',
        'exportReport': 'Raporu dışa aktar',
        'noSalesData': 'Seçilen dönem için satış verisi yok',
        
        // Inventory and additional
        'inventorySummary': 'Envanter özeti',
        'totalProducts': 'Toplam ürünler',
        'totalValue': 'Toplam değer',
        'averageStockLevel': 'Ortalama stok seviyesi',
        'stockDistribution': 'Stok dağılımı',
        'productInventoryDetails': 'Ürün envanter detayları',
        'noInventoryData': 'Gösterilecek envanter verisi yok',
        'clientsSummary': 'Müşteriler özeti',
        'totalClients': 'Toplam müşteriler',
        'activeClients': 'Aktif müşteriler',
        'topClients': 'En iyi müşteriler',
        'clientName': 'Müşteri adı',
        'totalPurchases': 'Toplam satın almalar',
        'lastPurchase': 'Son satın alma',
        'noClientData': 'Gösterilecek müşteri verisi yok',
        'suppliersSummary': 'Tedarikçiler özeti',
        'totalSuppliers': 'Toplam tedarikçiler',
        'topSuppliers': 'En iyi tedarikçiler',
        'supplierDetails': 'Tedarikçi detayları',
        'noSupplierData': 'Gösterilecek tedarikçi verisi yok',
        'lowStockSummary': 'Düşük stok özeti',
        'criticalItems': 'Kritik ürünler',
        'warningItems': 'Uyarı ürünleri',
        'outOfStockItems': 'Tükenmiş ürünler',
        'stockLevel': 'Stok seviyesi',
        'minStockLevel': 'Minimum stok seviyesi',
        'noLowStockData': 'Gösterilecek düşük stok ürünü yok',
        'financialSummary': 'Finansal özet',
        'totalIncome': 'Toplam gelir',
        'totalExpenses': 'Toplam giderler',
        'netProfit': 'Net kar',
        'incomeVsExpenses': 'Gelir ve giderler',
        'financialDetails': 'Finansal detaylar',
        'noFinancialData': 'Gösterilecek finansal veri yok',
        'salesChart': 'Satış grafiği',
        'salesDetails': 'Satış detayları',
        'unknownClient': 'Bilinmeyen müşteri',
        'completed': 'Tamamlandı',
        'pending': 'Beklemede',
        'cancelled': 'İptal edildi',
        'inventoryDetails': 'Envanter detayları',
        'stockStatus': 'Stok durumu',
        'low': 'Düşük',
        'normal': 'Normal',
        'high': 'Yüksek',
        'inventoryValuation': 'Envanter değerleme',
        'clientDetails': 'Müşteri detayları',
        'contactInfo': 'İletişim bilgisi',
        'orderHistory': 'Sipariş geçmişi',
        'errorLoadingReport': 'Rapor yükleme hatası',
        'unexpectedError': 'Beklenmeyen bir hata oluştu',
        'tryAgainLater': 'Lütfen daha sonra tekrar deneyin',
        'unknownReportType': 'Bilinmeyen rapor türü',
        
        // Product page actions and notifications
        'productAddedSuccess': 'Ürün başarıyla eklendi',
        'productUpdatedSuccess': 'Ürün başarıyla güncellendi',
        'productDeletedSuccess': 'Ürün başarıyla silindi',
        'productAddFailed': 'Ürün eklenemedi',
        'productUpdateFailed': 'Ürün güncellenemedi',
        'productDeleteFailed': 'Ürün silinemedi',
        'failedLoadProductDetails': 'Ürün detayları yüklenemedi',
        'failedLoadSuppliers': 'Tedarikçiler yüklenemedi',
        'errorLoadingProducts': 'Ürünler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.',
        'none': 'Yok',
        
        // Additional sales page translations
        'view': 'Görüntüle',
        'pdf': 'PDF',
        'stock': 'Stok',
        'noSalesFound': 'Satış bulunamadı',
        'errorLoadingClients': 'Müşterileri yükleme hatası',
        'errorLoadingProducts': 'Ürünleri yükleme hatası',
        'errorLoadingSales': 'Satışları yükleme hatası',
        'saleCompletedSuccessfully': 'Satış başarıyla tamamlandı',
        'errorCreatingSale': 'Satış oluşturma hatası',
        'saleDeleted': 'Satış silindi',
        'errorDeletingSale': 'Satış silme hatası',
        'confirmDeleteSale': 'Bu satışı silmek istediğinizden emin misiniz?',
        'errorLoadingSaleDetails': 'Satış detaylarını yükleme hatası',
        'pleaseSelectClient': 'Lütfen bir müşteri seçin',
        'pleaseAddItems': 'Lütfen satışa ürün ekleyin',
        'items': 'Ürünler',
        'subtotal': 'Ara toplam',
        
        // Sales page translations
        'salesManagement': 'Satış yönetimi',
        'newSale': 'Yeni satış',
        'salesList': 'Satış listesi',
        'searchSales': 'Satışları ara...',
        'allStatuses': 'Tüm durumlar',
        'id': 'ID',
        'client': 'Müşteri',
        'date': 'Tarih',
        'total': 'Toplam',
        'status': 'Durum',
        'actions': 'İşlemler',
        'completed': 'Tamamlandı',
        'pending': 'Beklemede',
        'cancelled': 'İptal edildi',
        'createNewSale': 'Yeni satış oluştur',
        'selectClient': 'Müşteri seçin',
        'addItems': 'Ürün ekle',
        'selectProduct': 'Ürün seçin',
        'add': 'Ekle',
        'saleSummary': 'Satış özeti',
        'completeSale': 'Satışı tamamla',
        'saleDetails': 'Satış detayları',
        'close': 'Kapat',
        
        // Inventory page
        'inventoryManagement': 'Envanter yönetimi',
        'addTransaction': 'İşlem ekle',
        'filterByType': 'Türe göre filtrele:',
        'allTransactions': 'Tüm işlemler',
        'purchases': 'Satın almalar',
        'purchase': 'Satın alma',
        'sale': 'Satış',
        'dateRange': 'Tarih aralığı:',
        'allTime': 'Tüm zamanlar',
        'today': 'Bugün',
        'thisWeek': 'Bu hafta',
        'thisMonth': 'Bu ay',
        'type': 'Tür',
        'product': 'Ürün',
        'quantity': 'Miktar',
        'unitPrice': 'Birim fiyat',
        'totalAmount': 'Toplam tutar',
        'notes': 'Notlar',
        'deleteTransactionConfirm': 'Bu işlemi silmek istediğinizden emin misiniz?',
        
        // Inventory notifications and errors
        'errorLoadingTransactions': 'İşlemleri yükleme hatası',
        'noTransactionsFound': 'İşlem bulunamadı',
        'errorAddingTransaction': 'İşlem ekleme hatası. Lütfen tekrar deneyin.',
        'transactionAddedSuccess': 'İşlem başarıyla eklendi',
        'errorDeletingTransaction': 'İşlem silme hatası. Lütfen tekrar deneyin.',
        'transactionDeletedSuccess': 'İşlem başarıyla silindi',
        'noProductsAvailable': 'Ürün mevcut değil',
        'selectProduct': 'Ürün seçin',
        
        // Delete confirmation dialog
        'confirmDeletePurchaseOrder': 'Bu satın alma siparişini silmek istediğinizden emin misiniz?',
        'enterAdminPassword': 'Onaylamak için yönetici şifresini girin:',
        'adminPassword': 'Yönetici şifresi'
    }
};

// Initialize language system
function initLanguage() {
    // Set html lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Special handling for login page
    const isLoginPage = window.location.pathname.includes('index.html') || 
                        window.location.pathname.endsWith('/') ||
                        window.location.pathname.endsWith('/public/');
    
    // Проверяем, существует ли элемент .user-info
    if (!document.querySelector('.user-info') && !isLoginPage) {
        // Создаем элемент .user-info если его нет
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info';
        
        // Добавляем его в .main-header
        const mainHeader = document.querySelector('.main-header');
        if (mainHeader) {
            // Добавляем стили для контейнера
            userInfo.style.display = 'flex';
            userInfo.style.alignItems = 'center';
            userInfo.style.marginLeft = 'auto';
            
            mainHeader.appendChild(userInfo);
            console.log('Created .user-info element in .main-header');
        } else {
            // Если нет .main-header, добавляем в начало body
            document.body.insertBefore(userInfo, document.body.firstChild);
            console.log('Created .user-info element in body');
        }
    }
    
    // Create language selector if it doesn't already exist
    if (!document.querySelector('.language-selector')) {
        createLanguageSelector(isLoginPage);
    }
    
    // Apply current language translations
    // Предотвращаем рекурсию для страницы отчетов, так как там своя функция applyTranslations
    const isReportsPage = window.location.pathname.includes('reports.html');
    if (!isReportsPage) {
        applyTranslations();
    }
    
    // Listen for language change events, если еще не создан слушатель
    if (!window._languageChangeListenerAdded) {
        document.addEventListener('languageChanged', function() {
            // Update html lang attribute
            document.documentElement.lang = currentLanguage;
            
            if (!isReportsPage) {
                applyTranslations();
            }
        });
        window._languageChangeListenerAdded = true;
    }
}

// Create language selector UI
function createLanguageSelector(isLoginPage = false) {
    const container = document.createElement('div');
    container.className = 'language-selector';
    
    // Добавляем метку для селектора языка
    const label = document.createElement('span');
    label.textContent = translations[currentLanguage]?.language || 'Language:';
    label.className = 'language-label';
    container.appendChild(label);
    
    const select = document.createElement('select');
    select.id = 'language-selector';
    
    Object.keys(languages).forEach(langCode => {
        const option = document.createElement('option');
        option.value = langCode;
        option.textContent = languages[langCode].name;
        if (langCode === currentLanguage) {
            option.selected = true;
        }
        select.appendChild(option);
    });
    
    // Add change event listener
    select.addEventListener('change', function() {
        const selectedLang = this.value;
        changeLanguage(selectedLang);
    });
    
    container.appendChild(select);
    
    // Добавляем стили для селектора языка
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.marginLeft = '20px';
    
    label.style.marginRight = '10px';
    label.style.fontSize = '14px';
    
    select.style.padding = '5px';
    select.style.borderRadius = '4px';
    select.style.border = '1px solid #ccc';
    
    // Add to the DOM
    if (isLoginPage) {
        const loginForm = document.querySelector('.login-form');
        if (loginForm) {
            loginForm.parentNode.insertBefore(container, loginForm);
        }
    } else {
        // Сначала пытаемся найти .user-info
        const userInfo = document.querySelector('.user-info');
        if (userInfo) {
            userInfo.appendChild(container);
        } else {
            // Если .user-info не найден, пробуем добавить в заголовок страницы
            const mainHeader = document.querySelector('.main-header');
            if (mainHeader) {
                // Добавляем стили для отображения в main-header
                container.style.marginLeft = 'auto';
                mainHeader.appendChild(container);
            } else {
                // Если и main-header не найден, добавляем в body
                document.body.appendChild(container);
            }
        }
    }
    
    return container;
}

// Change language
function changeLanguage(langCode) {
    if (languages[langCode]) {
        // Сохраняем предыдущий язык
        const previousLanguage = currentLanguage;
        
        // Обновляем текущий язык
        currentLanguage = langCode;
        localStorage.setItem('erp_language', langCode);
        localStorage.setItem('language', langCode); // Для совместимости
        
        // Обновляем глобальные переменные
        if (window.currentLanguage !== undefined) {
            window.currentLanguage = langCode;
        }
        
        // Обновляем селектор языка, если он существует
        const langSelector = document.getElementById('language-selector');
        if (langSelector) {
            langSelector.value = langCode;
        }
        
        // Применяем переводы перед диспетчеризацией события
        // для страниц, которые не используют событие languageChanged
        applyTranslations();
        
        // Диспетчеризуем событие изменения языка
        const event = new CustomEvent('languageChanged', { 
            detail: { language: langCode, previousLanguage: previousLanguage }
        });
        document.dispatchEvent(event);
        
        console.log(`Язык изменен на ${languages[langCode].name}`);
        
        // Показываем уведомление
        if (typeof showNotification === 'function') {
            const message = (langCode === 'en') ? 'Language changed to English' : 
                         (langCode === 'ru') ? 'Язык изменен на Русский' : 
                         (langCode === 'tr') ? 'Dil Türkçe diline değiştirildi' : 
                         'Language changed';
            showNotification(message, 'info');
        }
        
        // Форсируем обновление страницы для полного обновления всех элементов
        // Это крайняя мера, если проблемы с локализацией сохраняются
        // window.location.reload();
        
        return true;
    }
    
    return false;
}

// Apply translations to the current page
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            // Different handling based on element type
            if (element.hasAttribute('data-i18n-placeholder')) {
                // Element is using placeholder
                element.placeholder = translations[currentLanguage][key];
            } else if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'search')) {
                // Input fields that should use placeholder
                if (element.placeholder) {
                    element.placeholder = translations[currentLanguage][key];
                } else {
                    element.textContent = translations[currentLanguage][key];
                }
            } else if (element.tagName === 'OPTION') {
                // Handle select options
                element.textContent = translations[currentLanguage][key];
                // If option has a title attribute, translate that too
                if (element.title) {
                    element.title = translations[currentLanguage][key];
                }
            } else if (element.tagName === 'TH') {
                // Table headers - explicitly set text content
                element.textContent = translations[currentLanguage][key];
            } else {
                // Default case: replace text content
                element.textContent = translations[currentLanguage][key];
            }
            
            // Also translate title attribute if it exists
            if (element.hasAttribute('title')) {
                element.title = translations[currentLanguage][key];
            }
        }
    });
    
    // Also update the document title if needed
    const pageTitle = document.title;
    if (pageTitle.includes(' - ')) {
        const pageName = pageTitle.split(' - ')[1];
        const translatedPageName = translations[currentLanguage][pageName.toLowerCase()];
        if (translatedPageName) {
            document.title = 'ERP System - ' + translatedPageName;
        }
    }
    
    // Trigger a custom event after translations are applied
    const event = new CustomEvent('translationsApplied', { 
        detail: { language: currentLanguage }
    });
    document.dispatchEvent(event);
}

// Get translation for a specific key
function getTranslation(key) {
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
        return translations[currentLanguage][key];
    }
    return key; // Fallback to key if translation not found
}

// Инициализация модуля языка
document.addEventListener('DOMContentLoaded', function() {
    // Проверка URL на наличие параметра language
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    // Если параметр lang найден и он в списке доступных языков, устанавливаем его
    if (langParam && languages[langParam]) {
        changeLanguage(langParam);
    } else {
        // Иначе используем сохраненный язык или язык по умолчанию
        initLanguage();
    }
    
    // Создаем селектор языка, если его еще нет на странице
    const existingSelector = document.getElementById('language-selector');
    if (!existingSelector) {
        const isLoginPage = document.querySelector('.login-form') !== null;
        createLanguageSelector(isLoginPage);
    }
    
    // Применяем переводы
    applyTranslations();
});

// Функция форматирования валюты - всегда в долларах
function formatCurrency(amount) {
    // Всегда форматируем в долларах, независимо от языка
    return `$${amount.toFixed(2)}`;
}

// Export functions for use in other files
window.erpLanguage = {
    init: initLanguage,
    change: changeLanguage,
    translate: getTranslation,
    current: () => currentLanguage,
    formatCurrency: formatCurrency
}; 