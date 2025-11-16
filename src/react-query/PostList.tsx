import { Fragment, useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 3;
  const { data: posts, error, isLoading, fetchNextPage, isFetchingNextPage } = usePosts({
    pageSize,
  });

  if (posts === undefined) return <p>No posts. Check back later.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <h3>Posts</h3>
      <ul className="list-group">
        {posts.pages.map((page) => (
          <Fragment key={page[0].id}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                <h5>{post.title}</h5>
                <p>{post.body}</p>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      <div className="mt-3">
        <button
          className="btn btn-primary"
          disabled={isFetchingNextPage}
          onClick={() => {
            // Logic to fetch next page would go here
            fetchNextPage();
          }}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </>
  );
};

export default PostList;
