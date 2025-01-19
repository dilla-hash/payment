const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const midtransClient = require('midtrans-client');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;

// midtrans snap instance
const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-s2f-QkxZeInezy_PrHhW9Zo_',
    clientKey: 'SB-Mid-client-YmtgStcV0_W9U9Wx',
});

//create transaction toke
app.post('/create-transaction', async (req, res) => {
    const {orderId, grossAmount, customerDetails} = req.body;

    const parameter = {
        transaction_details: {
            order_id: orderId,
            gros_amount: grossAmount,
        },
        customer_details: customerDetails,
    };
    try {
        const transaction = await snap.createTransaction(parameter);
        res.json(transaction);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.listen(PORT, () => console.log(`server berjalan di port ${PORT}`));