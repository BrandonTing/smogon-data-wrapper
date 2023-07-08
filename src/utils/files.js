import { existsSync, mkdirSync } from 'fs'

/**
 * check if target folder exist 
 * @export
 * @param {string} folderPath folder路徑
 * @returns {boolean} whether target folder exist 
 */
export function isFolderExist(folderPath) {
    return existsSync(folderPath)
}


/**
 * Save all Json folders from smogon/month/chaos to local
 * @date 2023/7/8 - 上午10:26:39
 *
 * @export
 * @param {string} targetFolder
 * @param {string} filesUrl
 * @returns {{ success: boolean; }}
 */
export function saveAllFilesToTargetFolder(targetFolder, filesUrl) {
    mkdirSync(targetFolder);

    return {
        success: true
    }
}
