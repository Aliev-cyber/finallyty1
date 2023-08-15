import React, { Component } from "react";
import ReactPlayer from "react-player/lazy";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import "./style.css";

class ResponsivePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      played: 0,
      duration: 0,
      randomPosition: 0,
      url: props.url,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.setState({
        playing: false,
        url: this.props.url,
      });
    }
  }
  generateRandomPosition = () => {
    const randomPosition = Math.random();
    this.setState({ randomPosition });
  };

  handlePlayPause = () => {
    if (!this.state.playing) {
      this.generateRandomPosition();
      this.setState({ playing: true }); 
    } else {
      this.setState({ playing: false }); 
    }
  };
  

  handleProgress = (state) => {
    this.setState({
      played: state.played,
    });
  };

  handleDuration = (duration) => {
    this.setState({ duration });
  };

  handleSeek = (e) => {
    const played = parseFloat(e.target.value);
  
    if (!this.state.playing) {
      this.setState({
        played,
        randomPosition: played, // Update randomPosition when seeking while paused
      });
    } else {
      this.setState({ played }, () => {
        this.player.seekTo(played, 'fraction');
      });
    }
  };
  
  
  render() {
    const {url} = this.props
    return (
      <div className="player-wrapper">
        <div className="video-container">
          <ReactPlayer
            ref={(player) => (this.player = player)}
            className={`react-player ${this.state.playing ? "" : "hidden"}`}
            url={url}
            width="100%"
            height="100%"
            playing={this.state.playing}
            controls={false}
            onProgress={this.handleProgress}
            onDuration={this.handleDuration}
            seekTo={
              this.state.playing ? this.state.played : this.state.randomPosition
            }
            onClick={(e) => e.preventDefault()}
          />
          <div className="play-pause-icons">
            <SkipPreviousIcon className="control-icon" />
            {this.state.playing ? (
              <FaPauseCircle
                className="play-icon"
                onClick={this.handlePlayPause}
              />
            ) : (
              <FaPlayCircle
                className="play-icon"
                onClick={this.handlePlayPause}
              />
            )}
            <SkipNextIcon className="control-icon" />
          </div>
          <div className="time-input-container">
            <div className="time-left">
              {formatTime(this.state.played * this.state.duration)}
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={this.state.played}
              onChange={this.handleSeek}
              className="time-input"
            />
            <div className="time-right">{formatTime(this.state.duration)}</div>
          </div>
          <div className="video-overlay"></div>
        </div>
      </div>
    );
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

export default ResponsivePlayer;
