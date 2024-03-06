const packageArr = []

const dependencies = `
  "@element-plus/icons-vue": "^2.3.1",
  "@vueuse/core": "^10.7.1",
  "animate.css": "^4.1.1",
  "axios": "^1.6.5",
  "echarts": "^5.5.0",
  "element-plus": "^2.4.4",
  "nprogress": "^0.2.0",
  "pinia": "^2.1.7",
  "vanta": "^0.5.24",
  "vue": "^3.3.11",
  "vue-router": "^4.2.5"
`
function formatDependencies(dependencies) {
  // 将字符串按逗号分隔成数组
  const dependenciesArr = dependencies.split(',\n')
  // 去除首尾空格并按格式排版
  const formattedDependencies = dependenciesArr.map((dependency) => {
    const [name, version] = dependency.trim().replace(/"/g, '').split(': ')
    return {
      name: name,
      version: version
    }
  })
  return formattedDependencies
}

function mergeDependencies(packageArr, dependencies) {
  const formattedDependencies = formatDependencies(dependencies)
  return [...packageArr, ...formattedDependencies]
}

const mergedPackageArr = mergeDependencies(packageArr, dependencies)

//导出数据
export default mergedPackageArr
