import express from 'express'
import 'dotenv/config' // to use environment variables
import cors from 'cors' // to connect backend with frontend

// create express application
const app = express();

// built in middleware
app.use(cors());
app.use(express.json());

// routes
// home route
app.get('/', (req, res)=>{
    res.send("API is working");
})

const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{
    console.log("Server running on port: "+ PORT);
})
export default app;