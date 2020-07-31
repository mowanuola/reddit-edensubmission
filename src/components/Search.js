import React, { useEffect, useState } from "react";
import { Posts } from "./Posts";

export const Search = () => {
  const [posts, setPosts] = useState({
    cards: null,
    sort: false,
  });
  useEffect(() => {
    const data = async () => {
      fetch("https://www.reddit.com/.json", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then(({ data }) => {
          setPosts({ ...posts, cards: data.children });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    data();
  }, []);
  const [search, setSearch] = useState({
    query: "",
    message: "",
  });
  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    setPosts({ ...posts, sort: !posts.sort });
  };
  const searchPosts =
    posts.cards !== null &&
    posts.cards.filter((post) => {
      return post.data.title.toLowerCase().includes(search.query);
    });
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-10">
          <div className="row mb-4">
            <input
              type="text"
              className="form-control col-6"
              name="query"
              value={search.query}
              onChange={handleChange}
            />
            <div className="col-2 d-flex align-items-end">
              <button className="btn btn-md">Search</button>
            </div>
          </div>
        </div>
        <div className="col-2 text-right">
          <p>
            <input type="checkbox" onClick={handleClick} />
            Sort by {!posts.sort ? "Descending" : "Ascending"}
          </p>
        </div>
      </div>
      <Posts posts={searchPosts} sort={posts.sort} />
    </div>
  );
};
