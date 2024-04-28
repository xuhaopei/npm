# 功能介绍
写一个npm包的模板，以后写npm包可以基于此模板进行copy

# 安装
pnpm i
# 使用

# 开发：

clone 项目后，进入项目的根目录下，执行打包 

```sh
pnpm i 

// 打包
npm run build

// 调试方法1
// 本地包链接成全局包
npm link
template test(自定义)
npm unlink // 结束调试

// 调试方法2
cd dist
node ./dist/index.js test(自定义)
```
# 发布或更新
```sh
npm who am i  // 查看自己是否在线
npm publish // 发布， 注意更改版本号
```

# 更新：