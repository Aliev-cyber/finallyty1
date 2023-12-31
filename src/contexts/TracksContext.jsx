import React, { createContext, useContext, useReducer, useState } from "react";
import { BASE_URL } from "../utils/consts";
import axios from "axios";
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
  search: "",
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
  const [page, setPage] = useState(+searchParams.get("_page") || 1);
  const API = "http://localhost:8000/tracks";
  async function getTracks() {
    try {
      const { data, headers } = await axios.get(
        `${API}${window.location.search}`
      );
      console.log("getTracks data:", data);
      const totalCount = Math.ceil(headers["x-total-count"] / 12);
      dispatch({
        type: "totalPages",
        payload: totalCount,
      });

      dispatch({
        type: "tracks",
        payload: data,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  async function getOneTrack(id) {
    try {
      const { data } = await axios.get(`${API}/${id}`);
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
      await axios.post(API, track);
      setPage(1);
      getTracks();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteTrack(id) {
    try {
      await axios.delete(`${API}/${id}`);
      setPage(1);
      getTracks();
    } catch (e) {
      if (e.response.status === 500) {
        getTracks();
      }
      console.log(e);
    }
  }

  async function editTrack(id, newData) {
    try {
      await axios.patch(`${API}/${id}`, newData);
      getTracks();
    } catch (e) {
      console.log(e);
    }
  }
  async function playTrack(id) {
    try {
      const { data } = await axios.get(`${API}/${id}`);
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
  function calculateMedian(arr) {
    const totalSum = arr.reduce((sum, element) => sum + element.value, 0);
    const median = totalSum / arr.length;
    return parseFloat(median.toFixed(1));
  }
  async function rateTrack(trackId, username, value) {
    try {
      const trackResponse = await axios.get(`${API}/${trackId}`);
      const track = trackResponse.data;

      const existingRatingIndex = track.rating.findIndex(
        (rating) => rating.username === username
      );

      if (existingRatingIndex === -1) {
        const updatedRating = [
          ...track.rating,
          { username: username, value: value },
        ];
        const top = calculateMedian(updatedRating);
        await axios.patch(`${API}/${trackId}`, {
          rating: updatedRating,
          top: top,
        });
        getOneTrack(trackId);
      } else {
        if (typeof value === "number" && (value >= 0 || value <= 5)) {
          const updatedRating = [...track.rating];
          updatedRating[existingRatingIndex].value = value;
          const top = calculateMedian(updatedRating);
          await axios.patch(`${API}/${trackId}`, {
            rating: updatedRating,
            top: top,
          });
        } else {
          const updatedRating = track.rating.filter(
            (rating) => rating.username !== username
          );
          const top = calculateMedian(updatedRating);
          await axios.patch(`${API}/${trackId}`, {
            rating: updatedRating,
            top: top,
          });
        }
        getOneTrack(trackId);
      }
    } catch (error) {
      console.error("Error rating track:", error);
    }
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
    rateTrack,
  };
  return (
    <tracksContext.Provider value={value}>{children}</tracksContext.Provider>
  );
};

export default TracksContext;
