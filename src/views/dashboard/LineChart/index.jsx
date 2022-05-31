import React, {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import echarts from "../../../lib/echarts"
import {debounce} from "../../../utils"
import {useDebounce} from "../../../hooks";

const LineChart = (props) => {

  const {styles, className, height, width} = props
  const [chartData, setChartData] = useState(props.chartData)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(props.sidebarCollapsed)
  const el = useRef(null)
  const [chart, setChart] = useState(null)

  const setOptions = (helpChart, {expectedData, actualData} = {}) => {
    helpChart.setOption({
      backgroundColor: "#fff",
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        boundaryGap: false,
        axisTick: {
          show: false,
        },
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 10,
        top: 30,
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        padding: [5, 10],
      },
      yAxis: {
        axisTick: {
          show: false,
        },
      },
      legend: {
        data: ["expected", "actual"],
      },
      series: [
        {
          name: "expected",
          itemStyle: {
            color: "#FF005A",
          },
          lineStyle: {
            color: "#FF005A",
            width: 2,
          },
          smooth: true,
          type: "line",
          data: expectedData,
          animationDuration: 2800,
          animationEasing: "cubicInOut",
        },
        {
          name: "actual",
          smooth: true,
          type: "line",
          itemStyle: {
            color: "#3888fa",
            areaStyle: {
              color: "#f3f8ff",
            },
            lineStyle: {
              color: "#3888fa",
              width: 2,
            },
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: "quadraticOut",
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
      setOptions(helpChart, props.chartData)
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

LineChart.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  styles: PropTypes.object,
  chartData: PropTypes.object.isRequired,
}
LineChart.defaultProps = {
  width: "100%",
  height: "350px",
  className: "",
  styles: {},
}

export default connect(state => state.apps)(LineChart);
