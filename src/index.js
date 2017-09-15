import _ from "lodash";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";

import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
//import API_KEY from "../config/config";

let apiKey = process.env.API_KEY;

// create a component

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch("dogs");
  };
  videoSearch(term) {
    YTSearch({key: apiKey, term}, videos => {
      this.setState({
        videos,
        selectedVideo: videos[0]
      });
    });
  };
  render() {
    const videoSearch = _.debounce(term => {this.videoSearch(term)}, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  };
}

// show on page in the DOM
ReactDOM.render(<App/>, document.querySelector(".container"));
