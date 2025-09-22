import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice.js";

const products = [
  { 
    id: 1, 
    name: "Áo Len Nam Cotton", 
    price: 450000, 
    image: "https://2885371169.e.cdneverest.net/pub/media/catalog/product/8/t/8te25w001-sb246-l-1-u.webp" 
  },
  { 
    id: 2, 
    name: "Giày Sneaker Thể Thao", 
    price: 890000, 
    image: "https://hoangphuconline.vn/media/magefan_blog/2021/12/giay-the-thao-nam-sneaker-vai-khu-mui.jpg" 
  },
  { 
    id: 3, 
    name: "Túi Laptop Cao Cấp", 
    price: 1200000, 
    image: "https://cdn.tgdd.vn/Products/Images/7923/327934/tui-chong-soc-macbook-pro-14-inch-tomtoc-a14d2b1-150724-073251-600x600.jpg" 
  },
];

export default function Home(){
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <div className="grid" style={{gridTemplateColumns:'repeat(3,1fr)', gap:20}}>
        {products.map(p => (
          <div className="product-card" key={p.id} style={{padding:10, border:'1px solid #ddd', borderRadius:8}}>
            <img 
              src={p.image} 
              alt={p.name} 
              style={{width:"100%", height:150, objectFit:"cover", borderRadius:8}} 
            />
            <h3>{p.name}</h3>
            <p style={{fontWeight:700}}>{p.price.toLocaleString()} ₫</p>
            <div style={{display:'flex', gap:8}}>
              <button className="button" onClick={()=>dispatch(addToCart({...p, quantity:1}))}>
                Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
