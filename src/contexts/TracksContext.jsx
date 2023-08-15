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
  url: "",
  totalPages: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "tracks":
      return { ...state, tracks: action.payload };
    case "oneTrack":
      return { ...state, oneTrack: action.payload };
    case "url":
      return { ...state, url: action.payload };
    case "totalPages":
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
}

const TracksContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(+searchParams.get("page") || 1);
  
	async function getTracks() {
		try {
			const { data } = await $axios.get(
				`${BASE_URL}/tracks/${window.location.search}`
			);
			console.log(data);
			const totalCount = Math.ceil(data.count / 5);

			dispatch({
				type: "totalPages",
				payload: totalCount,
			});

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
      await $axios.post(`${BASE_URL}/tracks/`, track);
      getTracks();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteTrack(id) {
    try {
      await $axios.delete(`${BASE_URL}/tracks/${id}/`);
      await $axios.delete(`${BASE_URL}/music-tracks/${id}/`);
      console.log("succesfully deleted");
      setPage(1)
      getTracks();
      console.log("succesfully got tracks");
    } catch (e) {
      console.log(e);
    }
  }

  async function editTrack(id, newData) {
    try {
      await $axios.patch(`${BASE_URL}/music-tracks/${id}/`, newData);
      console.log("succesfully edited");
      getTracks();
    } catch (e) {
      console.log(e);
    }
  }
  async function playTrack(id) {
    try {
      const { data } = await $axios.get(`${BASE_URL}/music-tracks/${id}`);
      dispatch({
        type: "url",
        payload: data.audio_file,
      });
      console.log(state.url);
    } catch (error) {
      dispatch({
        type: "url",
        payload: "",
      });
    }
  }
  function clearURL() {
    dispatch({
      type: "url",
      payload: null,
    });
  }
  const value = {
    tracks: state.tracks,
    oneTrack: state.oneTrack,
    playerURL: state.url,
    totalPages: state.totalPages,
		page,
		setPage,
    getTracks,
    createTrack,
    deleteTrack,
    editTrack,
    getOneTrack,
    playTrack,
    clearURL,
  };
  return (
    <tracksContext.Provider value={value}>{children}</tracksContext.Provider>
  );
};

export default TracksContext;
