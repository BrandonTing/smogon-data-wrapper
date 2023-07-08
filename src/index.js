import axios from 'axios';
import { isFolderExist, saveAllFilesToTargetFolder } from './utils/files';
import path from 'path'

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
 * @returns {Promise<syncResult>} syncResult
 */
async function syncFromSmogon() {
    try {
        const response = await axios.get(smogonBaseUrl);
        const folderNames = response.data.split('\r\n');
        // Get folderNames from smogon 
        const regex = /(\d{4}-\d{2}(?:-\w+)?)\/">/;
        const cleanNames = folderNames.map(folderName => {
            const match = folderName.match(regex);
            if (match && match[1]) return match[1]
            return
        }).filter(x => x);
        // check if local file need to update
        cleanNames.forEach(name => {
            const localFolderPath = path.join(__dirname, 'smogon', name)
            // FIXME Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/yuliangting/Desktop/coding/side_projects/smogon-data-wrapper/src/utils/files' imported from /Users/yuliangting/Desktop/coding/side_projects/smogon-data-wrapper/src/index.js
            const hasLocalFolder = isFolderExist(localFolderPath);
            if (hasLocalFolder) return
            // create folder and save json from chaos
            const chaosJsonUrl = `${smogonBaseUrl}${name}/chaos/`
            saveAllFilesToTargetFolder(localFolderPath, chaosJsonUrl)
        });
        // 

        return {
            success: true,
            hasUpdate: true,
            latestFolder: cleanNames.slice(-1)
        }
    } catch (err) {
        return {
            success: false,
        }
    }
}
/**
 * 
 */
function updateSmogonChaosData() {

}

syncFromSmogon()