import React, { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";


const starterExpenses = [
    {
        id: "e1",
        title: "Car insurance",
        amount: 297.52,
        date: new Date()
    },
    {
        id: "e2",
        title: "Grocery",
        amount: 98.25,
        date: new Date()
    }
];

function App() {
    const [expenses, setExpenses] = useState(starterExpenses);

    function addExpenseHandler(expense) {
        setExpenses((prevExpenses) => {
            return [expense, ...prevExpenses];
        });
    }

    return (
        <div>
            <NewExpense onAddExpense={addExpenseHandler} />
            <Expenses items={expenses} />
        </div>
    );
}

export default App;