import { writeJSON, readJSON, deleteFileOrDir } from "@/utils/BaseFileHandle";
const inquirer = require('inquirer')        //弹出交互选项，询问用户要创建的项目需要哪些功能
const fs = require('fs');
const path = require('path');
import log from "@/utils/BaseLog";
import { interfaceGet } from "@/utils/BaseApiYapi"

interface Properties {
    [keyName: string]: {
        type: string;
        items: {
            type: string;
            description: string;
            properties: Properties;
        };
        description?: string;
        properties: Properties;
    };
}
const renderInterface = (data: Properties) => {
    let currentRenderStr = `{`
    let keys = Object.keys(data)
    for (const key of keys) {
        let type = data[key].type
        if (type === 'object') {
            currentRenderStr += `
            ${key} : ${renderInterface(data[key].properties)};
`
        }
        else if (type === 'array') {
            let type = data[key].items.type
            if (type === 'object') {
                currentRenderStr += `
                ${key} : Array<${renderInterface(data[key].items.properties)}>;
    `
            } else {
                currentRenderStr += `
                ${key} : Array<${type}>;
    `
            }
        } else {
            let desc = data[key].description
            currentRenderStr += `
            ${key} : ${type};  ${desc ? `// ${desc}` : ''}
`
        }
    }
    currentRenderStr += '}'
    return currentRenderStr
}

const capitalizeFirstLetter = (str: string | undefined) => {
    // 确保字符串不为空
    if (!str) {
        return str;
    }

    // 将首字母转换为大写，再与剩余部分拼接
    return str.charAt(0).toUpperCase() + str.slice(1);
}
(async function () {
    let tokenJson = {
        token: ''
    }
    let url = ''
    try {
        // 获取tokenJson
        let tokenFileUrl = path.join('/', 'yapitoken.txt');
        try {
            tokenJson = JSON.parse(await readJSON(tokenFileUrl))
        } catch (error) {
            log.error('\n不存在yapitoken，请输入');
            let promptList = [
                {
                    type: "input",
                    message: "请填写yapitoken：",
                    name: "token",
                    validate: function (val: string) {
                        if (val.trim().length == 0) {
                            log.error('\n不允许为空');
                            return false;
                        }
                        return true;
                    },
                    default: '',
                },
            ]
            let { token } = (await inquirer.prompt(promptList));
            token = token.trim()
            tokenJson.token = token
            writeJSON(tokenFileUrl, JSON.stringify(tokenJson))
        }

        // 获取接口url
        let url = (await inquirer.prompt([{
            type: "input",
            message: "请填写接口文档的地址：",
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

        // 发送请求
        let params = {
            id: url.split('/').pop().split("_").pop(),
            token: tokenJson.token,
        }
        let response = await interfaceGet(params)
        let { errcode, errmsg, data } = response.data
        if (errcode !== 0) {
            log.error(errmsg + ',errcode:' + errcode)
            console.log()
            log.error('请检查yapi token是否正确:' + tokenJson.token)
            console.log()
            log.error('请检查url是否正确：' + url)
            console.log()
            log.primary('url举例: https://yapi.xxx.cn/project/1637/interface/api/26013')

            // token 无效，则删除token配置信息
            if (errcode === 40011)
                deleteFileOrDir(tokenFileUrl)
            return
        }
        // 获取到接口的信息
        let body = {
            properties: {}
        }
        try {
            body = JSON.parse(data.res_body)
        } catch (error) {
            log.error('接口信息不完整\n')
            console.error(error)
            console.log(data)
        }

        // 渲染接口的ts
        let str = renderInterface(body.properties)
        let intrefaceName = capitalizeFirstLetter(data.path.split('/').pop())
        str = `interface ${intrefaceName} ` + str

        // 渲染接口的请求
        str = str + `
// ${data.title} ${url}
export function ${data.path.split('/').slice(-2).join('_')}(params: any): Promise<${intrefaceName}> {
    return instance.request({
        url: '${data.path}',
        method: '${data.method}',
        params
    })
}
`
        console.log(str)
    } catch (error) {
        log.error('请检查yapi token是否正确:' + tokenJson.token)
        log.error('请检查url是否正确：' + url)
        log.primary('url举例: https://yapi.xxx.cn/project/1637/interface/api/26013')
    }
})()
