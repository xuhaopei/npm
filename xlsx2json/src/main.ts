const inquirer = require('inquirer')        //弹出交互选项，询问用户要创建的项目需要哪些功能
import xlsx from 'node-xlsx';
import log from "@/utils/BaseLog";
import { readJSON } from './utils/BaseFileHandle';


export default async () => {
    // xlsx url
    let data = (await inquirer.prompt([
        {
            type: "input",
            message: "请填写xlsx文件绝对路径",
            name: "url",
            validate: function (val: string) {
                if (val.trim().length == 0) {
                    log.error('\n不允许为空');
                    return false;
                }
                return true;
            },
            default: '',
        },
        {
            type: "input",
            message: "请填写旧json文件绝对路径",
            name: "jsonUrl",
            validate: function (val: string) {
                if (val.trim().length == 0) {
                    log.error('\n不允许为空');
                    return false;
                }
                return true;
            },
            default: 'not use',
        },
        {
            type: "input",
            message: "请填写读取的哪一页，从0开始计算：",
            name: "index",
            validate: function (val: string) {
                if (/\d/g.test(val) === false) {
                    log.error(`\n请输入数字，当前输入为：${val}`);
                    return false;
                }
                return true;
            },
            default: 0,
        },
        {
            type: "input",
            message: "请填写读取的哪一列为key值，从0开始计算：:",
            name: "key",
            validate: function (val: string) {
                if (/\d/g.test(val) === false) {
                    log.error(`\n请输入数字，当前输入为：${val}`);
                    return false;
                }
                return true;
            },
            default: 0,
        },
        {
            type: "input",
            message: "请填写读取的哪一列为value值，从0开始计算：:",
            name: "value",
            validate: function (val: string) {
                if (/\d/g.test(val) === false) {
                    log.error(`\n请输入数字，当前输入为：${val}`);
                    return false;
                }
                return true;
            },
            default: 0,
        },
    ])) as { url: string, index: number, key: number, value: number, jsonUrl: string };
    let { url, jsonUrl, index, key, value } = data

    interface WorkSheetsFromFile {
        name: string,
        data: Array<Array<{
            [keyname: string]: any
        }>>
    }
    let workSheetsFromFile: Array<WorkSheetsFromFile> = []
    let jsonObj: { [keyName: string]: any } = {}
    try {
        workSheetsFromFile = xlsx.parse(url.replace(/[\"\']/g, ''));
    } catch (error) {
        log.error('\n文件读取失败，当前文件路径为：' + url)
        console.log(error)
    }
    try {
        if (jsonUrl !== 'not use') {
            jsonObj = await readJSON(jsonUrl.replace(/[\"\']/g, ''));
        }

    } catch (error) {
        log.error('\n文件读取失败，当前文件路径为：' + jsonUrl)
        console.log(error)
    }

    let list = workSheetsFromFile[index].data

    log.error(`{`)
    for (let i = 0; i < list.length; i++) {
        let keyStr = String(list[i][key]).trim()
        let valueStr = String(list[i][value]).trim()
        if (keyStr === 'undefined' || valueStr === 'undefined' || jsonObj[keyStr]) continue
        if (i % 2 === 0) {
            log.primary(`"${keyStr}":"${valueStr}",`)
        } else {
            log.success(`"${keyStr}":"${valueStr}",`)
        }
    }
    log.error(`}`)

}
