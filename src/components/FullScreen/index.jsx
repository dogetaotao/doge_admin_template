import React, {useEffect, useState} from 'react';
import screenfull from "screenfull"
import {message, Tooltip} from "antd";
import {
  FullscreenOutlined,
  FullscreenExitOutlined
} from "@ant-design/icons"
import "./index.less"

const click = () => {
  console.log(screenfull.isEnabled)
  if (!screenfull.isEnabled) {
    message.warning("全屏状态无法正常工作")
    return false
  }
  screenfull.toggle()
}

const FullScreen = () => {

  const [isFullScreen, setIsFullScreen] = useState(false)

  const change = () => {
    setIsFullScreen(screenfull.isFullscreen)
  }

  useEffect(() => {
    //isFullScreen改变时，启动变化，再次变化时卸载变化
    screenfull.isEnabled && screenfull.on('change', change)
    return () => {
      screenfull.isEnabled && screenfull.off('change', change)
    }
  }, [])

  const title = isFullScreen ? "取消全屏" : "全屏"

  return (
    <div className="fullScreen-container">
      <Tooltip placement="bottom" title={title}>
        {title === "取消全屏" ? <FullscreenExitOutlined onClick={click}/> : <FullscreenOutlined onClick={click}/>}
      </Tooltip>
    </div>
  )
}

export default FullScreen;
