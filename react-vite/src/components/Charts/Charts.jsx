import { Chart } from "react-google-charts";
// export const data = [
//   ["Category", "Amount"],
//   ["Transportation", 550],
//   ["Lodging", 1000],
//   ["Food", 250],
//   ["Entertainment", 255],
//   ["Other", 5],
// ];
export const options = {
  title: "Plan Expenses",
};

const charts = ({data}) => {
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
