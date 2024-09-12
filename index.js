import express from "express"
import bodyParser from "body-parser";
import axios from 'axios';

const app = express();
const port = 3000
const API_URL = "https://api.livecoinwatch.com/coins/list";
const API_KEY = "c9a4b9c5-2d6e-4bba-bfc0-b73541a64ecf"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))


app.get("/", async (req, res) => {
    try{
        const response = await axios.post(API_URL, {
            currency: 'USD',
            sort: 'rank',
            order: 'ascending',
            offset: 0,
            limit: 50,
            meta: false
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            }
        });
        
        const coins = response.data
        const bitcoin = coins.find(coin => coin.code === 'BTC')
        const Etherium = coins.find(coin => coin.code === 'ETH')
        const USDT = coins.find(coin => coin.code === 'USDT')
        const BNB = coins.find(coin => coin.code === 'BNB')

        res.render("index.ejs", { bitcoin, Etherium, USDT, BNB })

    }catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
  