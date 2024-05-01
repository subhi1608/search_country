import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./cityreducer";

export const store = configureStore({
	reducer: {
		city: cityReducer,
	},
});
