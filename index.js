const twilio = require('twilio');
const axios = require("axios").default;
const express = require('express');
const { send } = require('express/lib/response');

const app = express();
require('dotenv').config();
const lastMessage = {txt:"",author:"",sid:"",when:""};
const PORT = process.env.PORT || 3000;

async function sentWhatsAppMessage(msg)
{
    try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    const msgResponse =   await client.messages.create({
      from: `whatsapp:${process.env.FROM_PHONE_NUMBER}`,
      body: msg,
      to: `whatsapp:${process.env.TO_PHONE_NUMBER}`   
    });

    lastMessage.sid = msgResponse.sid;
    const dt = new Date();
    lastMessage.when = `${dt.getDate()}-${dt.getMonth()}-${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;

  } catch (error) {
    throw error;
    }
}

async function sendquote()
{
var options = {
  method: 'GET',
  url: 'https://world-of-quotes.p.rapidapi.com/v1/quotes/quote-of-the-day',
  params: {category: 'inspirational'},
  headers: {
    'x-rapidapi-host': 'world-of-quotes.p.rapidapi.com',
    'x-rapidapi-key': process.env.RAPID_API_KEY
  }
};

try {
  const response = await axios.request(options);
  lastMessage.txt = response.data.quote;
  lastMessage.author = response.data.author;
  await sentWhatsAppMessage(`${response.data.quote}\n---${response.data.author}`);  
} catch (error) {
  throw error;
}
}

app.get('/',async (req,res)=>
{
  try 
  {
  if(lastMessage.sid)
{
  lastMessage.txt = lastMessage.txt.replace("\n",'<br />'); 
  res.send(`<div style="text-align:center;margin-top:25vw;font-family: Arial, Helvetica, sans-serif;font-size:2rem"><blockquote">${lastMessage.txt}<cite><span style="font-size:1.5rem"><br/>&quot;${lastMessage.author}&quot;</span></cite><span style="font-size:0.8rem"><br/>${lastMessage.when}</span></blockquote></div>`)
}
else{
res.send('<div style="text-align:center;margin-top:25vw;font-family: Arial, Helvetica, sans-serif;font-size:2rem"><blockquote>No Msg As Of Now</blockquote></div>')
}
}
catch(error)
{
console.log(error);
res.status(500).send("Some error occured, please check back later");
}
});


setInterval(async ()=>{
await sendquote();
},18000000);//every 5 hours

app.listen(PORT,()=>{console.log(`Server Listening On Port ${PORT}`)});