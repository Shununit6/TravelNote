import { Chart } from "react-google-charts";

const charts = ({data, options}) => {
  return (
    <Chart id="chartid"
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  )
}
export default charts
