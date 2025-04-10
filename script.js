// Utility function to show notifications
function showNotification(message, type = 'success') {
    const notificationDiv = document.getElementById('formNotification');
    notificationDiv.innerHTML = message;
    notificationDiv.className = `notification-${type}`;
    notificationDiv.style.display = 'block';

    setTimeout(() => {
        notificationDiv.style.display = 'none';
    }, 3000); // Hide after 3 seconds
}

// Function to validate the expense form
function validateForm() {
    const amountInput = document.getElementById('amount');
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        amountInput.classList.add('is-invalid');
        return false;
    } else {
        amountInput.classList.remove('is-invalid');
        return true;
    }
}

// Function to calculate expenses and update the report
function updateExpenseReport() {
    let expenses = JSON.parse(localStorage.getItem('expenses') || '[]');

    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;

    // Category-wise breakdown
    const categoryBreakdown = expenses.reduce((acc, expense) => {
        const category = expense.category;
        acc[category] = (acc[category] || 0) + parseFloat(expense.amount);
        return acc;
    }, {});

    const categoryBreakdownList = document.getElementById('categoryBreakdown');
    categoryBreakdownList.innerHTML = ''; // Clear existing list
    for (const category in categoryBreakdown) {
        const listItem = document.createElement('li');
        listItem.textContent = `${category}: $${categoryBreakdown[category].toFixed(2)}`;
        categoryBreakdownList.appendChild(listItem);
    }

    // Percentage breakdown
    const percentageBreakdownList = document.getElementById('percentageBreakdown');
    percentageBreakdownList.innerHTML = ''; // Clear existing list
    for (const category in categoryBreakdown) {
        const percentage = (categoryBreakdown[category] / totalExpenses) * 100 || 0;
        const listItem = document.createElement('li');
        listItem.textContent = `${category}: ${percentage.toFixed(2)}%`;
        percentageBreakdownList.appendChild(listItem);
    }

    // Find highest and lowest spending categories
    let highestCategory = 'N/A';
    let highestAmount = 0;
    let lowestCategory = 'N/A';
    let lowestAmount = Infinity;

    for (const category in categoryBreakdown) {
        if (categoryBreakdown[category] > highestAmount) {
            highestAmount = categoryBreakdown[category];
            highestCategory = category;
        }
        if (categoryBreakdown[category] < lowestAmount) {
            lowestAmount = categoryBreakdown[category];
            lowestCategory = category;
        }
    }

    document.getElementById('highestCategory').textContent = highestCategory;
    document.getElementById('highestAmount').textContent = `$${highestAmount.toFixed(2)}`;
    document.getElementById('lowestCategory').textContent = lowestCategory;
    document.getElementById('lowestAmount').textContent = `$${lowestAmount.toFixed(2)}`;
}

// Function to add an expense
function addExpense(event) {
    event.preventDefault(); // Prevent form submission

    if (!validateForm()) {
        return;
    }

    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;

    const expense = {
        category,
        amount,
        date
    };

    // Get existing expenses from localStorage or initialize an empty array
    let expenses = JSON.parse(localStorage.getItem('expenses') || '[]');

    // Add the new expense to the array
    expenses.push(expense);

    // Save the updated expenses array back to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Update the expense report
    updateExpenseReport();

    // Clear the form
    document.getElementById('expenseForm').reset();

    showNotification('Expense added successfully!', 'success');
}

// Function to clear all data
function clearAllData() {
    localStorage.removeItem('expenses');
    updateExpenseReport();
    showNotification('All data cleared!', 'success');
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const element = document.body;
    element.classList.toggle("dark-mode");

    const darkModeButton = document.getElementById('darkModeToggle');
    const isDarkMode = document.body.classList.contains('dark-mode');
    darkModeButton.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i> Light Mode' : '<i class="fas fa-moon"></i> Dark Mode';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load expenses from localStorage on page load
    updateExpenseReport();

    // Form submission
    const expenseForm = document.getElementById('expenseForm');
    expenseForm.addEventListener('submit', addExpense);

    // Clear all data
    const clearAllButton = document.getElementById('clearAll');
    clearAllButton.addEventListener('click', clearAllData);

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', toggleDarkMode);
});