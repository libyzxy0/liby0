const fs = require("fs");
const { keep_alive } = require("./keep_alive.js");
const http = require('https');
const login = require("fca-unofficial");
const axios = require("axios");
const request = require('request');
const cd = {};
const msgs = {};
const { Configuration, OpenAIApi } = require("openai");

//________________Config Varriables________________
let admin = [
'100084389502600', //Bot uid
'100081144393297'
];

//People who saiji knowns
let saijiKnowns = [
'100081144393297', 
'100049906099961', 
'100051330130511', 
'100066325386760', 
'100086626355512',
'100085474776785',
'100029962340759', 
'100025001870534',
'100027037117607'
];

let prefix = ">";

//________________Functions________________

async function getWiki(q) {
  out = await axios.get("https://en.wikipedia.org/api/rest_v1/page/summary/" + q).then((response) => { return response.data}).catch((error) => { return error })
  return out
}
async function qt() {
    let qoute = await axios.get("https://zenquotes.io/api/random").then((response) => { return response.data[0] }).catch((err) => { return "err " });
    return qoute
}

async function verse(){
    let v = await axios.get("http://labs.bible.org/api/?passage=random&type=json").then((response) => {
        return response.data[0]
    }).catch((err) => {
        return "Error"
    })
    return v
}
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

//________________Login Account________________
login({ appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) }, (err, api) => {
    if (err) return console.error(err);
    api.setOptions({ listenEvents: true });
    const listenEmitter = api.listen(async (err, event) => {
        if (err) return console.error(err);
        switch (event.type) {
        	
//________________Reply Messages________________
        	case "message_reply":
        
        let msgid = event.messageID;
        let input = event.body;
        msgs[msgid] = input;
//________________Unsend a Message________________
        if(input.startsWith(`${prefix}unsent`)){
              let data = input.split(" ");
              if(data.length < 5){
                api.getUserInfo(event.senderID, (err, data) => {
                  if (err) return console.error(err);
                  else {
                   
                    api.getUserID(event.messageReply.messageID, (err,data) =>{
                    	
                      api.unsendMessage(event.messageReply.messageID);
                      
                      if (event.messageReply.senderID != api.getCurrentUserID())
                        return api.sendMessage("[ ERR ] Can't unsent message that aren't from the bot!", event.threadID, event.messageID);
                    });
                  }
                });
              }
}  
//________________Sended Messages________________
            case "message":
//________________Spam Reaction________________
if (admin.includes(event.senderID)) {
                     api.setMessageReaction("💚", event.messageID, (err) => {
                  }, true);
                  }
                  else {
                  api.setMessageReaction("👍", event.messageID, (err) => {
                      
                  }, true);
                  }
                if (event.attachments.length != 0) {
                    if (event.attachments[0].type == "photo") {
                        msgs[event.messageID] = ['img', event.attachments[0].url]
                    }
                    else if (event.attachments[0].type == "animated_image") {
                        msgs[event.messageID] = ['gif', event.attachments[0].url]
                    }
                     else if (event.attachments[0].type == "sticker") {
                        msgs[event.messageID] = ['sticker', event.attachments[0].url]
                    }
                    else if (event.attachments[0].type == "video") {
                        msgs[event.messageID] = ['vid', event.attachments[0].url]
                    }
                    else if (event.attachments[0].type == "audio") {
                        msgs[event.messageID] = ['vm', event.attachments[0].url]
                    }
                } else {
                    msgs[event.messageID] = event.body
                }
                if (event.body != null) {
                    let input = event.body;

                    if(input.startsWith("command")){
                    }
                    
// Error command thrower
else if (input == (`${prefix}`)) {
	api.sendMessage(`Error please type '${prefix}help' to show cmd list.`, event.threadID, event.messageID);
}                    
//________________Help List________________
else if (input == (`${prefix}help`)) {
    let rqt = qt();
    rqt.then((response) => {
        api.sendMessage({
body:`｢Saiji Commands｣\n\n\n• ${prefix}waifu\n\n• ${prefix}cosplay\n\n• ${prefix}loli\n\n• ${prefix}milf\n\n• ${prefix}uwu\n\n• ${prefix}wiki\n\n• ${prefix}bible\n\n• ${prefix}info\n\n• ${prefix}catfact\n\n• ${prefix}dogfact\n\n• ${prefix}qtt\n\n• ${prefix}binary\n\n• ${prefix}repeat\n\n• ${prefix}uid\n\n• ${prefix}unsent\n\n• ${prefix}groups\n\n• ${prefix}fact\n\n• ${prefix}lyrics\n\n• ${prefix}sai\n\n• ${prefix}baybayin\n\n• ${prefix}morse\n\n• ${prefix}docs\n\n\nQOTD » ${response.q}`
        }, event.threadID, event.messageID);
  })
}
//________________Info List________________                  
else if (input.startsWith(`${prefix}info`)) {
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                        api.getUserID("libyzxy0", (err,data) =>{
                                api.sendMessage({
                                    body: `｢Saiji Info｣\n\nSaiji is a Facebook messenger chat bot made using NodeJS.\n\nCreated by ` + 'Jan Liby Dela Costa' + `\n\n｢Saiji Features｣\n\n» Anti Unsent\n\n» Auto Reply\n\n» Auto Reaction\n\n» Answer Any Questions\n\n» Solving Math\n\n» Fun\n\n｢Api Used｣\n\n» Fca-unofficialAPI\n\n» HerokumemeAPI\n\n» SomerandomAPI\n\n» Simsimini.netAPI\n\n» ZenquotesAPI\n\n» OpenAiAPI\n\n» Bible.orgAPI\n\n» WikipediaAPI\n\n｢Developers that help｣\n\n» Marvin Saik\n\n» Mark Agero`,
                                    mentions: [{
                                        tag: 'Jan Liby Dela Costa',
                                        id: data[1].userID,
                                    }]
                                }, event.threadID,event.messageID);
                            });
                            
                            }
                            
                            }
                            
else if (input.startsWith(`${prefix}docs`)) {
    api.sendMessage(`If you don't know how to use saiji, kindy read her documentation on the link below ;)\n\nhttps://liby0.vercel.app/saijidocumentations`, event.threadID, event.messageID)
}                            
                            
if(input.startsWith(`${prefix}sai`)) {
    let data = input.split(`${prefix}sai `);
    if (data.length < 2) {
       api.sendMessage(`⚠️Invalid Use Of Command!\n💡Usage : ${prefix}sai [Your Question]`, event.threadID, event.messageID);
    } else {     
    let a = ai(data[1])
    a.then((response) => {
        api.sendMessage(response.choices[0].text, event.threadID, event.messageID);
    })
  }
}
                            
//________________Talk to Saiji________________
else if (input.startsWith("Sai")) {
            let data = input.split(" ");
            if (data.length < 2) {
                if (saijiKnowns.includes(event.senderID)){
                	api.setMessageReaction("😍", event.messageID, (err) => {}, true);
                	api.sendMessage("Bakit lolovesss??", event.threadID, event.messageID);
	} else {
		api.setMessageReaction("🖕", event.messageID, (err) => {}, true);
		api.sendMessage("Bakit nnmn?, tanginamo.", event.threadID, event.messageID);
    } 
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


else if (input.startsWith(`${prefix}test`)) {
	if (admin.includes(event.senderID)){
	    api.sendMessage("Active!", event.threadID, event.messageID);
	} else {
		api.sendMessage("You don't have permission to use this command!", event.threadID, event.messageID);
    } 
}


else if (input.startsWith(`${prefix}fact`)) {
	try {
        let axios = require('axios');
	const res = await axios.get(`https://api.popcat.xyz/fact`);
	var data = res.data;
	return api.sendMessage(`${data.fact}`, event.threadID, event.messageID);
		} catch (err) {
        return api.sendMessage(`Err ${err}`, event.threadID)
    }
}

else if (input.startsWith(`${prefix}qtt`)) {
	try {
        let axios = require('axios');
	const res = await axios.get(`https://api.popcat.xyz/pickuplines`);
	var data = res.data;
	return api.sendMessage(`${data.pickupline}`, event.threadID, event.messageID);
		} catch (err) {
        return api.sendMessage(`Err ${err}`, event.threadID)
    }
}
            
else if (input.startsWith(`${prefix}groups`)){
	var num = 0, box = "____________GROUPLIST____________\n\n";
	api.getThreadList(100, null, ["INBOX"], (err, list) => {
		list.forEach(info => {
			if (info.isGroup && info.isSubscribed) {
				box += `Group: ${info.name} \nGroupID: ${info.threadID}\n\n`;
			}			
		})
		return api.sendMessage(box, event.threadID, event.messageID);
	})
}            
            
//________________Random Bible Words________________            
else if(input.startsWith(`${prefix}bible`)){
                                    let v = verse()
                                    v.then((response) => {
                                        api.sendMessage(`${response.bookname} ${response.chapter}:${response.verse}\n\n${response.text}`, event.threadID, event.messageID)
                                    }).catch((err) => {
                                        console.log(err)
                                    })

                                    }                         
//________________Meme Picture________________
else if (input.startsWith(`${prefix}meme`)){
                                
          axios.get('https://meme-api.herokuapp.com/gimme/memes')
                  .then(response => {
                    var mention = Object.keys(event.mentions)[0];
                     var file = fs.createWriteStream("cache/memes.png");
                     var targetUrl = response.data.url;
                     var gifRequest = http.get(targetUrl, function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function () {
                           var message = {
                              body: response.data.title + "\n\nAuthor: " + response.data.author,
                              attachment: fs.createReadStream(__dirname + '/cache/memes.png')
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                           api.setMessageReaction("😆", event.messageID, (err) => {}, true);
                        });
                     });
                  })
                  .catch(error => {
                     api.sendMessage("Failed to generate Memes, please try again!", event.threadID, event.messageID);
                  })
                }
//________________Loli Anime Pictures________________                
else if (input.startsWith(`${prefix}loli`)){
                                
          axios.get('https://saikiapi.herokuapp.com/loli2')
                  .then(response => {
                    var mention = Object.keys(event.mentions)[0];
                     var file = fs.createWriteStream("cache/loli.png");
                     var targetUrl = response.data.url;
                     var gifRequest = http.get(targetUrl, function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function () {
                           var message = {
                              body: "Lolis", attachment: fs.createReadStream(__dirname + '/cache/loli.png')
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                           api.setMessageReaction("😆", event.messageID, (err) => {}, true);
                        });
                     });
                  })
                  .catch(error => {
                     api.sendMessage("Failed to generate Image, please try again!", event.threadID, event.messageID);
                  })
                }
//________________Iligal 18+ Pictures________________                
else if (input.startsWith(`${prefix}milf`)){
                                
          axios.get('https://meme-api.herokuapp.com/gimme/hentai')
                  .then(response => {
                    var mention = Object.keys(event.mentions)[0];
                     var file = fs.createWriteStream("cache/milf.png");
                     var targetUrl = response.data.url;
                     var gifRequest = http.get(targetUrl, function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function () {
                           var message = {
                              body: "————18+ content————", attachment: fs.createReadStream(__dirname + '/cache/milf.png')
                           }
                           api.sendMessage(message, event.threadID, event.messageID);
                           api.setMessageReaction("🔞", event.messageID, (err) => {}, true);
                        });
                     });
                  })
                  .catch(error => {
                     api.sendMessage("Failed to generate Image, please try again!", event.threadID, event.messageID);
                  })
                }
//________________Random Cosplay Pics________________                
else if (input.startsWith(`${prefix}cosplay`)){
                                
          axios.get('https://meme-api.herokuapp.com/gimme/cosplay')
                  .then(response => {
                    var mention = Object.keys(event.mentions)[0];
                     var file = fs.createWriteStream("cache/cosplay.png");
                     var targetUrl = response.data.url;
                     var gifRequest = http.get(targetUrl, function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function () {
                           var message = {
                              body: response.data.title, attachment: fs.createReadStream(__dirname + '/cache/cosplay.png')
                           }
                           
                           api.sendMessage(message, event.threadID, event.messageID);
                           
                           
                           
                        });
                     });
                  })
                  .catch(error => {
                     api.sendMessage("Failed to generate Image, please try again!", event.threadID, event.messageID);
                  })
                }
//________________Anime Coco Pics________________  

else if (input.startsWith(`${prefix}waifu`)) {
     try {
        let axios = require('axios');
        let fs = require("fs");
        let request = require("request");
        var res = await axios.get(`https://meme-api.herokuapp.com/gimme/waifu`);
	
	var data = res.data;
	let callback = function() {
            return api.sendMessage({
                body:`${data.title}`,
                attachment: fs.createReadStream(__dirname + `/cache/waifu.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/waifu.png`), event.messageID);
        };
		return request(encodeURI(data.url)).pipe(fs.createWriteStream(__dirname + `/cache/waifu.png`)).on("close", callback);
		} catch (err) {
        return api.sendMessage(`${err}`, event.threadID)
    }
}
           
//________________Random Tiktok Vids________________               
else if (input.startsWith(`${prefix}uwu`)) {
	try {
        let axios = require('axios');
        let fs = require("fs");
        let request = require("request");
        let {threadID, senderID, messageID} = event;
	const res = await axios.get(`https://testapi.libyzxy0.repl.co?data=tiktokvids`);
	var data = res.data;
	let callback = function() {
            return api.sendMessage({
                body:`Uwuu`,
                attachment: fs.createReadStream(__dirname + `/cache/uwu.mp4`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/uwu.mp4`), event.messageID);
        };
		return request(encodeURI(data.url)).pipe(fs.createWriteStream(__dirname + `/cache/uwu.mp4`)).on("close", callback);
		} catch (err) {
        return api.sendMessage(`Err ${err}`, event.threadID)
    }
}

//________________Dogfact________________             
else if (input.startsWith(`${prefix}dogfact`)) {
	try {
        let axios = require('axios');
        let fs = require("fs");
        let request = require("request");
        let {threadID, senderID, messageID} = event;
	const res = await axios.get(`https://some-random-api.ml/animal/dog`);
	var data = res.data;
	let callback = function() {
            return api.sendMessage({
                body:`————🐶Dog fact🐶————\n\n${data.fact}`,
                attachment: fs.createReadStream(__dirname + `/cache/dog.jpg`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/dog.jpg`), event.messageID);
        };
		return request(encodeURI(data.image)).pipe(fs.createWriteStream(__dirname + `/cache/dog.jpg`)).on("close", callback);
		} catch (err) {
        return api.sendMessage(`Err ${err}`, event.threadID)
    }
}
//________________Cat fact________________
else if (input.startsWith(`${prefix}catfact`)) {
	try {
        let axios = require('axios');
        let fs = require("fs");
        let request = require("request");
        let {threadID, senderID, messageID} = event;
	const res = await axios.get(`https://some-random-api.ml/animal/cat`);
	var data = res.data;
	let callback = function() {
            return api.sendMessage({
                body:`————🐱Cat fact🐱————\n\n${data.fact}`,
                attachment: fs.createReadStream(__dirname + `/cache/cat.jpg`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/cat.jpg`), event.messageID);
        };
		return request(encodeURI(data.image)).pipe(fs.createWriteStream(__dirname + `/cache/cat.jpg`)).on("close", callback);
		} catch (err) {
        return api.sendMessage(`Err ${err}`, event.threadID)
    }
}

if(input.startsWith(`${prefix}baybayin`)){
                    let data = input.split(" ")
                    data.shift()
                    if(data.length > 0){
                        await axios.get("https://api-baybayin-transliterator.vercel.app?text=" + data.join(" ")).then((r) => {
                          let res = r.data
                          api.sendMessage(res.baybay, event.threadID)
                        }).catch((e) => {
                          console.error(e)
                        })
                    } else{
                      api.sendMessage("Undefined request", event.threadID)
                    }
                  }
if(input.startsWith(`${prefix}morse`)){
                    let data = input.split(" ")
                    data.shift()
                    if(data.length > 0){
                        await axios.get("https://api.popcat.xyz/texttomorse?text=" + data.join(" ")).then((r) => {
                          let res = r.data
                          api.sendMessage(res.morse, event.threadID)
                        }).catch((e) => {
                          console.error(e)
                        })
                    } else{
                      api.sendMessage("Undefined request", event.threadID, event.messageID)
                    }
                  }                  
   

if(input.startsWith(`${prefix}lyrics`)){
                    let data = input.split(" ")
                    data.shift()
                    if(data.length > 0){
                        await axios.get(`https://api.popcat.xyz/lyrics?song=${data.join(" ")}`).then((r) => {
                          let res = r.data
                          api.sendMessage(`Title : ${res.title}\nArtist : ${res.artist}\n\n${res.lyrics}`, event.threadID, event.messageID)
                        }).catch((e) => {
                          console.error(e)
                        })
                    } else{
                      api.sendMessage("Undefined request", event.threadID)
                    }
                  }                     
if(input.startsWith(`${prefix}pdt`)){
                    let data = input.split(" ")
                    data.shift()
                    if(data.length > 0){
                        await axios.get("https://api.popcat.xyz/periodic-table?element=" + data.join(" ")).then((r) => {
                          let res = r.data
                          api.sendMessage(`${res.name}\n\nSymbol : ${res.symbol}\nAtomic Number : ${res.atomic_number}\nAtomic Mass : ${res.atomic_mass}\nPeriod : ${res.period}\nPhase : ${res.phase}\nDiscovered by : ${res.discovered_by}\n\nSummary\n${res.summary}`, event.threadID)
                        }).catch((e) => {
                          console.error(e)
                        })
                    } else{
                      api.sendMessage("Undefined request", event.threadID, event.messageID)
                    }
                  }
                  

//________________Text to binary________________
else if (input.startsWith(`${prefix}binary`)){
    text = input;
	text = text.substring(7)
    let data = input.split(" ");
    let output = ""

    for(let a = 0; a < text.length; a++){
        let data = text.charCodeAt(a)
        output += "0" + data.toString(2) + " "
    }
    if (data.length < 2) {
        api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: binary [txt]", event.threadID);
        } else {
            api.sendMessage(`${output}`, event.threadID, event.messageID);
        }
}
//________________Reapeat Message________________                           
else if (input.startsWith(`${prefix}repeat`)) {
	text = input;
	text = text.substring(7)
    let data = input.split(" ");
    if (data.length < 2) {
        api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: reapeat [txt]", event.threadID);
        } else {
            api.sendMessage(`${text}`, event.threadID, event.messageID);
  }
}


//________________Get user UID________________
else if (input.startsWith(`${prefix}uid`)) {
    if (Object.keys(event.mentions) == 0) return api. sendMessage(`${event.senderID}`, event.threadID, event.messageID);
	else {
		for (var i = 0; i < Object.keys(event.mentions).length; i++) api.sendMessage(`${Object.values(event.mentions)[i].replace('@', '')}: ${Object.keys(event.mentions)[i]}`, event.threadID);
		return;
  }
}

else if (input.startsWith(`${prefix}stalk`)){
                   var {mentions, senderID, threadID, messageID} = event;
                   var uid = `${Object.keys(mentions)[0]}`;
                   api.getUserInfo(parseInt(uid), (err, data) => {
                   if(err){console.log(err)
                   }else{
                   request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname + '/photo.png')).on('finish',() =>{
                   var name = data[uid].name;
                   var fname = data[uid].firstName;
                   var url = data[uid].profileUrl;
                   var rs = data[uid].love;
                   var lc = data[uid].location;
                   var ht = data[uid].hometown;
                   var fl = data[uid].follow;
                   var bd = data[uid].birthday;
                   let gender = ""
switch(data[uid]['gender']){
                case 1:
                   gender = "Female"
                break
                case 2:
                   gender = "Male"
                break
                default:
                   gender = "Custom"
            }
                   var message = {
          body: `Name » ${name}\n\nNickname » ${fname}\n\nHometown » ${ht}\n\nLocation » ${lc}\n\nBirthday » ${bd}\n\nRelationship » ${rs}\n\nFollowers » ${fl}\n\nGender » ${gender}\n\nUid » ${uid}\n\n${url}`,
         attachment: 
fs.createReadStream(__dirname + '/photo.png')}
api.sendMessage(message ,threadID,messageID)
                   })
                   }
                    })
                  }

	
//________________Auto Reactions________________
else if (/(haha|happy|😆|😂)/ig.test(input.toLowerCase())) {
	api.setMessageReaction("😆", event.messageID, (err) => {}, true);
}
else if (/(agoi|sad|iyak|hays|pain|sakit|aguy|lungkot|hurt|☹️|😢|😭)/ig.test(input.toLowerCase())) {
	api.setMessageReaction("😢", event.messageID, (err) => {}, true);
}
else if (/(salamat|thankyou|love|ty|mahal)/ig.test(input.toLowerCase())) {
	api.setMessageReaction("💚", event.messageID, (err) => {}, true);
}


//________________FUN________________



else if (/(tangina|bobo|bubu|hayop|puke|tite|inamo|gago|pota|puta|bonak)/ig.test(input.toLowerCase())) {
	api.sendMessage(`Naneto sama ng ugali`, event.threadID, event.messageID)
	api.setMessageReaction("🖕", event.messageID, (err) => {}, true);
}


//________________Auto Replies________________
else if (/(evening|magandang gabi)/ig.test(input.toLowerCase())) {
                        api.getUserInfo(event.senderID, (err, data) => {
                            api.sendMessage({
                                body: "Good Evening " + '@' +
                                  data[event.senderID]['name'] + "\n\nEvenings are ways to end the days stress and struggle. I hope you didn't give yourself too much stress.Have a great evening.",
                                mentions: [{
                                    tag: '@' + data[event.senderID]['name'],
                                    id: event.senderID,
                                    fromIndex: 0
                                }],
                            }, event.threadID, event.messageID)
                        })
                    }
                    
else if (/(magandang umaga|morning)/ig.test(input.toLowerCase())) {
                        api.getUserInfo(event.senderID, (err, data) => {
                            api.sendMessage({
                                body: "Good Morning too " + '@' +
                                  data[event.senderID]['name'] + ", don't forget to eat your breakfast, have a good day.",
                                mentions: [{
                                    tag: '@' + data[event.senderID]['name'],
                                    id: event.senderID,
                                    fromIndex: 0
                                }],
                            }, event.threadID, event.messageID)
                        })
                    }

else if (/(kain|eat)/ig.test(input.toLowerCase())) {
                        api.getUserInfo(event.senderID, (err, data) => {
                            api.sendMessage({
                                body: "Eatwell " + '@' +
                                  data[event.senderID]['name'] + "\n\nLamunin mo pati pinggan, iloveyousomuchh.",
                                mentions: [{
                                    tag: '@' + data[event.senderID]['name'],
                                    id: event.senderID,
                                    fromIndex: 0
                                }],
                            }, event.threadID, event.messageID)
                        })
                    }


else if (/(pogi ko|ganda ko|cute ko|galing ko|tangkad ko)/ig.test(input.toLowerCase())) {
                                                var message = {
                                                body:`Pake ko?`,
                                                attachment: fs.createReadStream(__dirname + '/pakeko.mp4'),
                                            }
                                            api.sendMessage(message, event.threadID, event.messageID);
}


else if (/(uwu)/ig.test(input.toLowerCase())) {
                                                var message = {
                                                body:``,
                                                attachment: fs.createReadStream(__dirname + '/uwu.mp3'),
                                            }
                                            api.sendMessage(message, event.threadID, event.messageID);
}


else if (/(Jan Liby Dela Costa)/ig.test(input.toLowerCase())) {
    api.getUserInfo(event.senderID, (err, data) => {
                            api.sendMessage({
                                body: "Are you looking for my master Jan Liby Dela Costa?\n\n@" + data[event.senderID]['name'] + "\nMaybe he's busy for the mean time, please wait until he's able to reach you and your concern.\n\n\nYou can also talk to me while waiting for him, please execute the command Sai <sayanything> and i'll respond immediately, thank you for your patience. Have good day!\n\nhttps://liby0.vercel.app" ,
                                
                                mentions: [{
                                    tag: '@' + data[event.senderID]['name'],
                                    id: event.senderID,
                                    fromIndex: 0
                                }]
                            }, event.threadID, event.messageID)
                        })          
}
 
//________________Wikipedia Search________________
else if (input.startsWith(`${prefix}wiki`)) {
                        
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage(`⚠️Invalid Use Of Command!\n💡Usage: ${prefix}wiki <word>`, event.threadID);
                        } else {
                            try {
                                data.shift()
                                var txtWiki = "";
                                let res = await getWiki(data.join(" "));
                                if(res === undefined){
                                    throw new Error(`API RETURNED THIS: ${res}`)
                                }
                                if(res.title === undefined) {
                                  throw new Error(`API RETURNED THIS: ${res}`)
                                }
                                txtWiki += `🔎You search the word ${res.title} \n\nTimeStamp: ${res.timestamp}\n\n💡Description: ${res.description}\n\n💡Info: ${res.extract}`
                                
                                api.sendMessage(`${txtWiki}`, event.threadID, event.messageID);
                            }
                            catch (err) {
                                api.sendMessage(`⚠️${err.message}`, event.threadID, event.messageID);
                            }
                        }
                    }



                }


          break;

//________________Unsended Messages________________
            case "message_unsend":
                if (!admin.includes(event.senderID)) {
                    let d = msgs[event.messageID];
                    if (typeof (d) == "object") {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return console.error(err);
                            else {
                            	//________________Unsend Photo________________
                                if (d[0] == "img") {
                                    var file = fs.createWriteStream("cache/unsentphoto.jpg");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            var message = {
                                                body:`${data[event.senderID]['name']} unsent this photo: \n`,
                                                attachment: fs.createReadStream(__dirname + '/cache/unsentphoto.jpg')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                                //________________Unsend GIF________________
                                else if (d[0] == "gif") {
                                    var file = fs.createWriteStream("cache/unsentanimated_image.gif");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            var message = {
                                                body:`${data[event.senderID]['name']} unsent this GIF \n`,
                                                attachment: fs.createReadStream(__dirname + '/cache/unsentanimated_image.gif')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                                //________________Unsend Sticker________________
                                else if (d[0] == "sticker") {
                                    var file = fs.createWriteStream("cache/unsentsticker.png");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            var message = {
                                                body:`${data[event.senderID]['name']} unsent this Sticker \n`,
                                                attachment: fs.createReadStream(__dirname + '/cache/unsentsticker.png')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                                //________________Unsend Video________________
                                else if (d[0] == "vid") {
                                    var file = fs.createWriteStream("cache/unsentvideo.mp4");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            var message = {
                                                body:`${data[event.senderID]['name']} unsent this video\n`,
                                                attachment: fs.createReadStream(__dirname + '/cache/unsentvideo.mp4')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                                //________________Unsend VoiceMessage________________
                                else if (d[0] == "vm") {
                                    var file = fs.createWriteStream("cache/unsentvoicemessage.mp3");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            var message = {
                                                body:`${data[event.senderID]['name']} unsent this audio\n`,
                                                attachment: fs.createReadStream(__dirname + '/cache/unsentvoicemessage.mp3'),
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                            }
                        });
                    }
                    else {
                    	
//________________Unsend Message________________
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return console.error(err);
                            else {
                                api.sendMessage({
                                body: "@" + data[event.senderID]['name'] + ` unsent this message😐:\n\n'${msgs[event.messageID]}'\n\n#walangunsentnamagaganap!`,
                                mentions: [{
                                    tag: '@' + data[event.senderID]['name'],
                                    id: event.senderID,
                                    fromIndex: 0
                                }],
                            }, event.threadID, event.messageID);
                            }
                        });
                        
                    }
                    break;
                }
        }
    });
});
