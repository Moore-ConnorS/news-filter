import React, { Component } from "react";
import axios from "axios";
import "./GetCNN.css";

export default class GetCNN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleCNN: [],
      selectedArticle: null,
      selectedTitle: "",
      selectedUrl: ""
    };

    // this.getCNN = this.getCNN.bind(this);

    // this.selectArticle = this.selectArticle.bind(this);
  }

  componentDidMount() {
    // this.getCNN();
  }

  //   getCNN() {
  //     axios
  //       .get(
  //         "https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=8763d79006ca46f59fd7f391a8ada86a"
  //       )
  //       .then(res => {
  //         this.setState({
  //           articleCNN: res.data.articles
  //         });
  //       });
  //   }

  //   selectArticle(title, urlToImage, url) {
  //     this.setState({
  //       selectedArticle: urlToImage,
  //       selectedTitle: title,
  //       selectedUrl: url
  //     });
  //   }

  render() {
    const { articleCNN } = this.state;

    const cnn = articleCNN.map(fake => {
      return (
        <div className="cnnArticleContainer">
          <h4>{fake.title}</h4>
          <img src={fake.urlToImage} />
          <a href={fake.url} target="_blank">
            <button className="articleContainerButtons">
              View Article On Site
            </button>
          </a>
          <button
            className="articleContainerButtons"
            onClick={() =>
              this.props.postFavorite(fake.title, fake.urlToImage, fake.url)
            }
          >
            Add To Read Later
          </button>
          <button
            className="articleContainerButtons"
            onClick={() =>
              this.props.selectArticle(fake.title, fake.urlToImage, fake.url)
            }
          >
            Select Article For Update
          </button>
        </div>
      );
    });
    return <div className="cnnContainer">{cnn}</div>;
  }
}
