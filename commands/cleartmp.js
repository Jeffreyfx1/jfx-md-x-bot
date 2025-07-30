const fs = require('fs');
const path = require('path');

// Function to clear a single directory
function clearDirectory(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            return { success: false, message: `❌ ᴅɪʀᴇᴄᴛᴏʀʏ ᴅᴏᴇꜱ ɴᴏᴛ ᴇxɪꜱᴛ: ${dirPath}` };
        }
        const files = fs.readdirSync(dirPath);
        let deletedCount = 0;
        for (const file of files) {
            try {
                const filePath = path.join(dirPath, file);
                fs.unlinkSync(filePath);
                deletedCount++;
            } catch (err) {
                console.error(`❌ ᴇʀʀᴏʀ ᴅᴇʟᴇᴛɪɴɢ ꜰɪʟᴇ ${file}:`, err);
            }
        }
        return { success: true, message: `✅ ᴄʟᴇᴀʀᴇᴅ ${deletedCount} ꜰɪʟᴇꜱ ɪɴ ${path.basename(dirPath)}`, count: deletedCount };
    } catch (error) {
        console.error('❌ ᴇʀʀᴏʀ ɪɴ ᴄʟᴇᴀʀᴅɪʀᴇᴄᴛᴏʀʏ:', error);
        return { success: false, message: `❌ ꜰᴀɪʟᴇᴅ ᴛᴏ ᴄʟᴇᴀʀ ꜰɪʟᴇꜱ ɪɴ ${path.basename(dirPath)}`, error: error.message };
    }
}

// Function to clear both tmp and temp directories
async function clearTmpDirectory() {
    const tmpDir = path.join(process.cwd(), 'tmp');
    const tempDir = path.join(process.cwd(), 'temp');
    const results = [];
    results.push(clearDirectory(tmpDir));
    results.push(clearDirectory(tempDir));
    const success = results.every(r => r.success);
    const totalDeleted = results.reduce((sum, r) => sum + (r.count || 0), 0);
    const message = results.map(r => r.message).join(' | ');
    return { success, message, count: totalDeleted };
}

// Function to handle manual command
async function clearTmpCommand(sock, chatId, msg) {
    try {
        const isOwner = msg.key.fromMe;
        if (!isOwner) {
            await sock.sendMessage(chatId, { 
                text: '❌ ᴛʜɪꜱ ᴄᴏᴍᴍᴀɴᴅ ɪꜱ ᴏɴʟʏ ᴀᴠᴀɪʟᴀʙʟᴇ ꜰᴏʀ ᴛʜᴇ ᴏᴡɴᴇʀ' 
            });
            return;
        }

        const result = await clearTmpDirectory();
        
        if (result.success) {
            await sock.sendMessage(chatId, { 
                text: `✅ ${result.message}` 
            });
        } else {
            await sock.sendMessage(chatId, { 
                text: `❌ ${result.message}` 
            });
        }

    } catch (error) {
        console.error('❌ ᴇʀʀᴏʀ ɪɴ ᴄʟᴇᴀʀᴛᴍᴘ ᴄᴏᴍᴍᴀɴᴅ:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ ꜰᴀɪʟᴇᴅ ᴛᴏ ᴄʟᴇᴀʀ ᴛᴇᴍᴘᴏʀᴀʀʏ ꜰɪʟᴇꜱ' 
        });
    }
}

// Start automatic clearing every 6 hours
function startAutoClear() {
    clearTmpDirectory().then(result => {
        if (!result.success) {
            console.error(`[ᴀᴜᴛᴏ ᴄʟᴇᴀʀ] ${result.message}`);
        }
    });

    setInterval(async () => {
        const result = await clearTmpDirectory();
        if (!result.success) {
            console.error(`[ᴀᴜᴛᴏ ᴄʟᴇᴀʀ] ${result.message}`);
        }
    }, 6 * 60 * 60 * 1000);
}

startAutoClear();

module.exports = clearTmpCommand;
