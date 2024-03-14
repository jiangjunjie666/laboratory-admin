<template>
  <div style="min-height: 500px;">
    <div ref="vantaRef" style="width: 100vw; height: 100vh;">
      <div class="login">
        <h1>登录</h1>
        <el-form ref="ruleFormRef" :rules="rules" label-position="left" :model="ruleForm" style="max-width: 350px">
          <el-form-item label="账号" prop="username" label-width="65px">
            <el-input :suffix-icon="User" v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password" label-width="65px">
            <el-input :suffix-icon="Lock" v-model="ruleForm.password" type="password" show-password="true" />
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input :suffix-icon="Cellphone" v-model="ruleForm.code" style="width: 120px;" />
            <img :src="codeUrl" alt="验证码" @click="updateCode">
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="submitFormLogin(ruleFormRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 其他内容 -->
  </div>
</template>

<script setup>
import BIRDS from 'vanta/dist/vanta.birds.min'; // Vanta.js库
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue';
import { User, Lock, Cellphone } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/users.js'
import { useRouter } from 'vue-router'
import { reqLogin } from '@/api/users.js'
import { ElMessage } from 'element-plus'
//验证码接口
const codeUrl = ref('/api/api/captcha')
const ruleFormRef = ref()

const $Router = useRouter()
const userStore = useUserStore()
//表单
const ruleForm = reactive({
  username: 'admin',
  password: '123456',
  //验证码
  code: '',
})
//定义校验规则
const rules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },

  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入计算结果', trigger: 'blur' }
  ],
})
//登录
const submitFormLogin = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // 提交表单，发送请求
      console.log('submit!', ruleForm)
      const res = await reqLogin(ruleForm)
      console.log(res);
      if (res.status !== 0) {
        //失败
        return ElMessage({
          type: 'error',
          message: res.message,
        })
      }
      //成功
      ElMessage({
        type: 'success',
        message: '登录成功',
      })
      //跳转至首页，存储token以及用户信息
      const data = userStore.saveUserInfo(res.data)
      //清空路由存储信息
      localStorage.setItem('visitedRoutes', '[]')
      if (data) {
        $Router.push('/')
      }

    } else {
      //先检查username  
      if (fields.username) {
        return ElMessage({
          type: 'error',
          message: fields.username[0].message
        })
      }
      if (fields.password) {
        return ElMessage({
          type: 'error',
          message: fields.password[0].message
        })
      }
      if (fields.code) {
        return ElMessage({
          type: 'error',
          message: fields.code[0].message
        })
      }
    }
  })
}
//刷新验证码
const updateCode = () => {
  codeUrl.value = '/api/api/captcha?time=' + new Date().getTime()
}

//背景页的配置项，参考官网
const vantaRef = ref(null);
let vantaEffect = null;
onMounted(() => {
  //刷新验证码
  // 初始化 Vanta.js 效果
  vantaEffect = BIRDS({
    el: vantaRef.value,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color1: 0x5f3c3c,
    color2: 0x33be7b,
    birdSize: 1.60,
    separation: 41.00,
    alignment: 22.00,
    cohesion: 35.00,
    quantity: 4.00
  })
});
//页面关闭后 注销three动画效果 影响性能
onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>

<style lang="scss" scoped>
.login {
  width: 350px;
  height: 300px;
  // background-color: #4477be;
  // 定位到中心
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  //加一点透明模糊背景
  background-color: rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  h1 {
    color: #fff;
    font-size: 25px;
    text-align: center;
    margin-bottom: 20px;
  }

  //深度选择器
  :deep(.el-form-item__label) {
    color: #fff;
  }

  .login-btn {
    // 文字居中
    width: 100%;
    margin: 10px auto;
    background-color: rgba(0, 0, 0, 0.1);
    text-align: center;
    border: 1px solid #409EFF;
    color: #fff;

    &:hover {
      background-color: #409EFF;
    }
  }

  img {
    width: 110px;
    height: 35px;
    margin-left: 10px;
  }
}
</style>