import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "../component/NewsCard.js";
import { LinearProgress } from "@material-ui/core";

const NewsPage = ({ market }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    let options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        q: market,
        freshness: "Day",
        count: 10,
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "x-bingapis-sdk": "true",
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": "c973464e7amsh814b0a79e23e2d5p119bbcjsn74d82b82bb04",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setNews(response.data.value);
      })
      .catch(function (error) {
        console.error(error);
      });
    return () => {};
  }, [market]);
  if (!news.length > 0)
    return <LinearProgress style={{ background: "gold" }} />;

  return (
    <div
      className="home-heading-container"
      style={{ marginTop: "4%", paddingLeft: "2%" }}
    >
      {news.length > 0 && <NewsCard data={news} />}
    </div>
  );
};

export default NewsPage;
