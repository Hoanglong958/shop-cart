
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice.js";

// Redux slice cho posts
// Tạo file src/redux/postsSlice.js nếu chưa có
// import { fetchPosts } from '../redux/postsSlice';
import { fetchPosts } from "../redux/postsSlice";


export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.items);
  const loading = useSelector(state => state.posts.loading);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <h2>Danh sách bài viết (posts)</h2>
      {loading && <p>Đang tải...</p>}
      {error && <p style={{color:'red'}}>Lỗi: {error}</p>}
      <div className="grid" style={{gridTemplateColumns:'repeat(3,1fr)', gap:20}}>
        {posts.map(post => (
          <div className="product-card" key={post.id} style={{padding:10, border:'1px solid #ddd', borderRadius:8}}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {/* Nút thêm vào giỏ chỉ là ví dụ, bạn có thể bỏ nếu không cần */}
            <div style={{display:'flex', gap:8}}>
              <button className="button" onClick={()=>dispatch(addToCart({...post, quantity:1}))}>
                Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
