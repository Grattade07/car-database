import {configureStore} from "@reduxjs/toolkit"
import carDatabaseReducer from "./carDatabase"

export default configureStore({
    reducer: {
        carDatabase: carDatabaseReducer,
    },
})