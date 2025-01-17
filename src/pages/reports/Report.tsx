import AreaChartComponent from "@/components/elements/AreaChartComponent"
import BarChartComponent from "@/components/elements/BarChartComponent"
import { CustomLinechart } from "@/components/elements/CustomLineChart"
import DonutPieChart from "@/components/elements/DonutPieChart"
import InteractiveBarChart from "@/components/elements/InteractiveBarChart"
import MultipleLineChart from "@/components/elements/MultipleLineChart"
import NegativeBarChart from "@/components/elements/NegativeBarChart"
import PieChartComponent from "@/components/elements/PieChartComponent"
import RadarChartComponent from "@/components/elements/RadarChartComponent"
import RadarChartCustomLabel from "@/components/elements/RadarChartCustomLabel"
import RadialChartLabel from "@/components/elements/RadialChartLabel"
import RadialChartText from "@/components/elements/RadialChartText"
import StepAreaChart from "@/components/elements/StepAreaChart"

const Report = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-10 mb-10">
        <AreaChartComponent />
        <BarChartComponent />
        <PieChartComponent />
        <StepAreaChart />
        <MultipleLineChart />
        <DonutPieChart />
        <NegativeBarChart />
        <RadarChartComponent />
        <RadialChartLabel />
        <RadialChartText />
        <RadarChartCustomLabel />
        <CustomLinechart />
      </div>
      <InteractiveBarChart />
    </div>
  )
}
export default Report
