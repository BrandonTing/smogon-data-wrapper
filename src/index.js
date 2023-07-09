const { mkdirSync, readFileSync } = require('fs');
const { isFolderExist, saveAllFilesToTargetFolder, getAllFileNamesFromRemoteFolder } = require('./utils/files');
const path = require('path');

const smogonBaseUrl = 'https://www.smogon.com/stats/'

/**
 * Return Type of syncFromSmogon Funciton 
 * @date 2023/7/8 - 上午10:15:48
 *
 * @typedef {Object} syncResult
 * @property {!boolean} success Whether the wrapper get data from smogon successfully.
 * @property {boolean} [hasUpdate] Whether the sync updates
 * @property {string[]} [updatedFolders] Folders that has get updated
 * @property {string} [latestFolder] Name of the latest folder from smogon
 */

/**
 * Get chaos json from smogon, url: https://www.smogon.com/stats/
 * @async
 * @param {string} targetFolder folder path to store smogon data
 * @returns {Promise<syncResult>} syncResult
 */
async function syncFromSmogon(targetFolder, rule) {
    try {
        const fileNames = (await getAllFileNamesFromRemoteFolder(smogonBaseUrl, /(\d{4}-\d{2}(?:-\w+)?)\/">/)).map(name => name.replace('/">', ''));
        // check if local file need to update
        const isDataFolderExist = isFolderExist(targetFolder)
        if (!isDataFolderExist) {
            mkdirSync(targetFolder)
        }

        fileNames.forEach(async (name, i) => {
            if (i !== fileNames.length - 1) return
            const localFolderPath = path.join(targetFolder, name)
            // const hasLocalFolder = isFolderExist(localFolderPath);
            // if (hasLocalFolder) return
            // create folder and save json from chaos
            const chaosJsonUrl = `${smogonBaseUrl}${name}/chaos/`
            await saveAllFilesToTargetFolder(localFolderPath, chaosJsonUrl, rule)
        });


        return {
            success: true,
            hasUpdate: true,
            latestFolder: fileNames.slice(-1)[0]
        }
    } catch (err) {
        return {
            success: false,
        }
    }
}


/**
 * getUsageRateOfRule get top usage pokemons based on given params 
 * @date 2023/7/9 - 上午11:01:45
 *
 * @param {string} dataFolder path you store json files from smogon
 * @param {string} timeline ex. 2023-06. The period you want info about
 * @param {string} rule ex. gen9vgc2023regulationd. The Battle rule you want info about.
 * @param {number} [size=30] the number of top rankings you want to know;
 * @returns {{[key: string]: number}[]}
 */
function getUsageRateOfRule(dataFolder, timeline, rule, size = 30) {
    const filePath = path.join(dataFolder, timeline, `${rule}.json`)
    const data = require(filePath);
    const usage = Object.entries(data.data).sort((a, b) => {
        const [_A, pokemonAData] = a;
        const [_B, pokemonBData] = b;
        return pokemonBData.usage - pokemonAData.usage
    })
        .slice(0, size)
        .map(arr => {
            return {
                [arr[0]]: arr[1].usage
            }
        });
    return usage
}

// syncFromSmogon(path.join(__dirname, '..', 'data'), 'gen9vgc2023regulationd')
// getUsageRateOfRule(path.join(__dirname, '..', 'data'), '2023-06', 'gen9vgc2023regulationd-0')

module.exports = {
    syncFromSmogon,
    getUsageRateOfRule
}
