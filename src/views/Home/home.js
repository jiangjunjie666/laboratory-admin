import { reactive } from 'vue'
import * as echarts from 'echarts'
import { useUserStore } from '@/store/modules/users.js'
import { getTime, getCumulate } from '@/utils/getTime.js'
import { ref, onMounted, watch } from 'vue'
import { useUtilsStore } from '@/store/modules/utils.js'

const utilsStore = useUtilsStore()
const option1 = reactive({
  backgroundColor: utilsStore.isDark == 'dark' ? '#1D1E1F' : '',
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['2024/3/1', '2024/3/2', '2024/3/3', '2024/3/4', '2024/3/5', '2024/3/6', '2024/3/7', '2024/3/8', '2024/3/9', '2024/3/10']
  },
  yAxis: {
    type: 'value',
    splitLine: {
      // 设置不显示辅助线
      show: utilsStore.isDark == 'dark' ? true : false
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      const date = params[0].axisValue
      const value = params[0].data
      // 使用 HTML 标签添加样式
      return `<div style="font-weight: bold;">日期：${date}</div><div>数值：${value}</div>`
    }
  },
  series: [
    {
      data: [4020, 932, 901, 934, 1290, 1330, 1320, 2000, 4000, 5999],
      type: 'line',
      symbolSize: 10,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#6fdf90'
          },
          {
            offset: 1,
            color: '#2697e2'
          }
        ])
      }
    }
  ]
})

const option2 = reactive({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    textStyle: {
      // 设置图例文字颜色
      color: utilsStore.isDark == 'dark' ? '#fff' : 'black'
    }
  },
  series: [
    {
      name: '总数',
      type: 'pie',
      radius: '60%',
      data: [
        { value: 1048, name: '男' },
        { value: 735, name: '女' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

export default {
  setup() {
    const utilsStore = useUtilsStore()
    const outputValue = ref(0)
    const Value = ref(9999)
    const timer = ref(null)
    const userStore = useUserStore()
    const avatarUrl = ref(import.meta.env.VITE_SERVER + '/images/userAvatar/' + userStore.userinfo.avatar)
    const time = ref(getTime())
    const stimulate = ref(getCumulate())

    onMounted(() => {
      time.value = getTime()
      stimulate.value = getCumulate()
      echarts.init(document.getElementById('category'), 'dark').setOption(option1)
      echarts.init(document.getElementById('pie')).setOption(option2)

      timer.value = setInterval(() => {
        if (outputValue.value <= Value.value) {
          outputValue.value += 5
        } else {
          clearInterval(timer.value)
        }
      }, 1)
    })

    watch(
      () => utilsStore.isDark,
      (val) => {
        echarts.init(document.getElementById('category')).setOption(option1)
        echarts.init(document.getElementById('pie')).setOption(option2)
      }
    )

    return {
      outputValue,
      avatarUrl,
      time,
      stimulate
    }
  }
}
