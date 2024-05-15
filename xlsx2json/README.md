# 功能介绍
为多语言服务，将xlxs里面的各列之间转成json，方便开发导入多语言文案.

# 安装
npm i op-xlsx2json
# 使用
xlsx2json 

# 开发：

clone 项目后，进入项目的根目录下，执行打包 

```sh
pnpm i 

// 打包
npm run build

// 调试方法1
// 本地包链接成全局包
npm link
xlsx2json test(自定义)
npm unlink // 结束调试

// 调试方法2
npm run build
node dist/index.js
```
# 发布或更新
```sh
npm who am i  // 查看自己是否在线
npm publish // 发布， 注意更改版本号
```

# 更新：
## 20240515
1. 无数据支持生成json文件