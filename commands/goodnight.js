const fetch = require('node-fetch');

async function goodnightCommand(sock, chatId, message) {
    try {
        const shizokeys = 'jfx-md-x';
        const res = await fetch(`https://api.shizo.top/api/quote/gnsd?apikey=${shizokeys}`);
        
        if (!res.ok) {
            throw await res.text();
        }
        
        const json = await res.json();
        const goodnightMessage = json.result;

        // Send the goodnight message
        await sock.sendMessage(chatId, { text: goodnightMessage }, { quoted: message });
    } catch (error) {
        console.error('Error in goodnight command:', error);
        await sock.sendMessage(chatId, { text: 'ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇᴛ ɢᴏᴏᴅɴɪɢʜᴛ ᴍᴇꜱꜱᴀɢᴇ. ᴘʟᴇᴀꜱᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ' }, { quoted: message });
    }
}

module.exports = { goodnightCommand };
