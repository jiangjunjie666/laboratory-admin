const str = `<h1 style="text-align: center; line-height: 2;">dawdaw</h1><p>你干嘛哎呦 哈哈哈</p>`

//清除标签，留下内容
const reg = /<[^>]+>/g
const str2 = str.replace(reg, '')
console.log(str2)
