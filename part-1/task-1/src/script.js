// Monthly Expense Tracker - ES2024
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const categoryInput = document.getElementById('category');
    const amountInput = document.getElementById('amount');
    const addButton = document.getElementById('add-btn');
    const calculateButton = document.getElementById('calculate-btn');
    const expensesBody = document.getElementById('expenses-body');
    const emptyTableMessage = document.getElementById('empty-table-message');
    const expensesTable = document.getElementById('expenses-table');
    const resultsContainer = document.getElementById('results-container');
    const totalAmountElement = document.getElementById('total-amount');
    const averageExpenseElement = document.getElementById('average-expense');
    const topExpensesList = document.getElementById('top-expenses');

    // State
    let expenses = [];

    // Event Listeners
    addButton.addEventListener('click', handleAddExpense);
    calculateButton.addEventListener('click', calculateAndDisplayMetrics);

    // Form validation on enter key
    document.querySelector('.expense-form').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddExpense();
        }
    });

    // Initialize UI state
    updateTableState();

    /**
     * Handle adding a new expense
     */
    function handleAddExpense() {
        const category = categoryInput.value.trim();
        const amount = parseFloat(amountInput.value);

        if (!category) {
            alert('Please enter a category');
            categoryInput.focus();
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            amountInput.focus();
            return;
        }

        // Add new expense
        addExpense(category, amount);

        // Clear inputs
        categoryInput.value = '';
        amountInput.value = '';
        categoryInput.focus();
    }

    /**
     * Add expense to the tracker and update UI
     * @param {string} category - Expense category
     * @param {number} amount - Expense amount
     */
    function addExpense(category, amount) {
        // Add to expenses array
        expenses.push({ category, amount });

        // Update the UI
        renderExpenses();
        updateTableState();
    }

    /**
     * Render expenses in the table
     */
    function renderExpenses() {
        // Clear the table
        expensesBody.innerHTML = '';

        // Add each expense to the table
        expenses.forEach(expense => {
            const row = document.createElement('tr');

            const categoryCell = document.createElement('td');
            categoryCell.textContent = expense.category;

            const amountCell = document.createElement('td');
            amountCell.textContent = formatCurrency(expense.amount);

            row.appendChild(categoryCell);
            row.appendChild(amountCell);

            expensesBody.appendChild(row);
        });
    }

    /**
     * Update table state based on whether expenses exist
     */
    function updateTableState() {
        const hasExpenses = expenses.length > 0;

        // Toggle empty table message visibility
        emptyTableMessage.style.display = hasExpenses ? 'none' : 'block';
        expensesTable.style.display = hasExpenses ? 'table' : 'none';

        // Toggle calculate button state
        calculateButton.disabled = !hasExpenses;
    }

    /**
     * Calculate and display expense metrics
     */
    function calculateAndDisplayMetrics() {
        if (expenses.length === 0) return;

        // Show results container if it's hidden
        resultsContainer.style.display = 'block';

        // Calculate total amount
        const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmountElement.textContent = formatCurrency(totalAmount);

        // Calculate average daily expense (30 days in a month)
        const averageDaily = totalAmount / 30;
        averageExpenseElement.textContent = formatCurrency(averageDaily);

        // Get top 3 expenses
        const topExpenses = [...expenses]
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 3);

        // Display top expenses
        topExpensesList.innerHTML = '';
        topExpenses.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `${expense.category}: ${formatCurrency(expense.amount)}`;
            topExpensesList.appendChild(li);
        });
    }

    /**
     * Format number as currency
     * @param {number} amount - The amount to format
     * @returns {string} - Formatted currency string
     */
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    }
});
