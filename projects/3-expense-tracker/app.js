let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const nameInput = document.getElementById("item-name");
const costInput = document.getElementById("item-cost");
const addBtn = document.getElementById("add-btn");
const expenseList = document.getElementById("expense-list");
const totalCostEl = document.getElementById("total-cost");

function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  render();
}

function render() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    
    li.innerHTML = `
      <span>${expense.name}</span>
      <span>Rs. ${expense.cost} 
        <button class="delete-btn" onclick="deleteExpense(${index})">✕</button>
      </span>
    `;
    
    expenseList.appendChild(li);
    total += expense.cost;
  });

  totalCostEl.textContent = total;
}

window.deleteExpense = (index) => {
  expenses.splice(index, 1);
  saveAndRender();
};

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const cost = Number(costInput.value);

  if (!name || cost <= 0) {
    alert("Please fill in valid name and cost!");
    return;
  }

  expenses.push({ name, cost });
  saveAndRender();

  nameInput.value = "";
  costInput.value = "";
});

// Render initial items
render();
