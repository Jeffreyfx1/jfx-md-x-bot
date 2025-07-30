const { bots } = require('../lib/antilink');
const { setAntilink, getAntilink, removeAntilink } = require('../lib/index');
const isAdmin = require('../lib/isAdmin');

async function handleAntilinkCommand(sock, chatId, userMessage, senderId, isSenderAdmin) {
    try {
        if (!isSenderAdmin) {
            await sock.sendMessage(chatId, { text: 'ғᴏʀ ɢʀᴏᴜᴘ ᴀᴅᴍɪɴꜱ ᴏɴʟʏ!' });
            return;
        }

        const prefix = '.';
        const args = userMessage.slice(9).toLowerCase().trim().split(' ');
        const action = args[0];

        if (!action) {
            const usage = 'ᴀɴᴛɪʟɪɴᴋ ꜱᴇᴛᴜᴘ\n\n.antilink on\n.antilink set delete | kick | warn\n.antilink off';
            await sock.sendMessage(chatId, { text: usage });
            return;
        }

        switch (action) {
            case 'on':
                const existingConfig = await getAntilink(chatId, 'on');
                if (existingConfig?.enabled) {
                    await sock.sendMessage(chatId, { text: 'ᴀɴᴛɪʟɪɴᴋ ɪꜱ ᴀʟʀᴇᴀᴅʏ ᴏɴ' });
                    return;
                }
                const result = await setAntilink(chatId, 'on', 'delete');
                await sock.sendMessage(chatId, { 
                    text: result ? 'ᴀɴᴛɪʟɪɴᴋ ʜᴀꜱ ʙᴇᴇɴ ᴛᴜʀɴᴇᴅ ᴏɴ' : 'ꜰᴀɪʟᴇᴅ ᴛᴏ ᴛᴜʀɴ ᴏɴ ᴀɴᴛɪʟɪɴᴋ' 
                });
                break;

            case 'off':
                await removeAntilink(chatId, 'on');
                await sock.sendMessage(chatId, { text: 'ᴀɴᴛɪʟɪɴᴋ ʜᴀꜱ ʙᴇᴇɴ ᴛᴜʀɴᴇᴅ ᴏꜰꜰ' });
                break;

            case 'set':
                if (args.length < 2) {
                    await sock.sendMessage(chatId, { 
                        text: `ᴘʟᴇᴀꜱᴇ ꜱᴘᴇᴄɪꜰʏ ᴀɴ ᴀᴄᴛɪᴏɴ: ${prefix}antilink set delete | kick | warn` 
                    });
                    return;
                }
                const setAction = args[1];
                if (!['delete', 'kick', 'warn'].includes(setAction)) {
                    await sock.sendMessage(chatId, { 
                        text: 'ɪɴᴠᴀʟɪᴅ ᴀᴄᴛɪᴏɴ. ᴄʜᴏᴏꜱᴇ delete, kick, ᴏʀ warn.' 
                    });
                    return;
                }
                const setResult = await setAntilink(chatId, 'on', setAction);
                await sock.sendMessage(chatId, { 
                    text: setResult ? `ᴀɴᴛɪʟɪɴᴋ ᴀᴄᴛɪᴏɴ ꜱᴇᴛ ᴛᴏ ${setAction}` : 'ꜰᴀɪʟᴇᴅ ᴛᴏ ꜱᴇᴛ ᴀɴᴛɪʟɪɴᴋ ᴀᴄᴛɪᴏɴ' 
                });
                break;

            case 'get':
                const status = await getAntilink(chatId, 'on');
                const actionConfig = await getAntilink(chatId, 'on');
                await sock.sendMessage(chatId, { 
                    text: `ᴀɴᴛɪʟɪɴᴋ ᴄᴏɴꜰɪɢᴜʀᴀᴛɪᴏɴ:\nꜱᴛᴀᴛᴜꜱ: ${status ? 'ON' : 'OFF'}\nᴀᴄᴛɪᴏɴ: ${actionConfig ? actionConfig.action : 'ɴᴏᴛ ꜱᴇᴛ'}` 
                });
                break;

            default:
                await sock.sendMessage(chatId, { text: `ᴜꜱᴇ ${prefix}antilink ꜰᴏʀ ᴜꜱᴀɢᴇ.` });
        }
    } catch (error) {
        console.error('Error in antilink command:', error);
        await sock.sendMessage(chatId, { text: 'ᴇʀʀᴏʀ ᴘʀᴏᴄᴇꜱꜱɪɴɢ ᴀɴᴛɪʟɪɴᴋ ᴄᴏᴍᴍᴀɴᴅ' });
    }
}

async function handleLinkDetection(sock, chatId, message, userMessage, senderId) {
    const antilinkSetting = getAntilinkSetting(chatId);
    if (antilinkSetting === 'off') return;

    console.log(`Antilink Setting for ${chatId}: ${antilinkSetting}`);
    console.log(`Checking message for links: ${userMessage}`);
    
    console.log("Full message object: ", JSON.stringify(message, null, 2));

    let shouldDelete = false;

    const linkPatterns = {
        whatsappGroup: /chat\.whatsapp\.com\/[A-Za-z0-9]{20,}/,
        whatsappChannel: /wa\.me\/channel\/[A-Za-z0-9]{20,}/,
        telegram: /t\.me\/[A-Za-z0-9_]+/,
        allLinks: /https?:\/\/[^\s]+/,
    };

    if (antilinkSetting === 'whatsappGroup') {
        console.log('WhatsApp group link protection is enabled.');
        if (linkPatterns.whatsappGroup.test(userMessage)) {
            console.log('Detected a WhatsApp group link!');
            shouldDelete = true;
        }
    } else if (antilinkSetting === 'whatsappChannel' && linkPatterns.whatsappChannel.test(userMessage)) {
        shouldDelete = true;
    } else if (antilinkSetting === 'telegram' && linkPatterns.telegram.test(userMessage)) {
        shouldDelete = true;
    } else if (antilinkSetting === 'allLinks' && linkPatterns.allLinks.test(userMessage)) {
        shouldDelete = true;
    }

    if (shouldDelete) {
        const quotedMessageId = message.key.id;
        const quotedParticipant = message.key.participant || senderId;

        console.log(`Attempting to delete message with id: ${quotedMessageId} from participant: ${quotedParticipant}`);

        try {
            await sock.sendMessage(chatId, {
                delete: { remoteJid: chatId, fromMe: false, id: quotedMessageId, participant: quotedParticipant },
            });
            console.log(`Message with ID ${quotedMessageId} deleted successfully.`);
        } catch (error) {
            console.error('Failed to delete message:', error);
        }

        const mentionedJidList = [senderId];
        await sock.sendMessage(chatId, { 
            text: `ᴡᴀʀɴɪɴɢ! @${senderId.split('@')[0]}, ᴘᴏꜱᴛɪɴɢ ʟɪɴᴋꜱ ɪꜱ ɴᴏᴛ ᴀʟʟᴏᴡᴇᴅ.`,
            mentions: mentionedJidList 
        });
    } else {
        console.log('No link detected or protection not enabled for this type of link.');
    }
}

module.exports = {
    handleAntilinkCommand,
    handleLinkDetection,
};
