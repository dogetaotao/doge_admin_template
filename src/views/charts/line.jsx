import React, {useEffect, useRef, useState} from 'react';
import {debounce} from "../../utils";
import echarts from "../../lib/echarts"
import {connect} from "react-redux";
import {useDebounce} from "../../hooks";

const Line = (props) => {

  const [chartData, setChartData] = useState(props.chartData)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(props.sidebarCollapsed)
  const el = useRef(null)
  const [chart, setChart] = useState(null)

  const setOptions = (helpChart) => {
    helpChart.setOption({
      backgroundColor: "#08263a",
      title: {
        top: 20,
        text: "Requests",
        fontWeight: "normal",
        fontSize: 16,
        color: "#F1F1F3",
        left: "1%",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: "#57617B",
          },
        },
      },
      legend: {
        top: 20,
        icon: "rect",
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ["CMCC", "CTCC", "CUCC"],
        right: "4%",
        fontSize: 12,
        color: "#F1F1F3",
      },
      grid: {
        top: 100,
        left: "2%",
        right: "2%",
        bottom: "2%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#57617B",
            },
          },
          data: [
            "13:00",
            "13:05",
            "13:10",
            "13:15",
            "13:20",
            "13:25",
            "13:30",
            "13:35",
            "13:40",
            "13:45",
            "13:50",
            "13:55",
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "(%)",
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#57617B",
            },
          },
          axisLabel: {
            margin: 10,
            fontSize: 14,
          },
          splitLine: {
            lineStyle: {
              color: "#57617B",
            },
          },
        },
      ],
      series: [
        {
          name: "CMCC",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(137, 189, 27, 0.3)",
                },
                {
                  offset: 0.8,
                  color: "rgba(137, 189, 27, 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
          },
          itemStyle: {
            color: "rgb(137,189,27)",
            borderColor: "rgba(137,189,2,0.27)",
            borderWidth: 12,
          },
          data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122],
        },
        {
          name: "CTCC",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(0, 136, 212, 0.3)",
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 136, 212, 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
          },
          itemStyle: {
            color: "rgb(0,136,212)",
            borderColor: "rgba(0,136,212,0.2)",
            borderWidth: 12,
          },
          data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150],
        },
        {
          name: "CUCC",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(219, 50, 51, 0.3)",
                },
                {
                  offset: 0.8,
                  color: "rgba(219, 50, 51, 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
          },
          itemStyle: {
            color: "rgb(219,50,51)",
            borderColor: "rgba(219,50,51,0.2)",
            borderWidth: 12,
          },
          data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122],
        },
      ],
    })
  }

  useEffect(() => {
    if (props.sidebarCollapsed !== sidebarCollapsed) {
      setTimeout(function () {
        chart.resize({animation: {duration: 300, easing: "circularIn", delay: 0}})
      }, 300)
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
      chart.resize({animation: {duration: 300, easing: "circularIn", delay: 0}})
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
      style={{width: "100%", height: "calc(100vh - 100px)"}}
      className="app-container"
    >
      <div
        ref={el}
        style={{width: "100%", height: "100%"}}
      />
    </div>
  )
}

export default connect((state) => state.apps)(Line);
