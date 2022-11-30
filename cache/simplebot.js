const fs = require("fs");
const { keep_alive } = require("./keep_alive.js");
const http = require('https');
const login = require("fca-unofficial");
const cd = {};
const msgs = {};
const request = require('request');
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");

let admin = ['100081144393297'];

let prefix = ".";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY="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",
});

async function ai(prompt_msg){
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion("text-davinci-001", {
    prompt: prompt_msg,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["input:"],
});
return response.data;
}

login({ appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) }, (err, api) => {
    if (err) return console.error(err);
    api.setOptions({ listenEvents: true });
    const listenEmitter = api.listen(async (err, event) => {
        if (err) return console.error(err);
        
        switch (event.type) {
            case "message":
            if (admin.includes(event.senderID)){
            if (event.body != null) {
            let message = event.body;             
	if(message.startsWith("Hello")) {
		api.sendMessage("Hi", event.threadID);
    }
	if(message.startsWith("Hi")) {
		api.sendMessage("Hello", event.threadID);
    } 
    
      else if (message.startsWith(`Jerome`)) {
      	  const config = {
      	      name: "Simsimini Reply", 
                creator: "libyzxy0", 
                link: "https://liby0.vercel.app/7fe7",
                credits: "https://simsimi.net"
                
        	} 
            if (config.author == "libyzxy0") {
            let data = message.split(" ");
            if (data.length < 2) {
                api.sendMessage("Bakit", event.threadID, event.messageID);
            } else {
                try {
                    data.shift()
                    let txt = data.join(" ");
                axios.get(`https://api.simsimi.net/v2/?text=${txt}&lc=ph&cf=false&name=Joyce`)
                        .then(response => {
api.sendMessage(response.data['success'], event.threadID, event.messageID);
                        })
                } catch (err) {
                    api.sendMessage(`[ ERR ] ${err.message}`, event.threadID, event.messageID);
                    }
                }
               } 
          }
              
    
          
//End
    } 
   }
  }   
 });
});
