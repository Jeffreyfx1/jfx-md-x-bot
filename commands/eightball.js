const eightBallResponses = [
    "ʏᴇꜱ, ᴅᴇꜰɪɴɪᴛᴇʟʏ!",
    "ɴᴏ ᴡᴀʏ!",
    "ᴀꜱᴋ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.",
    "ɪᴛ ɪꜱ ᴄᴇʀᴛᴀɪɴ.",
    "ᴠᴇʀʏ ᴅᴏᴜʙᴛꜰᴜʟ.",
    "ᴡɪᴛʜᴏᴜᴛ ᴀ ᴅᴏᴜʙᴛ.",
    "ᴍʏ ʀᴇᴘʟʏ ɪꜱ ɴᴏ.",
    "ꜱɪɢɴꜱ ᴘᴏɪɴᴛ ᴛᴏ ʏᴇꜱ."
];

async function eightBallCommand(sock, chatId, question) {
    if (!question) {
        await sock.sendMessage(chatId, { text: 'ᴘʟᴇᴀꜱᴇ ᴀꜱᴋ ᴀ ǫᴜᴇꜱᴛɪᴏɴ!' });
        return;
    }

    const randomResponse = eightBallResponses[Math.floor(Math.random() * eightBallResponses.length)];
    await sock.sendMessage(chatId, { text: randomResponse });
}

module.exports = { eightBallCommand };
