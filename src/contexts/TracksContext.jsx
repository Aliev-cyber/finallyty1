import React, { createContext, useContext, useReducer, useState } from "react";
import { BASE_URL, LIMIT } from "../utils/consts";
import $axios from "../utils/axios";
import { useSearchParams } from "react-router-dom";

const tracksContext = createContext();

export function useTracksContext() {
	return useContext(tracksContext);
}

const initState = {
	tracks: [],
	oneTrack: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "tracks":
			return { ...state, tracks: action.payload };
		case "oneTrack":
			return { ...state, oneTrack: action.payload };
		default:
			return state;
	}
}

const TracksContext = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initState);

	async function getTracks() {
		try {
			const { data } = await $axios.get(
				`${BASE_URL}/music-tracks/`
			);
			console.log(data);
			dispatch({
				type: "tracks",
				payload: data.results,
			});
		} catch (e) {
			console.log(e);
		}
	}

	async function getOneTrack(id) {
		try {
			const { data } = await $axios.get(`${BASE_URL}/music-tracks/${id}/`);
			dispatch({
				type: "oneTrack",
				payload: data,
			});
		} catch (e) {
			console.log(e);
		}
	}

	async function createTrack(track) {
		try {
			await $axios.post(`${BASE_URL}/music-tracks/`, track);
		} catch (e) {
			console.log(e);
		}
	}

	async function deleteTrack(id) {
		try {
			await $axios.delete(`${BASE_URL}/music-tracks/${id}/`);
			getTracks();
		} catch (e) {
			console.log(e);
		}
	}

	async function editTrack(id, newData) {
		try {
			await $axios.patch(`${BASE_URL}/music-tracks/${id}/`, newData);
		} catch (e) {
			console.log(e);
		}
	}

	const value = {
		tracks: state.tracks,
		oneTrack: state.oneTrack,
		getTracks,
		createTrack,
		deleteTrack,
		editTrack,
		getOneTrack,
	};
	return (
		<tracksContext.Provider value={value}>{children}</tracksContext.Provider>
	);
};

export default TracksContext;
