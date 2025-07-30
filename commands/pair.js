const axios = require('axios');
const { sleep } = require('../lib/myfunc');

async function pairCommand(sock, chatId, message, q) {
    try {
        if (!q) {
            return await sock.sendMessage(chatId, {
                text: "ᴘʟᴇᴀꜱᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴠᴀʟɪᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ɴᴜᴍʙᴇʀ\nᴇxᴀᴍᴘʟᴇ: .ᴘᴀɪʀ 91702395XXXX",
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363161513685998@newsletter',
                        newsletterName: '𝐉𝐅𝐗 𝐌𝐃-𝐗',
                        serverMessageId: -1
                    }
                }
            });
        }

        const numbers = q
            .split(',')
            .map(v => v.replace(/[^0-9]/g, ''))
            .filter(v => v.length > 5 && v.length < 20);

        if (numbers.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "ɪɴᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ❌️ ᴘʟᴇᴀꜱᴇ ᴜꜱᴇ ᴛʜᴇ ᴄᴏʀʀᴇᴄᴛ ꜰᴏʀᴍᴀᴛ!",
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363161513685998@newsletter',
                        newsletterName: '𝐉𝐅𝐗 𝐌𝐃-𝐗',
                        serverMessageId: -1
                    }
                }
            });
        }

        for (const number of numbers) {
            const whatsappID = `${number}@s.whatsapp.net`;
            const result = await sock.onWhatsApp(whatsappID);

            if (!result[0]?.exists) {
                return await sock.sendMessage(chatId, {
                    text: `ᴛʜᴀᴛ ɴᴜᴍʙᴇʀ ɪꜱ ɴᴏᴛ ʀᴇɢɪꜱᴛᴇʀᴇᴅ ᴏɴ ᴡʜᴀᴛꜱᴀᴘᴘ❗️`,
                    contextInfo: {
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363161513685998@newsletter',
                            newsletterName: '𝐉𝐅𝐗 𝐌𝐃-𝐗',
                            serverMessageId: -1
                        }
                    }
                });
            }

            await sock.sendMessage(chatId, {
                text: "ᴡᴀɪᴛ ᴀ ᴍᴏᴍᴇɴᴛ ꜰᴏʀ ᴛʜᴇ ᴄᴏᴅᴇ...",
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363161513685998@newsletter',
                        newsletterName: '𝐉𝐅𝐗 𝐌𝐃-𝐗',
                        serverMessageId: -1
                    }
                }
            });

            try {
                const response = await axios.get(`https://knight-bot-paircode.onrender.com/code?number=${number}`);

                if (response.data && response.data.code) {
                    const code = response.data.code;

                    if (code === "Service Unavailable") {
                        throw new Error('Service Unavailable');
                    }

                    await sleep(5000);

                    await sock.sendMessage(chatId, {
                        text: `ʏᴏᴜʀ ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ: ${code}`,
                        contextInfo: {
                            forwardingScore: 1,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363161513685998@newsletter',
                                newsletterName: '𝐉𝐅𝐗 𝐌𝐃-𝐗',
                                serverMessageId: -1
                            }
                        }
                    });
                } else {
                    throw new Error('Invalid response from server');
                }
            } catch (apiError) {
                console.error('API Error:', apiError);

                const errorMessage =
                    apiError.message === 'Service Unavailable'
                        ? "ꜱᴇʀᴠɪᴄᴇ ɪꜱ ᴄᴜʀʀᴇɴᴛʟʏ ᴜɴᴀᴠᴀɪʟᴀʙʟᴇ. ᴘʟᴇᴀꜱᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ."
                        : "ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ. ᴘʟᴇᴀꜱᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.";

                await sock.sendMessage(chatId, {
                    text: errorMessage,
                    contextInfo: {
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363161513685998@newsletter',
                            newsletterName: '𝐉𝐅𝐗 𝐌𝐃-𝐗',
                            serverMessageId: -1
                        }
                    }
                });
            }
        }
    } catch (error) {
        console.error(error);

        await sock.sendMessage(chatId, {
            text: "ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ. ᴘʟᴇᴀꜱᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.",
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363161513685998@newsletter',
                    newsletterName: '𝐉𝐅𝐗 𝐌𝐃-𝐗',
                    serverMessageId: -1
                }
            }
        });
    }
}

module.exports = pairCommand;
