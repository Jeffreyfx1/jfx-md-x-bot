const fetch = require('node-fetch');

async function lyricsCommand(sock, chatId, songTitle) {
    if (!songTitle) {
        await sock.sendMessage(chatId, { 
            text: '🔍 ᴘʟᴇᴀꜱᴇ ᴇɴᴛᴇʀ ᴛʜᴇ ꜱᴏɴɢ ɴᴀᴍᴇ ᴛᴏ ɢᴇᴛ ᴛʜᴇ ʟʏʀɪᴄꜱ! ᴜꜱᴀɢᴇ: ʟʏʀɪᴄꜱ <ꜱᴏɴɢ ɴᴀᴍᴇ>'
        });
        return;
    }

    try {
        const apiUrl = `https://some-random-api.com/lyrics?title=${encodeURIComponent(songTitle)}`;
        const res = await fetch(apiUrl);
        
        if (!res.ok) {
            throw await res.text();
        }
        
        const json = await res.json();
        
        if (!json.lyrics) {
            await sock.sendMessage(chatId, { 
                text: `❌ ꜱᴏʀʀʏ, ɪ ᴄᴏᴜʟᴅɴ'ᴛ ꜰɪɴᴅ ᴀɴʏ ʟʏʀɪᴄꜱ ꜰᴏʀ "${songTitle}".`
            });
            return;
        }
        
        await sock.sendMessage(chatId, {
            text: `🎵 ꜱᴏɴɢ ʟʏʀɪᴄꜱ 🎶\n\n▢ ᴛɪᴛʟᴇ: ${json.title || songTitle}\n▢ ᴀʀᴛɪꜱᴛ: ${json.author || 'ᴜɴᴋɴᴏᴡɴ'}\n\n📜 ʟʏʀɪᴄꜱ:\n${json.lyrics}\n\nʜᴏᴘᴇ ʏᴏᴜ ᴇɴᴊᴏʏ ᴛʜᴇ ᴍᴜꜱɪᴄ 🎧 🎶`
        });
    } catch (error) {
        console.error('Error in lyrics command:', error);
        await sock.sendMessage(chatId, { 
            text: `❌ ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ꜰᴇᴛᴄʜɪɴɢ ᴛʜᴇ ʟʏʀɪᴄꜱ ꜰᴏʀ "${songTitle}".`
        });
    }
}

module.exports = { lyricsCommand };
