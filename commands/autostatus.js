const fs = require('fs');
const path = require('path');

const channelInfo = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363161513685998@newsletter',
            newsletterName: '𝐉𝐅𝐗 𝐌𝐃-𝐗',
            serverMessageId: -1
        }
    }
};

// Path to store auto status configuration
const configPath = path.join(__dirname, '../data/autoStatus.json');

// Initialize config file if it doesn't exist
if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify({ enabled: false }));
}

async function autoStatusCommand(sock, chatId, msg, args) {
    try {
        // Check if sender is owner
        if (!msg.key.fromMe) {
            await sock.sendMessage(chatId, { 
                text: '❌ ᴛʜɪꜱ ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜꜱᴇᴅ ʙʏ ᴛʜᴇ ᴏᴡɴᴇʀ!',
                ...channelInfo
            });
            return;
        }

        // Read current config
        let config = JSON.parse(fs.readFileSync(configPath));

        // If no arguments, show current status
        if (!args || args.length === 0) {
            const status = config.enabled ? 'ᴇɴᴀʙʟᴇᴅ' : 'ᴅɪꜱᴀʙʟᴇᴅ';
            await sock.sendMessage(chatId, { 
                text: `🔄 *ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ ᴠɪᴇᴡ*\n\nᴄᴜʀʀᴇɴᴛ ꜱᴛᴀᴛᴜꜱ: ${status}\n\nᴜꜱᴇ:\n.ᴀᴜᴛᴏꜱᴛᴀᴛᴜꜱ ᴏɴ - ᴇɴᴀʙʟᴇ ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ ᴠɪᴇᴡ\n.ᴀᴜᴛᴏꜱᴛᴀᴛᴜꜱ ᴏꜰꜰ - ᴅɪꜱᴀʙʟᴇ ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ ᴠɪᴇᴡ`,
                ...channelInfo
            });
            return;
        }

        // Handle on/off commands
        const command = args[0].toLowerCase();
        if (command === 'on') {
            config.enabled = true;
            fs.writeFileSync(configPath, JSON.stringify(config));
            await sock.sendMessage(chatId, { 
                text: '✅ ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ ᴠɪᴇᴡ ʜᴀꜱ ʙᴇᴇɴ ᴇɴᴀʙʟᴇᴅ!\nʙᴏᴛ ᴡɪʟʟ ɴᴏᴡ ᴀᴜᴛᴏᴍᴀᴛɪᴄᴀʟʟʏ ᴠɪᴇᴡ ᴀʟʟ ᴄᴏɴᴛᴀᴄᴛ ꜱᴛᴀᴛᴜꜱᴇꜱ.',
                ...channelInfo
            });
        } else if (command === 'off') {
            config.enabled = false;
            fs.writeFileSync(configPath, JSON.stringify(config));
            await sock.sendMessage(chatId, { 
                text: '❌ ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ ᴠɪᴇᴡ ʜᴀꜱ ʙᴇᴇɴ ᴅɪꜱᴀʙʟᴇᴅ!\nʙᴏᴛ ᴡɪʟʟ ɴᴏ ʟᴏɴɢᴇʀ ᴀᴜᴛᴏᴍᴀᴛɪᴄᴀʟʟʏ ᴠɪᴇᴡ ꜱᴛᴀᴛᴜꜱᴇꜱ.',
                ...channelInfo
            });
        } else {
            await sock.sendMessage(chatId, { 
                text: '❌ ɪɴᴠᴀʟɪᴅ ᴄᴏᴍᴍᴀɴᴅ! ᴜꜱᴇ:\n.ᴀᴜᴛᴏꜱᴛᴀᴛᴜꜱ ᴏɴ - ᴇɴᴀʙʟᴇ ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ ᴠɪᴇᴡ\n.ᴀᴜᴛᴏꜱᴛᴀᴛᴜꜱ ᴏꜰꜰ - ᴅɪꜱᴀʙʟᴇ ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ ᴠɪᴇᴡ',
                ...channelInfo
            });
        }

    } catch (error) {
        console.error('Error in autostatus command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ᴍᴀɴᴀɢɪɴɢ ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ!\n' + error.message,
            ...channelInfo
        });
    }
}

// Function to check if auto status is enabled
function isAutoStatusEnabled() {
    try {
        const config = JSON.parse(fs.readFileSync(configPath));
        return config.enabled;
    } catch (error) {
        console.error('Error checking auto status config:', error);
        return false;
    }
}

// Function to handle status updates
async function handleStatusUpdate(sock, status) {
    try {
        if (!isAutoStatusEnabled()) {
            return;
        }

        // Add delay to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Handle status from messages.upsert
        if (status.messages && status.messages.length > 0) {
            const msg = status.messages[0];
            if (msg.key && msg.key.remoteJid === 'status@broadcast') {
                try {
                    await sock.readMessages([msg.key]);
                    const sender = msg.key.participant || msg.key.remoteJid;
                   // console.log(`✅ Status Viewed `);
                } catch (err) {
                    if (err.message?.includes('rate-overlimit')) {
                        console.log('⚠️ Rate limit hit, waiting before retrying...');
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        await sock.readMessages([msg.key]);
                    } else {
                        throw err;
                    }
                }
                return;
            }
        }

        // Handle direct status updates
        if (status.key && status.key.remoteJid === 'status@broadcast') {
            try {
                await sock.readMessages([status.key]);
                const sender = status.key.participant || status.key.remoteJid;
                console.log(`✅ Viewed status from: ${sender.split('@')[0]}`);
            } catch (err) {
                if (err.message?.includes('rate-overlimit')) {
                    console.log('⚠️ Rate limit hit, waiting before retrying...');
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await sock.readMessages([status.key]);
                } else {
                    throw err;
                }
            }
            return;
        }

        // Handle status in reactions
        if (status.reaction && status.reaction.key.remoteJid === 'status@broadcast') {
            try {
                await sock.readMessages([status.reaction.key]);
                const sender = status.reaction.key.participant || status.reaction.key.remoteJid;
                console.log(`✅ Viewed status from: ${sender.split('@')[0]}`);
            } catch (err) {
                if (err.message?.includes('rate-overlimit')) {
                    console.log('⚠️ Rate limit hit, waiting before retrying...');
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await sock.readMessages([status.reaction.key]);
                } else {
                    throw err;
                }
            }
            return;
        }

    } catch (error) {
        console.error('❌ Error in auto status view:', error.message);
    }
}

module.exports = {
    autoStatusCommand,
    handleStatusUpdate
};
