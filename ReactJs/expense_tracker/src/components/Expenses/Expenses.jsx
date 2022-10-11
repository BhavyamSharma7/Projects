import React, { useState } from "react";
import Card from "../UI/Card";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseChart from "./ExpenseChart";
import ExpensesList from "./ExpensesList";

function Expenses(props) {
    const [filteredYear, setFilteredYear] = useState('2022');

    function filterChangeHandler(selectedYear) {
        setFilteredYear(selectedYear);
    }

    const filteredExpenses = props.items.filter(expense => {
        return expense.date.getFullYear().toString() === filteredYear;
    });

    return (
        <Card className="expenses">
            <ExpenseFilter
                selected={filteredYear}
                onChangeFilter={filterChangeHandler}
            />
            <ExpenseChart expenses={filteredExpenses} />
            <ExpensesList items={filteredExpenses} />
        </Card>
    );
}

export default Expenses;