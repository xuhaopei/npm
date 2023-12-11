
const path = require('path');
const os = require('os');
import { deleteFileOrDir } from "@/utils/BaseFileHandle";
export default async () => {
    let tokenFileUrl = path.join(os.homedir(), 'yapitoken.txt');
    deleteFileOrDir(tokenFileUrl)
}
