import React from "react";

const SearchForm = ({
  subreddit,
  setSubreddit,
  keyword,
  setKeyword,
  sort,
  setSort,
  fetchPosts,
  loading,
  setCurrentPage,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPosts(); // Fetch the first page
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Subreddit (e.g., technology)"
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Keyword (e.g., AI)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      />
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="" disabled>
          Sort by
        </option>
        <option value="hot">Hot</option>
        <option value="new">New</option>
        <option value="top">Top</option>
        {/* <option value="controversial">Controversial</option>
        <option value="rising">Rising</option> */}
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
    </form>
  );
};

export default SearchForm;
