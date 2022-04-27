import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../Home/Header";
import newsstyles from "./News.module.css";
import Search from "./SearchNews";
import { randomqueries } from "./randomqueries";
import ReactPaginate from "react-paginate";
// import axios from "axios";
let query = "mental-health";

const News2 = () => {
  const [data, setData] = useState();
  const [term, setTerm] = useState("");
  const [suggesting, setSuggesting] = useState(true);
  const [otherarticles, setotherarticles] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const sortBy = ["Date"];
  const [offset, setoffset] = useState(0);
  useEffect(() => {
    if (page > 3) {
      setSuggesting(false);
      setotherarticles(true);
      setTerm("");
    } else {
      setSuggesting(true);
    }
  }, [page]);
  useEffect(() => {
    const token1 = JSON.parse(localStorage.getItem("token"));
    let queryTerm;
    if (suggesting) {
      axios
        .get(`/api/v1/profile`, {
          headers: {
            authorization: `Bearer ${token1}`,
          },
        })
        .then((res) => {
          const { Keywords } = res.data.data;
          const temp = Object.entries(Keywords);
          temp.sort((a, b) => b[1] - a[1]);
          query = temp.slice(0, 3);
          queryTerm = `${query[0][0]} OR ${query[1][0]} OR ${query[2][0]}`;
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            return;
          }
          console.log(err);
        });
      // let axios = require("axios").default;
      let options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news/search",
        params: {
          offset: offset,
          q: queryTerm,
          count: "20",
          //sortBy: { sortby },
          setLang: "english",
          textFormat: "Raw",
          safeSearch: "Strict",
          originalImg: true,
        },
        headers: {
          "accept-language": "english",
          "x-bingapis-sdk": "true",
          "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
          "x-rapidapi-key":
            "b8d8d0450cmsh3237aa422af86dfp134a6bjsn21c78dc82a2a",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setData(response.data);
          const pageLim =
            response.data.totalEstimatedMatches &&
            Math.min(20, response.data.totalEstimatedMatches / 20);
          if (pageLim) {
            setPageCount(pageLim);
          }
        })
        .catch(function (error) {
          console.error(error.response);
        });
    } else if (otherarticles) {
      const otherterm =
        randomqueries[Math.floor(Math.random() % randomqueries.length)];
      // let sortby = sortBy[Math.floor(Math.random() % sortBy.length)];
      // let axios = require("axios").default;
      let options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news/search",
        params: {
          offset: offset - 40,
          q: otherterm,
          count: "20",
          // sortBy: { sortby },
          setLang: "english",
          textFormat: "Raw",
          safeSearch: "Strict",
          originalImg: true,
        },
        headers: {
          "accept-language": "english",
          "x-bingapis-sdk": "true",
          "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
          "x-rapidapi-key":
            "b8d8d0450cmsh3237aa422af86dfp134a6bjsn21c78dc82a2a",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setData(response.data);
          const pageLim =
            response.data.totalEstimatedMatches &&
            Math.min(20, response.data.totalEstimatedMatches / 20);
          if (pageLim) {
            setPageCount(pageLim);
          }
        })
        .catch(function (error) {
          console.error(error.response);
        });
    }
  }, [page]);
  useEffect(() => {
    if (term) {
      const queryTerm = term.split(" ").join("-");
      setSuggesting(false);
      setotherarticles(false);
      let sortby = sortBy[Math.floor(Math.random() % sortBy.length)];
      let options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news/search",
        params: {
          offset: offset,
          q: queryTerm,
          count: "20",
          // sortBy: { sortby },
          setLang: "english",
          textFormat: "Raw",
          safeSearch: "Strict",
          originalImg: true,
        },
        headers: {
          "accept-language": "english",
          "x-bingapis-sdk": "true",
          "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
          "x-rapidapi-key":
            "b8d8d0450cmsh3237aa422af86dfp134a6bjsn21c78dc82a2a",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          setData(response.data);
          const pageLim =
            response.data.totalEstimatedMatches &&
            Math.min(20, response.data.totalEstimatedMatches / 20);
          if (pageLim) {
            setPageCount(pageLim);
          }
        })
        .catch(function (error) {
          console.error(error.response);
        });
    }
  }, [term, page]);

  let timeoutId;
  const changePage = ({ selected }) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setData();
    timeoutId = setTimeout(() => {
      setPage(selected);
      setoffset(offset + 20);
    }, 1000);
  };
  return (
    <>
      <Header />
      <div className={newsstyles.showcase}>
        <div className={newsstyles.overlay + " " + "px-5"}>
          <div className="text-4xl font-bold text-white mb-4 text-center">
            <h1>News Articles</h1>
          </div>
          <Search
            searchtext={(text) => {
              setTerm(text);
            }}
            className="px-5 pt-10 pb-20 "
          />
        </div>
      </div>
      <div className={newsstyles.bodyy}>
        {suggesting ? (
          <h4 className="px-5 pt-10 pb-20 ">Suggested articles:</h4>
        ) : otherarticles ? (
          <h4 className="px-5 pt-10 pb-20 ">Other articles :</h4>
        ) : (
          <h4 className="px-5 pt-10 pb-20 ">Search Results for {term} :</h4>
        )}
        <div className={newsstyles.all__news}>
          {data
            ? data.value.map((news) => (
                <div className={newsstyles.news}>
                  <img
                    src={news.image ? news.image.contentUrl : ""}
                    className={newsstyles.news__image}
                    alt="Image Not Found"
                    onerror="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX9JgRB8c-unjPmV8cuIw2S_kGq3uMI21CkA&usqp=CAU'"
                  />
                  <div className={`${newsstyles.contentWrapper}`}>
                    <h3 className={newsstyles.news__title}>{news.name}</h3>
                    <p className={newsstyles.news__desc}>
                      {news.description}
                      <a
                        href={news.url}
                        className={newsstyles.readmore}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        Read more{" "}
                      </a>
                    </p>
                    <span className={newsstyles.news__author}>
                      {news.provider[0].name}
                    </span>{" "}
                    <br />
                    <span className={newsstyles.news__published}>
                      {news.datePublished
                        .substring(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")}
                    </span>
                    <span className={newsstyles.news__source}>
                      {news.provider[0].name}
                    </span>
                  </div>
                </div>
              ))
            : "Loading"}
        </div>
        <br />
        <br />
        <ReactPaginate
          style={{ margin: "auto" }}
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={newsstyles.paginationBttns}
          previousLinkClassName={newsstyles.previousBttn}
          nextLinkClassName={newsstyles.nextBttn}
          disabledClassName={newsstyles.paginationDisabled}
          activeClassName={newsstyles.paginationActive}
        />
      </div>
    </>
  );
};
export default News2;
