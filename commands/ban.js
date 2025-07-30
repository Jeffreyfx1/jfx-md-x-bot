const fs = require('fs');
const { channelInfo } = require('../lib/messageConfig');

async function banCommand(sock, chatId, message) {
    let userToBan;
    
    // Check for mentioned users
    if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
        userToBan = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
    }
    // Check for replied message
    else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
        userToBan = message.message.extendedTextMessage.contextInfo.participant;
    }
    
    if (!userToBan) {
        await sock.sendMessage(chatId, { 
            text: 'ᴘʟᴇᴀꜱᴇ ᴍᴇɴᴛɪᴏɴ ᴛʜᴇ ᴜꜱᴇʀ ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ᴛʜᴇɪʀ ᴍᴇꜱꜱᴀɢᴇ ᴛᴏ ʙᴀɴ!', 
            ...channelInfo 
        });
        return;
    }

    try {
        // Add user to banned list
        const bannedUsers = JSON.parse(fs.readFileSync('./data/banned.json'));
        if (!bannedUsers.includes(userToBan)) {
            bannedUsers.push(userToBan);
            fs.writeFileSync('./data/banned.json', JSON.stringify(bannedUsers, null, 2));
            
            await sock.sendMessage(chatId, { 
                text: `ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ʙᴀɴɴᴇᴅ @${userToBan.split('@')[0]}!`,
                mentions: [userToBan],
                ...channelInfo 
            });
        } else {
            await sock.sendMessage(chatId, { 
                text: `@${userToBan.split('@')[0]} ɪꜱ ᴀʟʀᴇᴀᴅʏ ʙᴀɴɴᴇᴅ!`,
                mentions: [userToBan],
                ...channelInfo 
            });
        }
    } catch (error) {
        console.error('Error in ban command:', error);
        await sock.sendMessage(chatId, { 
            text: 'ꜰᴀɪʟᴇᴅ ᴛᴏ ʙᴀɴ ᴜꜱᴇʀ!', 
            ...channelInfo 
        });
    }
}

module.exports = banCommand;
