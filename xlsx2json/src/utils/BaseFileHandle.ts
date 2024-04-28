// api文档 https://www.npmjs.com/package/fs-extra
const fs = require('fs-extra');

export async function  readJSON (path:string) {
  try {
    const obj = await fs.readJson(path, { throws: false })
    return obj;
  } catch (error) {
    throw error;
  }
}

export async function writeJSON (path:string, content:string) {
  try {
    await fs.outputFile(path, JSON.stringify(content, null, "\t"))
  } catch (err) {
    console.error(err)
  }
}

export async function deleteFileOrDir (path:string) {
  try {
    await fs.remove(path);
  } catch (err) {
    console.error(err)
  }
}