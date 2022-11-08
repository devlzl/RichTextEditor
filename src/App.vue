<script setup>
import { ref } from 'vue';
import Editor from './components/Editor.vue'


const data = ref({
    title: '',
    content: '',
})
function save() {
    console.log('save')
    console.log(data.value.title)
    console.log(data.value.content)
}
async function loadContent() {
    return '# Hello'
}
function onInput(content) {
    data.value.content = content
}
async function uploadFile(file) {
    return {
        ok: true,
        data: 'https://somepath.xxx/foo.mp3'
    }
}
</script>

<template>
    <div class="top">
        <button class="save" @click="save">save as markdown</button>
    </div>
    <div class="main">
        <input class="title" v-model="data.title" placeholder="title">
        <Editor placeholder="content" :loadContent="loadContent" @input="onInput" :uploadFile="uploadFile" />
    </div>
</template>

<style lang="scss" scoped>
.top {
    position: sticky;
    top: 0;
    z-index: 1;
    height: 70px;
    background-color: white;
    .save {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(-16px, -50%);
        width: 200px;
        height: 38px;
        font-size: 20px;
        border: none;
        background-color: darkseagreen;
        color: white;
        border-radius: 4px;
        cursor: pointer;
    }
}

.main {
    width: 800px;
    margin: 0 auto;
    .title {
        width: 100%;
        font-size: 36px;
        padding: 18px 10px;
        border: none;
        outline: none;
        font-family: system-ui;
        border-bottom: 1px solid lightgray;
    }
}
</style>
