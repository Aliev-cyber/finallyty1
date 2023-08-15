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
};

function reducer(state, action) {
  switch (action.type) {
    case "tracks":
      return { ...state, tracks: action.payload };
    case "oneTrack":
      return { ...state, oneTrack: action.payload };
    case "url":
      return { ...state, url: action.payload };
    default:
      return state;
  }
}

const TracksContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  async function getTracks() {
    try {
      const { data } = await $axios.get(`${BASE_URL}/music-tracks/`);
      console.log(data);
      dispatch({
        type: "tracks",
        payload: data,
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
      getTracks()
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteTrack(id) {
    try {
      await $axios.delete(`${BASE_URL}/tracks/${id}/`);
      getTracks();
    } catch (e) {
      console.log(e);
    }
  }

  async function editTrack(id, newData) {
    try {
      await $axios.patch(`${BASE_URL}/music-tracks/${id}/`, newData);
      getTracks()
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
    })
  }
  const value = {
    tracks: state.tracks,
    oneTrack: state.oneTrack,
    playerURL: state.url,
    getTracks,
    createTrack,
    deleteTrack,
    editTrack,
    getOneTrack,
    playTrack,
    clearURL
  };
  return (
    <tracksContext.Provider value={value}>{children}</tracksContext.Provider>
  );
};

export default TracksContext;
