import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const LineCharts = () => {
  const { historicalData } = useSelector((state: RootState) => state.global);

  // İlkin tip strukturu: ilk element [string, string], digərləri [string, number]
  const [chartLineData, setChartLineData] = useState<
    Array<[string, string] | [string, number]>
  >([]);

  useEffect(() => {
    let lineChartDataCopy: Array<[string, string] | [string, number]> = [
      ["Date", "Price"],
    ];

    // historicalData varsa və prices mövcuddursa
    if (historicalData?.prices) {
      historicalData.prices.forEach((item) => {
        // item[0] tarixdir, item[1] qiymətdir
        const date = new Date(item[0]);
        lineChartDataCopy.push([
          date.toLocaleDateString().slice(0, -5),
          item[1],
        ]);
      });

      // state-i yeniləyirik
      setChartLineData(lineChartDataCopy);
    }
  }, [historicalData]);

  return (
    <div>
      {/* Chart komponentinə chartLineData əlavə edirik */}
      <Chart
        chartType="LineChart"
        data={chartLineData}
        height="100%"
        legendToggle
      />
    </div>
  );
};

export default LineCharts;
