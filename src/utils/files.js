const { existsSync, mkdirSync, writeFileSync } = require('fs');
const path = require('path');


/**
 * Description placeholder
 * @date 2023/7/9 - 上午9:47:03
 *
 * @async
 * @param {string} remoteFolderPath folder url 
 * @param {RegExp} regex used to match file/sub folders
 * @returns {Promise<string[]>} parse過的子file/folder名稱 
 */
async function getAllFileNamesFromRemoteFolder(remoteFolderPath, regex) {
    // Get folderNames from smogon
    try {
        const response = await fetch(remoteFolderPath);
        const data = await response.text()
        const folderNames = data.split('<a href="');
        const cleanNames = folderNames.map(folderName => {
            const match = folderName.match(regex);
            if (match && match[0]) return match[0]
            return ''
        }).filter(x => x !== '');
        return cleanNames
    } catch (err) {
        throw Error(`fetch from ${remoteFolderPath} failed: ${err}`)
    }
}

/**
 * check if target folder exist 
 * @param {string} folderPath folder路徑
 * @returns {boolean} whether target folder exist 
 */
function isFolderExist(folderPath) {
    return existsSync(folderPath)
}


/**
 * Save all Json folders from smogon/month/chaos to local
 * @date 2023/7/8 - 上午10:26:39
 * @async
 * @param {string} targetFolder
 * @param {string} filesUrl
 * @param {string} rule
 * @returns {Promise<{ success: boolean; }>}
 */
async function saveAllFilesToTargetFolder(targetFolder, filesUrl, rule) {
    if (!isFolderExist) {
        mkdirSync(targetFolder);
    }
    const regex = new RegExp(rule + "-\\d+\\.json");
    const files = await getAllFileNamesFromRemoteFolder(filesUrl, regex)
    files.forEach(async file => {
        const fileSavePath = path.join(targetFolder, file);
        // if file exist then do nothing
        if (isFolderExist(fileSavePath)) return;
        const remoteFilePath = `${filesUrl}/${file}`
        const fileResponse = await fetch(remoteFilePath)
        const fileData = await fileResponse.json();
        writeFileSync(fileSavePath, JSON.stringify(fileData))
    })
    return {
        success: true
    }
}
module.exports = {
    isFolderExist,
    saveAllFilesToTargetFolder,
    getAllFileNamesFromRemoteFolder
}