import { createSlice } from "@reduxjs/toolkit";

/* state slice to be used to track when the database is updated */
export const carDatabaseSlice = createSlice({
    name: "carDatabase",

    /* state keeps count of how many times the database has been updated. This is used to trigger the web page to be re-rendered in App.js */
    initialState: {
        databaseUpdatedCount: 0,
    },

    reducers : {
        /* increments the state of databaseUpdatedCount */
        updateDatabaseCount: (state) => {
                state.databaseUpdatedCount += 1
            },
        }
})

export const {updateDatabaseCount} = carDatabaseSlice.actions

export default carDatabaseSlice.reducer