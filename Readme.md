# Inspirational Quotes Whatsapp Bot Using Twilio & Rapid API

Live On Heroku: [https://twilio-whapp-bot.herokuapp.com/](https://twilio-whapp-bot.herokuapp.com/)


This bot sends inspiration quotes to your Whatsapp number every 5 hours using twilio api. Quote is pulled from a api listed on rapidapi and then same is sent to twilio which then sends it to your phone. Also last sent msg can be seen in the index page, since this running on a node server.

5 hours interval was selected as we do not want to tax the limit on free Whatsapp api provided by Twilio. Also there is such thing as too much inspirational quotes. 


Right now it sends quotes to only one number mentioned in the env file. You can send msgs to multiple number once you link them to your twilio sandbox. Process is mentioned in the twilio docs(they need to ping in whatsapp to your sandbox phone number is what i understood).

   

## bot requirements in env file
---
TWILIO_ACCOUNT_SID=from twilio.com  
TWILIO_AUTH_TOKEN=from twilio.com  
RAPID_API_KEY=from [rapidapi.com](rapidapi.com)  
FROM_PHONE_NUMBER=This will be your twilio sandbox number in a free trail account   
TO_PHONE_NUMBER=This is the number you want to send quotes to.  
PORT=change as per your requirement.  
NODE_ENV=production


## Web Screenshot
![Web Screenshot](docs/images/web.png?raw=true)

## Phone Whatsapp Screenshot
![Web Screenshot](docs/images/phone.jpg?raw=true)


## CAUTION
Please note this was delployed to heroku which shuts down your app after 30 mins of inactivity, which means the 5 hour interval will not work unless we keep sending requests to your deployed to keep it alive. Also Twilio free tier wants you to do revalidate your sandbox after 72 hours which means you will have to do this extra step again and again. ***Best*** way will be deploy node js code to some other cloud solution, like digital ocean droplet and put some minimal money in your twilio account to get rid of all these restrictions.


You can club this bot code with any seperate api or your custom solution. [RapidApi.com](RapidApi.com) has a great collection of amazing api endpoints.
