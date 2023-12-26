import renderApi from "./utils/renderApi";
import delToken from "./utils/delToken";
const program = require('commander'); // 处理用户命令

program
    .version('1.0.0')
    .command('render')
    .description('以某个模板初始化一个新工程')
    .action((name: string) => {
        renderApi()
    })
program
    .version('1.0.0')
    .command('del')
    .description('以某个模板初始化一个新工程')
    .action((name: string) => {
        delToken()
    })

program.parse()
