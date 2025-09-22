import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice.js";
import { Link } from "react-router-dom";

export default function CartPage(){
  const items = useSelector(s=>s.cart.items);
  const dispatch = useDispatch();
  const subtotal = items.reduce((s,i)=>s+i.price*i.quantity,0);

  return (
    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16}}>
      <div>
        <h2>Giỏ hàng</h2>
        {items.length===0 ? <p>Giỏ hàng trống</p> : (
          <>
            {items.map(it=>(
              <div key={it.id} style={{background:'#fff', padding:12, marginBottom:8, borderRadius:8}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:700}}>{it.name}</div>
                    <div>{it.price.toLocaleString()} ₫</div>
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <input type="number" value={it.quantity} min="1" style={{width:64}} onChange={(e)=>dispatch(updateQuantity({id:it.id, quantity: Number(e.target.value)}))}/>
                    <button className="btn-secondary" onClick={()=>dispatch(removeFromCart(it.id))}>Xóa</button>
                  </div>
                </div>
              </div>
            ))}
            <div style={{marginTop:12}}>
              <button className="btn-secondary" onClick={()=>dispatch(clearCart())}>Xóa toàn bộ</button>
            </div>
          </>
        )}
      </div>

      <aside className="right-panel">
        <h3>Tóm tắt đơn hàng</h3>
        <p>Tạm tính: {subtotal.toLocaleString()} ₫</p>
        <p>Phí vận chuyển: {subtotal > 500000 ? "Miễn phí" : "30,000 ₫"}</p>
        <h3>Tổng: {(subtotal + (subtotal>500000?0:30000)).toLocaleString()} ₫</h3>
        <div style={{marginTop:8}}>
          <Link to="/checkout"><button className="button" disabled={items.length===0}>Tiến hành thanh toán</button></Link>
        </div>
      </aside>
    </div>
  );
}
