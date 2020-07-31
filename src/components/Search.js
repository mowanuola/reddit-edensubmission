import React, { useEffect, useState } from "react";
import { Posts } from "./Posts";

export const Search = () => {
  const [posts, setPosts] = useState({
    cards: null,
    sort: false,
  });
  const [search, setSearch] = useState({
    query: "",
  });
  const [filter, setFilter] = useState({
    date: "",
    upvotes: "",
  });
  const [searchPosts, setSearchPosts] = useState(null);
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
  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    setSearchPosts(
      posts.cards !== null &&
        posts.cards.filter((post) => {
          return post.data.title.toLowerCase().includes(search.query);
        })
    );
  };
  
  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  const handleClear = () => {
    setFilter({ date: "", upvotes: "" });
    setSearch({ query: "" });
    setSearchPosts(posts.cards);
  };

  const handleClick = () => {
    setPosts({ ...posts, sort: !posts.sort });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, upvotes } = filter;
    let format = new Date(Date.parse(date));
    if (date) {
      setSearchPosts(
        posts.cards !== null &&
          posts.cards.filter((post) => {
            let day = new Date(post.data.created_utc * 1000);

            return (
              day.toLocaleDateString("en-US") ===
              format.toLocaleDateString("en-US")
            );
          })
      );
    } else if (upvotes) {
      setSearchPosts(
        posts.cards !== null &&
          posts.cards.filter((post) => {
            return post.data.ups === parseInt(upvotes);
          })
      );
    } else {
      return searchPosts;
    }
  };

  return (
    <div className="container mt-4">
      <form className="row mb-3" onSubmit={handleSubmit}>
        <div className="col-4">
          <input
            type="date"
            className="form-control"
            name="date"
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-4">
          <input
            type="number"
            className="form-control"
            name="upvotes"
            placeholder="Filter by upvotes..."
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-2 d-flex align-items-end">
          <button className="btn">Filter</button>
        </div>
        <div className="col-2 d-flex align-items-end">
          <button className="btn clear" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
      <div className="row ">
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
              onChange={handleSearchChange}
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

      <Posts posts={searchPosts || posts.cards} sort={posts.sort} />
    </div>
  );
};
