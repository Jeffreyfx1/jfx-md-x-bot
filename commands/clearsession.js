const fs = require('fs');
const path = require('path');
const os = require('os');

const channelInfo = {
    contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363161513685998@newsletter',
            newsletterName: '𝐉𝐅𝐗 𝐌𝐃-𝐗',
            serverMessageId: -1
        }
    }
};

async function clearSessionCommand(sock, chatId, msg) {
    try {
        // Check if sender is owner
        if (!msg.key.fromMe) {
            await sock.sendMessage(chatId, { 
                text: '❌ ᴛʜɪꜱ ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜꜱᴇᴅ ʙʏ ᴛʜᴇ ᴏᴡɴᴇʀ!',
                ...channelInfo
            });
            return;
        }

        // Define session directory
        const sessionDir = path.join(__dirname, '../session');

        if (!fs.existsSync(sessionDir)) {
            await sock.sendMessage(chatId, { 
                text: '❌ ꜱᴇꜱꜱɪᴏɴ ᴅɪʀᴇᴄᴛᴏʀʏ ɴᴏᴛ ꜰᴏᴜɴᴅ!',
                ...channelInfo
            });
            return;
        }

        let filesCleared = 0;
        let errors = 0;
        let errorDetails = [];

        // Send initial status
        await sock.sendMessage(chatId, { 
            text: `🔍 ᴏᴘᴛɪᴍɪᴢɪɴɢ ꜱᴇꜱꜱɪᴏɴ ꜰɪʟᴇꜱ ꜰᴏʀ ʙᴇᴛᴛᴇʀ ᴘᴇʀꜰᴏʀᴍᴀɴᴄᴇ...`,
            ...channelInfo
        });

        const files = fs.readdirSync(sessionDir);
        
        // Count files by type for optimization
        let appStateSyncCount = 0;
        let preKeyCount = 0;

        for (const file of files) {
            if (file.startsWith('app-state-sync-')) appStateSyncCount++;
            if (file.startsWith('pre-key-')) preKeyCount++;
        }

        // Delete files
        for (const file of files) {
            if (file === 'creds.json') continue;
            try {
                const filePath = path.join(sessionDir, file);
                fs.unlinkSync(filePath);
                filesCleared++;
            } catch (error) {
                errors++;
                errorDetails.push(`ꜰᴀɪʟᴇᴅ ᴛᴏ ᴅᴇʟᴇᴛᴇ ${file}: ${error.message}`);
            }
        }

        // Send completion message
        const message = `✅ ꜱᴇꜱꜱɪᴏɴ ꜰɪʟᴇꜱ ᴄʟᴇᴀʀᴇᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ!\n\n` +
                       `📊 ꜱᴛᴀᴛɪꜱᴛɪᴄꜱ:\n` +
                       `• ᴛᴏᴛᴀʟ ꜰɪʟᴇꜱ ᴄʟᴇᴀʀᴇᴅ: ${filesCleared}\n` +
                       `• ᴀᴘᴘ ꜱᴛᴀᴛᴇ ꜱʏɴᴄ ꜰɪʟᴇꜱ: ${appStateSyncCount}\n` +
                       `• ᴘʀᴇ-ᴋᴇʏ ꜰɪʟᴇꜱ: ${preKeyCount}\n` +
                       (errors > 0 ? `\n⚠️ ᴇʀʀᴏʀꜱ ᴇɴᴄᴏᴜɴᴛᴇʀᴇᴅ: ${errors}\n${errorDetails.join('\n')}` : '');

        await sock.sendMessage(chatId, { 
            text: message,
            ...channelInfo
        });

    } catch (error) {
        console.error('Error in clearsession command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ ꜰᴀɪʟᴇᴅ ᴛᴏ ᴄʟᴇᴀʀ ꜱᴇꜱꜱɪᴏɴ ꜰɪʟᴇꜱ!',
            ...channelInfo
        });
    }
}

module.exports = clearSessionCommand;
