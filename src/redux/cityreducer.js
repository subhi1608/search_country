import { createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	cityList: [],
	isLoading: false,
};

const citySlice = createSlice({
	name: "city",
	initialState,
	reducers: {
		cityList(state, action) {
			state.cityList = action.payload;
			state.isLoading = false;
		},
		loading(state, action) {
			state.isLoading = true;
		},
	},
});

export const { cityList, loading } = citySlice.actions;

export default citySlice.reducer;

export const fetchCity = (cityParam, size) => async (dispatch) => {
	dispatch(loading());
	let options = {
		method: "GET",
		url: `https://${process.env.REACT_APP_URL}/v1/geo/cities`,
		params: { countryIds: "IN", namePrefix: cityParam, limit: size },
		headers: {
			"x-rapidapi-host": process.env.REACT_APP_URL,
			"x-rapidapi-key": process.env.REACT_APP_SECRET_KEY,
		},
	};
	axios
		.request(options)
		.then(function (response) {
			dispatch(cityList(response.data.data));
		})
		.catch(function (error) {
			console.error(error);
		});
};
