const isAdmin = require('../lib/isAdmin');

async function demoteCommand(sock, chatId, mentionedJids, message) {
    try {
        if (!chatId.endsWith('@g.us')) {
            await sock.sendMessage(chatId, { 
                text: 'ᴛʜɪꜱ ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜꜱᴇᴅ ɪɴ ɢʀᴏᴜᴘꜱ'
            });
            return;
        }

        const adminStatus = await isAdmin(sock, chatId, message.key.participant || message.key.remoteJid);
        
        if (!adminStatus.isBotAdmin) {
            await sock.sendMessage(chatId, { 
                text: 'ʙᴏᴛ ᴍᴜꜱᴛ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴅᴇᴍᴏᴛᴇ ᴍᴇᴍʙᴇʀꜱ'
            });
            return;
        }

        if (!adminStatus.isSenderAdmin) {
            await sock.sendMessage(chatId, { 
                text: 'ᴏɴʟʏ ᴀᴅᴍɪɴꜱ ᴄᴀɴ ᴜꜱᴇ ᴛʜᴇ ᴅᴇᴍᴏᴛᴇ ᴄᴏᴍᴍᴀɴᴅ'
            });
            return;
        }

        let userToDemote = [];

        if (mentionedJids && mentionedJids.length > 0) {
            userToDemote = mentionedJids;
        } else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userToDemote = [message.message.extendedTextMessage.contextInfo.participant];
        }

        if (userToDemote.length === 0) {
            await sock.sendMessage(chatId, { 
                text: 'ᴍᴇɴᴛɪᴏɴ ᴀ ᴜꜱᴇʀ ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴍᴇꜱꜱᴀɢᴇ ᴛᴏ ᴅᴇᴍᴏᴛᴇ'
            });
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        await sock.groupParticipantsUpdate(chatId, userToDemote, "demote");

        const usernames = userToDemote.map(jid => `@${jid.split('@')[0]}`);
        const demotedBy = `@${message.key.participant ? message.key.participant.split('@')[0] : message.key.remoteJid.split('@')[0]}`;

        const demotionMessage = `ɢʀᴏᴜᴘ ᴅᴇᴍᴏᴛɪᴏɴ\n\n` +
            `ᴅᴇᴍᴏᴛᴇᴅ ᴜꜱᴇʀ${userToDemote.length > 1 ? 'ꜱ' : ''}:\n` +
            `${usernames.map(name => `• ${name}`).join('\n')}\n\n` +
            `ᴅᴇᴍᴏᴛᴇᴅ ʙʏ: ${demotedBy}\n\n` +
            `ᴅᴀᴛᴇ: ${new Date().toLocaleString()}`;

        await sock.sendMessage(chatId, { 
            text: demotionMessage,
            mentions: [...userToDemote, message.key.participant || message.key.remoteJid]
        });
    } catch (error) {
        console.error('Error in demote command:', error);
        if (error.data === 429) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            awai
