<template>
  <div>
    <el-card class="home-card">
      <div class="avatar">
        <el-avatar :src="avatarUrl" size="large"></el-avatar>
      </div>
      <div class="text">
        <p>{{ time }}</p>
        <p>{{ stimulate }}</p>
      </div>
    </el-card>
    <div class="chartslist">
      <el-card class="categoryCharts">
        <template #header>
          <div class="card-header">
            <i class="icon-fangwenliang iconfont">访问量</i>
            <div class="right">
              <span>日均访问量：</span>
              <p class="demo-statistic">{{ outputValue }}</p>
            </div>
          </div>
        </template>
        <div id="category" style="width: 400px;height:300px;"></div>
      </el-card>
      <el-card class="pieCharts">

        <template #header>
          <div class="card-header">
            <i class="icon-guanliyuan iconfont">管理员性别比例</i>
            <div class="right">
              <span>总管理员：</span>
              <p class="demo-statistic">{{ outputValue }}</p>
            </div>
          </div>
        </template>
        <div id="pie" style="width: 400px;height:300px;"></div>
      </el-card>
      <el-card class="disposition">

        <template #header>
          <div class="card-header">
            <i class="icon-xinxi iconfont">项目依赖信息</i>
            <el-tag type="primary" effect="plain">
              项目部署时间：2024-3-3 &nbsp 19:20:18
            </el-tag>
          </div>
        </template>
        <el-descriptions class="margin-top" :column="3" size="medium" border>
          <el-descriptions-item v-for="i in mergedPackageArr" :key="i.name">

            <template #label>
              <div class="cell-item">
                <!-- svg图片 -->
                <img src="@/assets/icon-svg/雪糕.svg">
                {{ i.name }}
              </div>
            </template>
            <span>{{ i.version }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
    <!-- 小卡片列表 -->
    <div class="card-list">
      <HomeCard></HomeCard>
    </div>
    <!-- 计划 -->
    <div class="plan">
      <el-card class="plan-card">
        <el-table></el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/modules/users.js'
import { getTime, getCumulate } from '@/utils/getTime.js'
import { ref, onMounted, reactive, watch } from 'vue'
import { useUtilsStore } from '@/store/modules/utils.js'
import mergedPackageArr from '@/data/packjsonData.js'
import HomeCard from '@/components/HomeCard/index.vue'
// 导入 ECharts 主题
import * as echarts from 'echarts';
const utilsStore = useUtilsStore()
const outputValue = ref(0)
const Value = ref(9999)
const timer = ref(null)
const userStore = useUserStore()
const avatarUrl = ref(import.meta.env.VITE_SERVER + '/images/userAvatar/' + userStore.userinfo.avatar)
const time = ref(getTime())
const stimulate = ref(getCumulate())
onMounted(() => {
  // if (utilsStore.visitedRoutes.length !== 0) {
  //   //强制刷新
  //   $router.go(0)
  // }
  time.value = getTime()
  stimulate.value = getCumulate()
  echarts.init(document.getElementById('category'), 'dark').setOption(option1)
  echarts.init(document.getElementById('pie')).setOption(option2)
  //对outputValue进行毫秒级的计算
  timer.value = setInterval(() => {
    if (outputValue.value <= Value.value) {
      outputValue.value += 5
    } else {
      clearInterval(timer.value)
    }
  }, 1)
})
//监听isDark的变化重新加载
watch(
  () => utilsStore.isDark,
  (val) => {
    echarts.init(document.getElementById('category')).setOption(option1)
    echarts.init(document.getElementById('pie')).setOption(option2)
  }
)
const option1 = reactive({
  backgroundColor: utilsStore.isDark == 'dark' ? '#1D1E1F' : '',
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [
      '2024/3/1',
      '2024/3/2',
      '2024/3/3',
      '2024/3/4',
      '2024/3/5',
      '2024/3/6',
      '2024/3/7',
      '2024/3/8',
      '2024/3/9',
      '2024/3/10'
    ]
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
      const date = params[0].axisValue;
      const value = params[0].data;
      // 使用 HTML 标签添加样式
      return `<div style="font-weight: bold;">日期：${date}</div><div>数值：${value}</div>`;
    }
  },
  series: [
    {
      data: [4020, 932, 901, 934, 1290, 1330, 1320, 2000, 4000, 5999],
      type: 'line',
      symbolSize: 10,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#6fdf90'
        }, {
          offset: 1,
          color: '#2697e2'
        }])
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

</script>

<style lang="scss" scoped>
.home-card {

  :deep(.el-card__body) {
    display: flex;

    .avatar {
      margin: 0 10px;
    }

    .text {
      margin-left: 10px;

      // 选中第一个p元素
      p:nth-child(1) {
        font-size: 22px;
        font-weight: bold;
      }

      p:nth-child(2) {
        font-size: 14px;
        color: #999;
        margin-top: 5px;
      }
    }
  }
}


.chartslist {
  display: flex;

  .categoryCharts {
    margin: 10px 0 0 0;
    width: 400px;
    height: 340px;

    :deep(.el-card__body) {
      padding: 0 0px;
    }

    #category {
      padding: 0 5px;
    }

    @include useDisplayTitle()
  }

  .pieCharts {
    margin: 10px 0 0 10px;
    width: 430px;
    height: 340px;
    @include useDisplayTitle()
  }

  .disposition {
    width: 780px;
    height: 340px;
    margin: 10px 0 0 10px;

    .card-header {
      display: flex;
      justify-content: space-between;

      i {
        font-size: 14px;
        font-weight: bold;
        color: #2697e2;
        padding: 0 0 7px 0;
      }
    }

    .cell-item {
      display: flex;
      align-items: center;
    }
  }
}

.card-list {
  margin: 20px 0;
}

.plan {
  width: 50%;

  .plan-card {}
}
</style>