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
                                                attachment: fs.createReadStream(__dirname + '/cache/unsentvoicemessage.mp3')
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
                                body: "@" + data[event.senderID]['name'] + ` unsent this message:\n\n'${msgs[event.messageID]}'`,
                                mentions: [{
                                    tag: '@' + data[event.senderID]['name'],
                                    id: event.senderID,
                                    fromIndex: 0
                                }],
                            }, event.threadID, event.messageID);
                            }
                        });
                        
                    }
