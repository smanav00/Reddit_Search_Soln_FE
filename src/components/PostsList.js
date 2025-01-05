import React from "react";

const PostsList = ({ posts, loading, currentPage }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (posts.length === 0 && currentPage === 1) {
    return <p>No results found. Try a different search.</p>;
  }

  return (
    <div className="posts-list">
      {posts.map((post, index) => (
        <div key={index} className="post-item">
          <h3>{post.title}</h3>
          <p className="desc">
            {post.selftext
              ? post.selftext.length > 100
                ? `${post.selftext.slice(0, 100)}...`
                : post.selftext
              : "No description available." || "No description available."}
          </p>
          <div className="post_foot">
            <p>
              By: <b>{post.author}</b> - <b>{post.num_comments}</b> Comments,{" "}
              <b>{post.ups}</b>
              👍
            </p>
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
