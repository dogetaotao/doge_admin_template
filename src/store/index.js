import {configureStore} from "@reduxjs/toolkit";
import reducer from "./reducers"

//因为传入了无法序列化
const store = configureStore({reducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})})

export default store
