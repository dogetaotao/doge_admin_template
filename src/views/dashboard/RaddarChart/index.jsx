import React, {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import echarts from "../../../lib/echarts"
import {debounce} from "../../../utils"
import {useDebounce} from "../../../hooks";

const RaddarChart = (props) => {

  const {styles, className, height, width} = props
  const [chartData, setChartData] = useState(props.chartData)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(props.sidebarCollapsed)
  const el = useRef(null)
  const [chart, setChart] = useState(null)

  const setOptions = (helpChart) => {
    const animationDuration = 3000;
    helpChart.setOption({
      tooltip: {
        trigger: "axis",
        // axisPointer: {
        //   // 坐标轴指示器，坐标轴触发有效
        //   type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        // },
      },
      radar: {
        radius: "66%",
        center: ["50%", "42%"],
        indicator: [
          {name: "Sales", max: 5},
          {name: "Administration", max: 5, min: 0},
          {name: "Information Techology", max: 5, min: 0},
          {name: "Customer Support", max: 5, min: 0},
          {name: "Development", max: 5, min: 0},
          {name: "Marketing", max: 5, min: 0},
        ],
      },
      legend: {
        left: "center",
        bottom: "10",
        data: ["Allocated Budget", "Expected Spending", "Actual Spending"],
      },
      series: [
        {
          alignTicks: false,
          type: "radar",
          symbolSize: 0,
          areaStyle: {
            shadowBlur: 13,
            shadowColor: "rgba(0,0,0,.2)",
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1,
          },
          data: [
            {
              value: [3, 2, 5, 2, 3, 3],
              name: "Allocated Budget",
            },
            {
              value: [4, 4, 3, 2, 5, 3],
              name: "Expected Spending",
            },
            {
              value: [3, 3, 3, 3, 3, 3],
              name: "Actual Spending",
            },
          ],
          animationDuration,
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

RaddarChart.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  styles: PropTypes.object,
}
RaddarChart.defaultProps = {
  width: "100%",
  height: "300px",
  className: "",
  styles: {},
}

export default connect(state => state.apps)(RaddarChart);
