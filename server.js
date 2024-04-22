import 'dotenv/config';
import cors from "cors";
import express from "express";


const PORT = 8000
const app = express()
app.use(express.json())
app.use(cors())

// eslint-disable-next-line no-undef
const API_KEY = process.env.OPENAI_API_KEY

app.post(`/completions`, async (req, res) => {

    const options= {
        method:"POST",
        headers:{
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            model:"gpt-3.5-turbo",
            messages: [{role:"user", content:req.body.message}],
            max_tokens:1000,
        })
    }

    try{
          const response = await fetch(`https://api.openai.com/v1/chat/completions`, options) 
          const data = await response.json()
          res.send(data)
    } catch(error){
              console.log(error)      
    }
    
})

app.listen(PORT, () => console.log("Your server is running on PORT"+ PORT ))