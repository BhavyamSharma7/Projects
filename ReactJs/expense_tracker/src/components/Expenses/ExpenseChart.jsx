import React from "react";
import Chart from "../Chart/Chart";

function ExpenseChart(props) {
    const chartDataPoints = [
        { label: 'Jan', value: 1 },
        { label: 'Feb', value: 1 },
        { label: 'Mar', value: 1 },
        { label: 'Apr', value: 1 },
        { label: 'May', value: 1 },
        { label: 'Jun', value: 1 },
        { label: 'Jul', value: 1 },
        { label: 'Aug', value: 1 },
        { label: 'Sep', value: 1 },
        { label: 'Oct', value: 1 },
        { label: 'Nov', value: 1 },
        { label: 'Dec', value: 1 }
        
    ];

    for (const expense of props.expenses) {
        const expenseMonth = expense.date.getMonth();
        chartDataPoints[expenseMonth].value += expense.amount-1;
        console.log(chartDataPoints[6].value);
    }

    return <Chart dataPoints={chartDataPoints} />
}

export default ExpenseChart;