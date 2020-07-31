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
        <div className="col-8">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                <i class="fas fa-search" style={{ color: "#ff4500 " }}></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control col-6"
              name="query"
              value={search.query}
              onChange={handleChange}
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="col-4 text-right">
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
