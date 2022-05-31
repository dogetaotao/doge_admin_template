import React, {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import echarts from "../../../lib/echarts"
import {debounce} from "../../../utils"
import {useDebounce} from "../../../hooks";

const PieChart = (props) => {
  const {styles, className, height, width} = props
  const [chartData, setChartData] = useState(props.chartData)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(props.sidebarCollapsed)
  const el = useRef(null)
  const [chart, setChart] = useState(null)

  const setOptions = (helpChart) => {
    const animationDuration = 3000;
    helpChart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        left: "center",
        bottom: "10",
        data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"],
      },
      calculable: true,
      series: [
        {
          name: "WEEKLY WRITE ARTICLES",
          type: "pie",
          roseType: "radius",
          radius: [15, 95],
          center: ["50%", "38%"],
          data: [
            { value: 320, name: "Industries" },
            { value: 240, name: "Technology" },
            { value: 149, name: "Forex" },
            { value: 100, name: "Gold" },
            { value: 59, name: "Forecasts" },
          ],
          animationEasing: "cubicInOut",
          animationDuration
        },
      ],
    });
  }

  useEffect(() => {
    if (props.sidebarCollapsed !== sidebarCollapsed) {
      setTimeout(function () {chart.resize({animation:{duration:300, easing: "circularIn", delay: 0}})}, 300)
    }
    if (props.chartData !== chartData) {
      newInitChart()
    }
    setSidebarCollapsed(props.sidebarCollapsed)
    setChartData(props.chartData)
  }, [props])

  const initChart = () => {
    if (!el) return
    setChart(() => {
      const helpChart = echarts.init(el.current, "jazz")
      setOptions(helpChart)
      window.addEventListener("resize", newResize)
      return helpChart
    })
  }
  const newInitChart = useDebounce(initChart)
  const resize = function () {
    if (chart) {
      chart.resize({animation:{duration:300, easing: "circularIn", delay: 0}})
    }
  }
  const newResize = useDebounce(resize)

  const dispose = () => {
    if (!chart) {
      return
    }
    window.removeEventListener("resize", newResize)
    setChart(null)
  }

  useEffect(function () {
    newInitChart()
    return dispose()
  }, [])

  return (
    <div
      className={className}
      ref={el}
      style={{
        ...styles,
        width,
        height,
      }}
    />
  )
}

PieChart.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  styles: PropTypes.object,
}
PieChart.defaultProps = {
  width: "100%",
  height: "300px",
  className: "",
  styles: {},
}


export default connect((state) => state.apps)(PieChart);
