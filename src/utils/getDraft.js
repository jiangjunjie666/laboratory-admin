//定义获取草稿的方法
const getDraft = () => {
  return localStorage.getItem('draft') ? JSON.parse(localStorage.getItem('draft')) : []
}

//定义保存草稿的方法
const saveDraft = (data) => {
  try {
    let res = getDraft()
    res.push(data)
    localStorage.setItem('draft', JSON.stringify(res))
    return true
  } catch (err) {
    return false
  }
}

//定义删除某一个元素的方法
const deleteDraft = (index, row) => {
  let res = getDraft()
  res.splice(index, 1)
  localStorage.setItem('draft', JSON.stringify(res))
}
//导出
export { getDraft, saveDraft, deleteDraft }
