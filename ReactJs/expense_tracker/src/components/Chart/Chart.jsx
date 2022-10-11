import React from "react";
import ChartBar from "./ChartBar";

function Chart(props) {
    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
    const totalMax = Math.max(...dataPointValues);
    // console.log(totalMax);
    return (
        <div className="Chart">
            {props.dataPoints.map((dataPoint) => {
                return (<ChartBar
                    key={dataPoint.label}
                    value={dataPoint.value}
                    maxValue={totalMax}
                    label={dataPoint.label}
                />)
            })}
        </div>
    );   
}

export default Chart;