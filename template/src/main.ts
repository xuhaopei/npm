import { writeJSON, readJSON, deleteFileOrDir } from "@/utils/BaseFileHandle";
const inquirer = require('inquirer')        //弹出交互选项，询问用户要创建的项目需要哪些功能
const fs = require('fs');
const path = require('path');
const os = require('os');
import log from "@/utils/BaseLog";

export default async () => {
    // 获取接口url
    let url = (await inquirer.prompt([{
        type: "input",
        message: "请填写",
        name: "url",
        validate: function (val: string) {
            if (val.trim().length == 0) {
                log.error('\n不允许为空');
                return false;
            }
            return true;
        },
        default: '',
    },])).url;
    url = url.trim()
}
