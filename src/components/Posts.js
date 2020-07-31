import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { Card } from "../ui";
import { Loader } from "./Loader";

export const Posts = ({ posts, sort }) => {
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setitemsCountPerPage] = useState(3);
  const indexOfLastPost = activePage * itemsCountPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsCountPerPage;
  const currentPosts = posts && posts.slice(indexOfFirstPost, indexOfLastPost);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const formatDate = (date) => {
    let day = date * 1000;
    return new Date(day).toDateString();
  };
  const formatNumber = (number) => {
    let nfObject = new Intl.NumberFormat("en-US");
    return nfObject.format(number);
  };

  return (
    <div>
      {posts !== false ? (
        !sort ? (
          currentPosts
            .sort((a, b) => a.data.ups - b.data.ups)
            .map((item) => (
              <Card
                header={item.data.subreddit}
                title={item.data.title}
                image={item.data.thumbnail}
                subtitle={formatNumber(item.data.ups)}
                link={item.data.url}
                date={formatDate(item.data.created_utc)}
              />
            ))
        ) : (
          currentPosts
            .sort((a, b) => b.data.ups - a.data.ups)
            .map((item) => (
              <Card
                header={item.data.subreddit}
                title={item.data.title}
                image={item.data.thumbnail}
                subtitle={formatNumber(item.data.ups)}
                link={item.data.url}
                date={formatDate(item.data.created_utc)}
              />
            ))
        )
      ) : (
        <Loader className="d-flex justify-content-center align-self-center" />
      )}
      <Pagination
        hideDisabled
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={posts && posts.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </div>
  );
};
