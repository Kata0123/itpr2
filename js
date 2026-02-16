let expenses = [];

function addExpense(title, amount, category) {
    if (!title || typeof amount !== 'number' || amount <= 0 || !category) return null;

    const newExpense = {
        id: Date.now(),
        title,
        amount,
        category
    };
    expenses.push(newExpense);
    return newExpense;
}

function printAllExpenses() {
    console.log('\n ВСЕ РАСХОДЫ');
    if (expenses.length === 0) {
        console.log('Расходов нет');
        return;
    }
    expenses.forEach(e => {
        console.log(`${e.id} | ${e.title} | ${e.amount}₽ | ${e.category}`);
    });
}

function getTotalAmount() {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    console.log(`\n ОБЩИЙ БАЛАНС`);
    console.log(`Всего потрачено: ${total}₽`);
    return total;
}

function getExpensesByCategory(category) {
    const filtered = expenses.filter(e => e.category === category);
    const total = filtered.reduce((sum, e) => sum + e.amount, 0);

    console.log(`\n КАТЕГОРИЯ: ${category}`);
    console.log(`Найдено: ${filtered.length} операций`);
    console.log(`Потрачено: ${total}₽`);

    filtered.forEach(e => console.log(`  ${e.title} - ${e.amount}₽`));
    return filtered;
}

function findExpenseByTitle(searchString) {
    const result = expenses.find(e =>
        e.title.toLowerCase().includes(searchString.toLowerCase())
    );

    if (result) {
        console.log(`\n НАЙДЕНО`);
        console.log(`${result.title} - ${result.amount}₽ (${result.category})`);
        console.log(`Добавить комментарий: "${result.title}" - важная трата!`);
    } else {
        console.log(`Ничего не найдено по запросу "${searchString}"`);
    }

    return result;
}

const expenseTracker = {
    expenses: expenses,

    addExpense(title, amount, category) {
        return addExpense(title, amount, category);
    },

    printAll() {
        printAllExpenses();
    },

    getTotalAmount() {
        return getTotalAmount();
    },

    getExpensesByCategory(category) {
        return getExpensesByCategory(category);
    },

    findExpenseByTitle(search) {
        return findExpenseByTitle(search);
    },

    deleteExpenseById(id) {
        const index = this.expenses.findIndex(e => e.id === id);
        if (index !== -1) {
            const deleted = this.expenses[index];
            this.expenses.splice(index, 1);
            console.log(`${deleted.title} - ${deleted.amount}₽ (id: ${id})`);
            return true;
        }
        console.log(`Расход с id ${id} не найден`);
        return false;
    },

    getCategoryStats() {
        const stats = {};
        this.expenses.forEach(e => {
            stats[e.category] = (stats[e.category] || 0) + e.amount;
        });

        console.log('\n СТАТИСТИКА ПО КАТЕГОРИЯМ');
        Object.entries(stats).forEach(([cat, sum]) => {
            console.log(`${cat}: ${sum}₽`);
        });
        return stats;
    },

    validateInput(title, amount, category) {
        const isValid = title && typeof amount === 'number' && amount > 0 && category;
        if (!isValid) {
            console.log('Ошибка: некорректный ввод');
        }
        return isValid;
    }
};

expenseTracker.addExpense('Кофе', 300, 'Еда');
expenseTracker.addExpense('Обед', 500, 'Еда');
expenseTracker.addExpense('Такси', 400, 'Транспорт');
expenseTracker.addExpense('Кино', 800, 'Развлечения');

expenseTracker.printAll();
expenseTracker.getTotalAmount();
expenseTracker.getExpensesByCategory('Еда');
expenseTracker.findExpenseByTitle('Кофе');
expenseTracker.getCategoryStats();
expenseTracker.deleteExpenseById(expenses[0].id);
expenseTracker.printAll();
