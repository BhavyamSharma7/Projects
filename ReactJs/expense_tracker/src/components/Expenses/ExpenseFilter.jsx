import React from "react";


function ExpenseFilter(props) {
    
    function dropdownChangeHandler(event) {
        props.onChangeFilter(event.target.value);
    }

    return (
        <div className="expenses-filter">
            <div className="expenses-filter__control">
                <label>Filter by year</label>
                <select vlaue={props.selected} onChange={dropdownChangeHandler}>
                    <option vlaue="2022">2022</option>
                    <option vlaue="2021">2021</option>
                    <option vlaue="2020">2020</option>
                    <option vlaue="2019">2019</option>
                </select>
            </div>
        </div>
    );
}

export default ExpenseFilter;