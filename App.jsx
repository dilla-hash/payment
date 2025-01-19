import React from 'react'; 
import axios from 'axios';

function App() {
 const [orderId, setOrderId] = useState('');
 const [grossAmount, setGrossAmount] = useState('');
 const [customerName, setCustomerName] = useState('');

 const handlePayment = async () => {
  const response = await axios.post('http://localhost:5000/create-transaction', {
    orderId: `ORDER-${new Date().getTime()}`,
    grossAmount: parseInt(grossAmount),
    customerDetails: {
      first_name: customerName,
    },
  });

  const { token } = response.data;

  window.snap.pay(token, {
    onSucces: (result) => alert('Pembayaran berhasil', result),
    onPending: (result) => alert('Pembayaran pending', result),
    onFail: (result) => alert('Pembayaran gagal', result),
  });
  };

  return(
    <div>
      <h1>Donation App</h1>
      <input type="text" placeholder="Nama" value={customerName} onChange={(e) => setCustomerName(e.target.value)}/>
      <input type="text" placeholder="Jumlah Donasi" value={grossAmount} onChange={(e) => setGrossAmount(e.target.value)}/>
      <button onClick={handlePayment}>Bayar</button>
    </div>
  )
 };


export default App;
