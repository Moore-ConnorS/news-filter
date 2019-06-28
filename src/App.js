import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import BBC from "./components/BBC";
import ESPN from "./components/ESPN";
import CNN from "./components/CNN";

class App extends Component {
  constructor() {
    super();
    this.state = {
      articleBBC: [],
      articleEspn: [],
      articleCNN: [],
      favoritesList: [],
      selectedArticle: null,
      selectedTitle: "",
      selectedUrl: ""
    };

    this.getFavorites = this.getFavorites.bind(this);
    this.postFavorite = this.postFavorite.bind(this);

    this.getBBC = this.getBBC.bind(this);
    this.getESPN = this.getESPN.bind(this);
    this.getCNN = this.getCNN.bind(this);

    this.selectBBC = this.selectBBC.bind(this);
    this.selectESPN = this.selectESPN.bind(this);
    this.selectCNN = this.selectCNN.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
    this.getCNN();
    this.getBBC();
    this.getESPN();
  }

  getFavorites() {
    axios.get("/api/favorites").then(res => {
      // console.log(this.state.favoritesList);
      this.setState({
        favoritesList: res.data
      });
    });
  }

  postFavorite(title, urlToImage, url) {
    console.log("article", article);
    let article = {
      title: title,
      urlToImage: urlToImage,
      url: url
    };
    // console.log(this.state.favoritesList);
    axios.post("/api/favorites", { article }).then(res => {
      // console.log(res.data);
      this.setState({
        favoritesList: res.data
      });
    });
  }

  deleteFavorite(id) {
    axios.delete(`/api/favorites/${id}`).then(res => {
      this.setState({
        favoritesList: res.data
      });
    });
  }

  getBBC() {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=8763d79006ca46f59fd7f391a8ada86a"
      )
      .then(res => {
        this.setState({
          articleBBC: res.data.articles
        });
      });
  }

  getESPN() {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=8763d79006ca46f59fd7f391a8ada86a"
      )
      .then(res => {
        this.setState({
          articleEspn: res.data.articles
        });
      });
  }

  getCNN() {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=8763d79006ca46f59fd7f391a8ada86a"
      )
      .then(res => {
        this.setState({
          articleCNN: res.data.articles
        });
      });
  }

  selectBBC() {
    this.state.articleBBC.length
      ? this.setState({
          articleBBC: []
        })
      : this.getBBC();
  }

  selectESPN() {
    this.state.articleEspn.length
      ? this.setState({
          articleEspn: []
        })
      : this.getESPN();
  }

  selectCNN() {
    this.state.articleCNN.length
      ? this.setState({
          articleCNN: []
        })
      : this.getCNN();
  }

  render() {
    const { favoritesList, articleBBC, articleEspn, articleCNN } = this.state;

    const myFavorites = favoritesList.map(art => {
      return (
        <span>
          <div className="favoriteArticle">
            <a href={art.url} target="_blank">
              <img src={art.urlToImage} />
            </a>
            <button
              className="delete"
              onClick={() => this.deleteFavorite(art.id)}
            >
              X
            </button>
            <h4>{art.title}</h4>
          </div>
        </span>
      );
    });

    const cnn = articleCNN.map(fake => {
      return (
        <CNN
          title={fake.title}
          urlToImage={fake.urlToImage}
          url={fake.url}
          selectArticle={this.selectArticle}
          postFavorite={this.postFavorite}
        />
      );
    });

    const bbc = articleBBC.map(british => {
      return (
        <BBC
          title={british.title}
          urlToImage={british.urlToImage}
          url={british.url}
          selectArticle={this.selectArticle}
          postFavorite={this.postFavorite}
        />
      );
    });

    const espn = articleEspn.map(sports => {
      return (
        <ESPN
          title={sports.title}
          urlToImage={sports.urlToImage}
          url={sports.url}
          selectArticle={this.selectArticle}
          postFavorite={this.postFavorite}
        />
      );
    });
    console.log(this.state.selectedArticle);
    return (
      <div className="App">
        <header
          style={{ height: this.state.favoritesList.length ? "300px" : false }}
        >
          <div className="favoritesContainer">{myFavorites}</div>
        </header>
        <div className="sourceHeader">
          <div className="sourceContainer">
            <div
              className="cnnImage"
              style={{ opacity: !this.state.articleCNN.length ? ".3" : false }}
              onClick={this.selectCNN}
            />
            <div
              className="bbcImage"
              style={{ opacity: !this.state.articleBBC.length ? ".3" : false }}
              onClick={this.selectBBC}
            />
            <div
              className="espnImage"
              style={{ opacity: !this.state.articleEspn.length ? ".3" : false }}
              onClick={this.selectESPN}
            />
          </div>
        </div>
        <div>
          {/* <GetCNN
            selectArticle={this.selectArticle}
            postFavorite={this.postFavorite}
            getCNN={this.getCNN}
          /> */}
          <div className="newsContainer">{cnn}</div>
          <div className="newsContainer">{bbc}</div>
          <div className="newsContainer">{espn}</div>
        </div>
      </div>
    );
  }
}

export default App;
