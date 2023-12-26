
const path = require('path');
const os = require('os');
import log from "@/utils/BaseLog";
import { deleteFileOrDir } from "@/utils/BaseFileHandle";
export default async () => {
    let tokenFileUrl = path.join(os.homedir(), 'yapitoken.txt');
    await deleteFileOrDir(tokenFileUrl)
    log.success('删除成功，删除文件的路径为：' + tokenFileUrl)
}
