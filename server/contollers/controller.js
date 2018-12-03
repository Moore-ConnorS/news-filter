let favorites = [];
let id = 0;

module.exports = {
  readFavorites: (req, res) => {
    // console.log(favorites);
    res.status(200).send(favorites);
  },

  addToFavorites: (req, res) => {
    // console.log("req.body", req.body);
    const { title, urlToImage, url } = req.body.article;
    const newFavorite = {
      title: title,
      urlToImage: urlToImage,
      url: url,
      id: id
    };

    favorites.push(newFavorite);
    id++;
    res.status(200).send(favorites);
  },

  updateFavorite: (req, res) => {
    const { id } = req.params;
    const { title, urlToImage, url } = req.body;
    favorites.forEach(article => {
      if (article.id === +id) {
        (article.title = title),
          (article.urlToImage = urlToImage),
          (article.url = url);
      }
    });
    res.status(200).send(favorites);
  },

  deleteFavorite: (req, res) => {
    const { id } = req.params;
    favorites = favorites.filter(article => {
      return article.id !== +id;
    });
    res.status(200).send(favorites);
  }
};
