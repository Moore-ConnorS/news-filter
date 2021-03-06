import React from "react";

export default function espnDisplay(props) {
  const { title, urlToImage, url } = props;
  return (
    <div className="articleContainer">
      <h4>{props.title}</h4>
      <img src={props.urlToImage} />
      <a href={props.url} target="_blank">
        <button className="articleContainerButtons">
          View Article On Site
        </button>
      </a>
      <button
        className="articleContainerButtons"
        onClick={() => props.postFavorite(title, urlToImage, url)}
      >
        Add To Read Later
      </button>
    </div>
  );
}
