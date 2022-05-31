import React, {useEffect, useRef} from 'react';
import {Card} from "antd";
import PropTypes from "prop-types";
import Typing from "../../utils/typing"


const TypingCard = (props) => {
  const {title, source} = props

  const sourceEl = useRef()
  const outputEl = useRef()

  useEffect(() => {
    const typing = new Typing({
      source: sourceEl.current,
      output: outputEl.current,
      delay: 30
    })
    typing.start()
  })

  return (
    <Card className="card-item" title={title} bordered={false}>
      <div
        style={{display: "none"}}
        ref={sourceEl}
        dangerouslySetInnerHTML={{__html: source}}
      />
      <div ref={outputEl}/>
    </Card>
  )
}

Typing.PropTypes = {
  title: PropTypes.string,
  source: PropTypes.string
}

Typing.defaultProps = {
  title: "",
  source: ""
}

export default TypingCard;
