import React, { useState } from "react";
import axios from "axios";
import SearchForm from "./components/SearchForm";
import PostsList from "./components/PostsList";
import PaginationControls from "./components/PaginationControls";
import "./style.css";

const App = () => {
  const [subreddit, setSubreddit] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("hot");
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState(null);
  const [before, setBefore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPosts = async (afterCursor = null, beforeCursor = null) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.get(
        // "http://localhost:5000/api/reddit/posts",
        "https://reddit-search-soln-be.onrender.com/api/reddit/posts",
        {
          params: {
            subreddit,
            keyword,
            sort,
            limit: 10,
            before: beforeCursor,
            after: afterCursor,
          },
        }
      );

      setPosts(response.data.posts);
      setAfter(response.data.after);
      setBefore(response.data.before);
    } catch (error) {
      console.error(error);
      setErrorMessage("No such Subreddit exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Reddit Keyword Search</h1>
      <SearchForm
        subreddit={subreddit}
        setSubreddit={setSubreddit}
        keyword={keyword}
        setKeyword={setKeyword}
        sort={sort}
        setSort={setSort}
        fetchPosts={() => fetchPosts()}
        setCurrentPage={setCurrentPage}
        loading={loading}
      />
      {errorMessage ? (
        <p className="error">{errorMessage}</p>
      ) : (
        <PostsList posts={posts} loading={loading} currentPage={currentPage} />
      )}
      <PaginationControls
        currentPage={currentPage}
        handleNextPage={() => {
          if (after) {
            console.log("after: ", after);

            setCurrentPage((prev) => prev + 1);
            fetchPosts(after, null);
          }
        }}
        handlePreviousPage={() => {
          console.log("before: ", before);

          if (before) {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
            fetchPosts(null, before);
          }
        }}
        after={after}
        before={before}
        loading={loading}
      />
    </div>
  );
};

export default App;
