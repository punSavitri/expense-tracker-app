console.log("testing..");
document.addEventListener("DOMContentLoaded", () => {
  //read the references to form, table body, display total amount and dropdown category filter
  const expenseForm = document.getElementById("expense-form");
  const transactionHistory = document.getElementById("transaction-history");
  const totalAmount = document.getElementById("total-amount");
  const filterCategory = document.getElementById("filter-category");

  //array to store all expenses objects
  let expenses = [];

  //handle form submission/adding a new expenses
  expenseForm.addEventListener("submit", (e) => {
    //prevent page reload on form submission
    e.preventDefault();

    //read input values from the form
    const date = document.getElementById("expense-date").value;
    const name = document.getElementById("expense-name").value;
    const amount = document.getElementById("expense-amount").value;
    const category = document.getElementById("expense-category").value;
    //console.log(date, name, amount, category);

    //create a new expense object with a new unique ID
    const expense = {
      id: Date.now(),
      date,
      name,
      amount,
      category,
    };

    //add the new expense to the array
    expenses.push(expense);

    //update UI with the new list of expenses
    displayExpenses(expenses);
    //recalculate and update the total amount
    updateTotalAmount();
    //clear the input fields
    expenseForm.reset();
  });

  //render the list of expenses inside the table
  function displayExpenses(expenses) {
    //clear the existing rows
    transactionHistory.innerHTML = "";
    expenses.forEach((expense) => {
      //create a new table row inside table body
      const row = document.createElement("tr");
      row.innerHTML = `<td>${expense.date}</td><td>${expense.name}</td><td>£${Number(expense.amount).toFixed(2)}</td><td>${expense.category}</td><td><button class="edit-btn" data-id=${expense.id}><i class="fas fa-edit" style="border:3px solid green; color:green;"></i></button><button class="delete-btn"   data-id="${expense.id}"><i class="fas fa-trash" style="border:3px solid red; color:red;"></i></button></td>`;
      transactionHistory.appendChild(row);
    });
  }

  //update the total amount of expenses
  function updateTotalAmount(list = expenses) {
    const total = list.reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0,
    );

    totalAmount.textContent = total.toFixed(2);
  }

  transactionHistory.addEventListener("click", (e) => {
    //Edit button logic inside the transaction history table
    const editBtn = e.target.closest(".edit-btn");
    if (editBtn) {
      const id = parseInt(editBtn.dataset.id);
      const expense = expenses.find((expense) => expense.id === id);
      document.getElementById("expense-date").value = expense.date;
      document.getElementById("expense-name").value = expense.name;
      document.getElementById("expense-amount").value = expense.amount;
      document.getElementById("expense-category").value = expense.category;
      expenses = expenses.filter((expense) => expense.id !== id);
      displayExpenses(expenses);
      updateTotalAmount();
      return;
    }
    //delet button logic inside the transaction history table
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) {
      const id = parseInt(deleteBtn.dataset.id);
      expenses = expenses.filter((expense) => expense.id !== id);
      displayExpenses(expenses);
      updateTotalAmount();
    }
  });
});
