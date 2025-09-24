// src/pages/PostsPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postSlice.js";

export default function PostsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === "loading") return <p>Đang tải dữ liệu...</p>;
  if (status === "failed") return <p>Lỗi: {error}</p>;

  return (
    <div>
      <h2>Danh sách Bài Viết</h2>
      <ul>
        {items.slice(0, 10).map((post) => (
          <li key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
