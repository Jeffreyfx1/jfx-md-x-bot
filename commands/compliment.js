const compliments = [
    "ʏᴏᴜ'ʀᴇ ᴀᴍᴀᴢɪɴɢ ᴊᴜꜱᴛ ᴛʜᴇ ᴡᴀʏ ʏᴏᴜ ᴀʀᴇ!",
    "ʏᴏᴜ ʜᴀᴠᴇ ᴀ ɢʀᴇᴀᴛ ꜱᴇɴꜱᴇ ᴏꜰ ʜᴜᴍᴏʀ!",
    "ʏᴏᴜ'ʀᴇ ɪɴᴄʀᴇᴅɪʙʟʏ ᴛʜᴏᴜɢʜᴛꜰᴜʟ ᴀɴᴅ ᴋɪɴᴅ.",
    "ʏᴏᴜ ᴀʀᴇ ᴍᴏʀᴇ ᴘᴏᴡᴇʀꜰᴜʟ ᴛʜᴀɴ ʏᴏᴜ ᴋɴᴏᴡ.",
    "ʏᴏᴜ ʟɪɢʜᴛ ᴜᴘ ᴛʜᴇ ʀᴏᴏᴍ!",
    "ʏᴏᴜ'ʀᴇ ᴀ ᴛʀᴜᴇ ꜰʀɪᴇɴᴅ.",
    "ʏᴏᴜ ɪɴꜱᴘɪʀᴇ ᴍᴇ!",
    "ʏᴏᴜʀ ᴄʀᴇᴀᴛɪᴠɪᴛʏ ᴋɴᴏᴡꜱ ɴᴏ ʙᴏᴜɴᴅꜱ!",
    "ʏᴏᴜ ʜᴀᴠᴇ ᴀ ʜᴇᴀʀᴛ ᴏꜰ ɢᴏʟᴅ.",
    "ʏᴏᴜ ᴍᴀᴋᴇ ᴀ ᴅɪꜰꜰᴇʀᴇɴᴄᴇ ɪɴ ᴛʜᴇ ᴡᴏʀʟᴅ.",
    "ʏᴏᴜʀ ᴘᴏꜱɪᴛɪᴠɪᴛʏ ɪꜱ ᴄᴏɴᴛᴀɢɪᴏᴜꜱ!",
    "ʏᴏᴜ ʜᴀᴠᴇ ᴀɴ ɪɴᴄʀᴇᴅɪʙʟᴇ ᴡᴏʀᴋ ᴇᴛʜɪᴄ.",
    "ʏᴏᴜ ʙʀɪɴɢ ᴏᴜᴛ ᴛʜᴇ ʙᴇꜱᴛ ɪɴ ᴘᴇᴏᴘʟᴇ.",
    "ʏᴏᴜʀ ꜱᴍɪʟᴇ ʙʀɪɢʜᴛᴇɴꜱ ᴇᴠᴇʀʏᴏɴᴇ'ꜱ ᴅᴀʏ.",
    "ʏᴏᴜ'ʀᴇ ꜱᴏ ᴛᴀʟᴇɴᴛᴇᴅ ɪɴ ᴇᴠᴇʀʏᴛʜɪɴɢ ʏᴏᴜ ᴅᴏ.",
    "ʏᴏᴜʀ ᴋɪɴᴅɴᴇꜱꜱ ᴍᴀᴋᴇꜱ ᴛʜᴇ ᴡᴏʀʟᴅ ᴀ ʙᴇᴛᴛᴇʀ ᴘʟᴀᴄᴇ.",
    "ʏᴏᴜ ʜᴀᴠᴇ ᴀ ᴜɴɪǫᴜᴇ ᴀɴᴅ ᴡᴏɴᴅᴇʀꜰᴜʟ ᴘᴇʀꜱᴘᴇᴄᴛɪᴠᴇ.",
    "ʏᴏᴜʀ ᴇɴᴛʜᴜꜱɪᴀꜱᴍ ɪꜱ ᴛʀᴜʟʏ ɪɴꜱᴘɪʀɪɴɢ!",
    "ʏᴏᴜ ᴀʀᴇ ᴄᴀᴘᴀʙʟᴇ ᴏꜰ ᴀᴄʜɪᴇᴠɪɴɢ ɢʀᴇᴀᴛ ᴛʜɪɴɢꜱ.",
    "ʏᴏᴜ ᴀʟᴡᴀʏꜱ ᴋɴᴏᴡ ʜᴏᴡ ᴛᴏ ᴍᴀᴋᴇ ꜱᴏᴍᴇᴏɴᴇ ꜰᴇᴇʟ ꜱᴘᴇᴄɪᴀʟ.",
    "ʏᴏᴜʀ ᴄᴏɴꜰɪᴅᴇɴᴄᴇ ɪꜱ ᴀᴅᴍɪʀᴀʙʟᴇ.",
    "ʏᴏᴜ ʜᴀᴠᴇ ᴀ ʙᴇᴀᴜᴛɪꜰᴜʟ ꜱᴏᴜʟ.",
    "ʏᴏᴜʀ ɢᴇɴᴇʀᴏꜱɪᴛʏ ᴋɴᴏᴡꜱ ɴᴏ ʟɪᴍɪᴛꜱ.",
    "ʏᴏᴜ ʜᴀᴠᴇ ᴀ ɢʀᴇᴀᴛ ᴇʏᴇ ꜰᴏʀ ᴅᴇᴛᴀɪʟ.",
    "ʏᴏᴜʀ ᴘᴀꜱꜱɪᴏɴ ɪꜱ ᴛʀᴜʟʏ ᴍᴏᴛɪᴠᴀᴛɪɴɢ!",
    "ʏᴏᴜ ᴀʀᴇ ᴀɴ ᴀᴍᴀᴢɪɴɢ ʟɪꜱᴛᴇɴᴇʀ.",
    "ʏᴏᴜ'ʀᴇ ꜱᴛʀᴏɴɢᴇʀ ᴛʜᴀɴ ʏᴏᴜ ᴛʜɪɴᴋ!",
    "ʏᴏᴜʀ ʟᴀᴜɢʜᴛᴇʀ ɪꜱ ɪɴꜰᴇᴄᴛɪᴏᴜꜱ.",
    "ʏᴏᴜ ʜᴀᴠᴇ ᴀ ɴᴀᴛᴜʀᴀʟ ɢɪꜰᴛ ꜰᴏʀ ᴍᴀᴋɪɴɢ ᴏᴛʜᴇʀꜱ ꜰᴇᴇʟ ᴠᴀʟᴜᴇᴅ.",
    "ʏᴏᴜ ᴍᴀᴋᴇ ᴛʜᴇ ᴡᴏʀʟᴅ ᴀ ʙᴇᴛᴛᴇʀ ᴘʟᴀᴄᴇ ᴊᴜꜱᴛ ʙʏ ʙᴇɪɴɢ ɪɴ ɪᴛ."
];

async function complimentCommand(sock, chatId, message) {
    try {
        if (!message || !chatId) {
            console.log('Invalid message or chatId:', { message, chatId });
            return;
        }

        let userToCompliment;
        
        if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            userToCompliment = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
        } else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userToCompliment = message.message.extendedTextMessage.contextInfo.participant;
        }

        if (!userToCompliment) {
            await sock.sendMessage(chatId, { 
                text: 'ᴘʟᴇᴀꜱᴇ ᴍᴇɴᴛɪᴏɴ ꜱᴏᴍᴇᴏɴᴇ ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ᴛʜᴇɪʀ ᴍᴇꜱꜱᴀɢᴇ ᴛᴏ ᴄᴏᴍᴘʟɪᴍᴇɴᴛ ᴛʜᴇᴍ!'
            });
            return;
        }

        const compliment = compliments[Math.floor(Math.random() * compliments.length)];
        await new Promise(resolve => setTimeout(resolve, 1000));

        await sock.sendMessage(chatId, { 
            text: `ʜᴇʏ @${userToCompliment.split('@')[0]}, ${compliment}`,
            mentions: [userToCompliment]
        });
    } catch (error) {
        console.error('Error in compliment command:', error);
        if (error.data === 429) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            try {
                await sock.sendMessage(chatId, { 
                    text: 'ᴘʟᴇᴀꜱᴇ ᴛʀʏ ᴀɢᴀɪɴ ɪɴ ᴀ ꜰᴇᴡ ꜱᴇᴄᴏɴᴅꜱ.'
                });
            } catch (retryError) {
                console.error('Error sending retry message:', retryError);
            }
        } else {
            try {
                await sock.sendMessage(chatId, { 
                    text: 'ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ꜱᴇɴᴅɪɴɢ ᴛʜᴇ ᴄᴏᴍᴘʟɪᴍᴇɴᴛ.'
                });
            } catch (sendError) {
                console.error('Error sending error message:', sendError);
            }
        }
    }
}

module.exports = { complimentCommand };
