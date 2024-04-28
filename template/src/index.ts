const program = require('commander'); // 处理用户命令
import main from "./main";


// 终端输入 template render 就会执行此代码
program
    .version('1.0.0')
    .command('test')
    .description('测试')
    .action((name: string) => {
        main()
    })

// 终端输入 template del 就会执行此代码
program
    .version('1.0.0')
    .command('del')
    .description('删除token文件')
    .action((name: string) => {
    })

    
program.parse()
