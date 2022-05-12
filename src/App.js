import React from "react";
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import Router from "./router";
import zhCN from "antd/es/locale/zh_CN";
import store from "./store"

class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <Router/>
        </Provider>
      </ConfigProvider>
    );
  }
}

export default App;
