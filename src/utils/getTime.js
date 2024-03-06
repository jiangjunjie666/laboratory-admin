//获取当前的时间，判断是上午还是中午还是下午
import { useUserStore } from '@/store/modules/users.js'
const userStore = useUserStore()
export function getTime() {
  const date = new Date()
  const hour = date.getHours()
  if (hour < 12) {
    return `早上好 ${userStore.userinfo.username}，清晨的第一缕阳光将照射到你的脸上。☀`
  } else if (hour < 14) {
    return `中午好 ${userStore.userinfo.username}，忙碌了一上午，记得享用一顿美味的午餐。😋`
  } else if (hour < 18) {
    return `下午好 ${userStore.userinfo.username}，愿你的心情和下午的阳光一样明媚。🎉`
  } else {
    return `晚上好 ${userStore.userinfo.username}，愿你的夜晚和星星一样闪耀。🌙`
  }
}

const stimulate = [
  '每一次挑战都是一次机会，勇敢面对，你会发现自己比想象中更强大。',
  '成功不是终点，失败也不是终结，勇敢前行，你会发现路的尽头有更美好的风景。',
  '即使前路艰难，也请记得，昨日的汗水是明日的满足。',
  '不要害怕失败，它只是通向成功的必经之路。',
  '每一步都是向前的一步，不管速度有多慢，只要方向是正确的，你就在成长。',
  '生命中最重要的不是所站的位置，而是所朝的方向。',
  '相信自己，你比想象中更勇敢、更坚强。',
  '每一次努力都是一份投资，未来的你会感谢现在拼搏的自己。',
  '困难不会永远存在，但坚持不懈的精神会让你走向成功。',
  '坚持自己的梦想，即使前路坎坷，也要勇敢追逐，因为梦想是最强大的动力。'
]

//随机返回一句激励语录
export function getCumulate() {
  return stimulate[Math.floor(Math.random() * stimulate.length)]
}
