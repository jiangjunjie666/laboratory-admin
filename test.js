const arr = [
  {
    id: 1,
    img_url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    img_description: '🦌'
  },
  {
    id: 2,
    img_url: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    img_description: '🐎'
  },
  {
    id: 3,
    img_url: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    img_description: '🦁'
  },
  {
    id: 4,
    img_url: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    img_description: '🦊'
  },
  {
    id: 5,
    img_url: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    img_description: '🐒'
  }
]

const newArr = []
//过滤出只有img_url的数组
arr.forEach((item) => {
  newArr.push(item.img_url)
})
console.log(newArr)
