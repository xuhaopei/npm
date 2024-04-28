const chalk = require('chalk'); // 修改console.log的文字效果
const log = {
    error: function (msg: string) {
        console.log(chalk.red(msg));
    },
    success: function (msg: string) {
        console.log(chalk.green(msg));
    },
    primary: function (msg: string) {
        console.log(chalk.blue(msg));
    },
    custom: function () {
        return chalk;
    }
};
export default log
