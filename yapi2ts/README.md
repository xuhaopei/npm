# 功能介绍
通过传入yapi的url，可以打印出对应的ts接口信息。

# 安装
npm i y2ts -g 

# 使用
y2ts render // 渲染api

y2ts del // 删除token文件

# 开发人员维护：

clone 项目后，进入项目的根目录下，执行打包 

```sh
pnpm i 

// 打包
npm run build

// 本地包链接成全局包
npm link

// 完成调试
npm unlink
```
# 发布或更新
```sh
npm who am i  // 查看自己是否在线
npm publish // 发布， 注意更改版本号
```

# 更新：
1. 2023-12-11 修复文件写入bug，改成写入用户目录。
2. 2023-12-26 支持删除token文件
