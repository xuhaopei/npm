import renderApi from "./utils/renderApi";
import delToken from "./utils/delToken";
let argvList = process.argv

if (!argvList[1]) {
    renderApi()
}

if (argvList[1] === '-d') {
    if (argvList[2] && argvList[2] === 'del') {
        delToken()
    }
}