import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../redux/cartSlice.js";

const StepOne = ({onNext, defaultValues}) => {
  const { register, handleSubmit, formState:{errors} } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div>
        <label>Họ và tên</label><br/>
        <input {...register('name',{required:'Bắt buộc'})} />
        {errors.name && <div style={{color:'red'}}>{errors.name.message}</div>}
      </div>
      <div>
        <label>Email</label><br/>
        <input {...register('email',{required:'Bắt buộc', pattern:{ value:/^\S+@\S+$/i, message:'Email không hợp lệ' }})} />
        {errors.email && <div style={{color:'red'}}>{errors.email.message}</div>}
      </div>
      <div style={{marginTop:8}}>
        <button className="button" type="submit">Tiếp tục</button>
      </div>
    </form>
  );
};

const StepTwo = ({onNext, onBack, defaultValues}) => {
  const { register, handleSubmit, formState:{errors} } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div>
        <label>Địa chỉ</label><br/>
        <input {...register('address',{required:'Bắt buộc', minLength:{value:5, message:'Ít nhất 5 ký tự'}})} />
        {errors.address && <div style={{color:'red'}}>{errors.address.message}</div>}
      </div>
      <div style={{marginTop:8}}>
        <button className="btn-secondary" type="button" onClick={onBack}>Quay lại</button>
        <button className="button" type="submit" style={{marginLeft:8}}>Tiếp tục</button>
      </div>
    </form>
  );
};

const StepThree = ({onNext, onBack, defaultValues}) => {
  const { register, handleSubmit } = useForm({ defaultValues });
  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div>
        <label>Phương thức thanh toán</label><br/>
        <select {...register('payment')}>
          <option value="card">Thanh toán bằng thẻ</option>
          <option value="cod">Thanh toán khi nhận hàng</option>
        </select>
      </div>
      <div style={{marginTop:8}}>
        <button className="btn-secondary" type="button" onClick={onBack}>Quay lại</button>
        <button className="button" type="submit" style={{marginLeft:8}}>Xác nhận</button>
      </div>
    </form>
  );
};

export default function CheckoutPage(){
  const items = useSelector(s=>s.cart.items);
  const subtotal = items.reduce((s,i)=>s+i.price*i.quantity,0);
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const next = (data) => { setFormData(prev=>({...prev,...data})); setStep(s=>s+1); };
  const back = () => setStep(s=>s-1);

  const confirmOrder = (data) => {
    const order = {...formData, ...data, items, total: subtotal + (subtotal>500000?0:30000)};
    dispatch(placeOrder(order));
    alert('Đặt hàng thành công! Tổng: ' + order.total.toLocaleString() + ' ₫');
    setStep(1);
  };

  return (
    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16}}>
      <div>
        <div className="steps">
          <div className={`step ${step===1 ? 'active':''}`}>1. Thông tin</div>
          <div className={`step ${step===2 ? 'active':''}`}>2. Địa chỉ</div>
          <div className={`step ${step===3 ? 'active':''}`}>3. Thanh toán</div>
        </div>

        <div style={{background:'#fff', padding:16, borderRadius:8}}>
          {step===1 && <StepOne onNext={next} defaultValues={formData} />}
          {step===2 && <StepTwo onNext={next} onBack={back} defaultValues={formData} />}
          {step===3 && <StepThree onNext={confirmOrder} onBack={back} defaultValues={formData} />}
        </div>
      </div>

      <aside className="right-panel">
        <h3>Tóm tắt</h3>
        <p>Sản phẩm: {items.length}</p>
        <p>Tạm tính: {subtotal.toLocaleString()} ₫</p>
        <p>Phí ship: {subtotal>500000 ? 'Miễn phí' : '30,000 ₫'}</p>
        <h3>Tổng: {(subtotal + (subtotal>500000?0:30000)).toLocaleString()} ₫</h3>
      </aside>
    </div>
  );
}
