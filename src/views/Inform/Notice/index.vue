<template>
  <div>
    <el-button @click="insertText">insert text</el-button>
    <el-card style="width: 1000px">
      <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
          :mode="mode" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
          :mode="mode" @onCreated="handleCreated" />
      </div>

    </el-card>
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p>hello <strong>world</strong></p>')

    const insertText = () => {
      const editor = editorRef.value // 获取 editor ，必须等待它渲染完之后
      if (editor == null) return
      editor.insertText(`<p>hello <strong>world</strong></p>`) // 执行 editor API
    }
    // onMounted(() => {
    //   setTimeout(() => {
    //     valueHtml.value = `<p> 模拟 Ajax 异步设置内容</p> 
    //     <h1>111</h1>
    //       `
    //   }, 1500)
    // })

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      console.log('created', editor);
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      insertText
    };
  }
}
</script>

<style lang="scss" scoped></style>