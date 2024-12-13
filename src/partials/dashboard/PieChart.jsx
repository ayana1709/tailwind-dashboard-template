import { ResponsivePie } from "@nivo/pie";

const data = [
  { id: "JavaScript", label: "JavaScript", value: 81 },
  { id: "Python", label: "Python", value: 20 },
  { id: "Ruby", label: "Ruby", value: 15 },
  { id: "Java", label: "Java", value: 35 },
];

// Define color palette
const colors = ["#FF5B5B", "#FFC93C", "#6A0572", "#4B88A2"];

const PieChart = () => (
  <div style={{ height: 230 }}>
    <ResponsivePie
      data={data}
      margin={{ top: 50, right: 25, bottom: 25, left: 25 }}
      innerRadius={0.5}
      padAngle={0.2}
      cornerRadius={3}
      // Use the colors array directly
      colors={colors}
      borderWidth={2}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor="#333333"
      radialLabelsLinkColor={{ from: "color" }}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#333333"
      arcLinkLabelsSkipAngle="45deg"
    />
  </div>
);

export default PieChart;
