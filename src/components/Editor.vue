<script setup>
import { ref, onMounted } from 'vue';
import MarkdownIt from 'markdown-it'
import { DOMParser } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { undo, redo, history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'
import { schema } from './schema'
import placeholderPlugin from './plugins/placeholderPlugin'
import inlineTooltipPlugin from './plugins/inlineTooltipPlugin'
import blockTooltipPlugin, { setUploadFile } from './plugins/blockTooltipPlugin'
import { update } from './update'
const md = new MarkdownIt({ html: true })
const emit = defineEmits(['input'])
update.setEmit(emit)


const props = defineProps({
    placeholder: {
        type: String,
        default: ''
    },
    loadContent: {
        type: Function,
        default: async () => ''
    },
    uploadFile: {
        type: Function,
        default: async () => ({ ok: false, data: null })
    }
})
setUploadFile(props.uploadFile)


const editorRef = ref(null)
onMounted(async () => {
    let content = await props.loadContent()
    let container = document.createElement('div')
    container.innerHTML = md.render(content)
    let doc = DOMParser.fromSchema(schema).parse(container)

    let config = {
        doc: doc,
        schema: schema,
        plugins: [
            history(),
            keymap({ "Cmd-z": undo, "Cmd-Z": redo }),
            keymap(baseKeymap),
            placeholderPlugin(props.placeholder),
            inlineTooltipPlugin,
            blockTooltipPlugin,
        ]
    }
    const state = EditorState.create(config)
    const view = new EditorView(editorRef.value, {
        state,
        dispatchTransaction(transaction) {
            let newState = view.state.apply(transaction)
            view.updateState(newState)
            if (transaction.before.content !== transaction.doc.content) {
                update.emit()
            }
        }
    })
    view.focus()
    update.setView(view)
})
</script>


<template>
    <div class="editor" ref="editorRef"></div>
</template>

<style lang="scss">
.editor {
    position: relative;
    width: 800px;
    font-family: system-ui;
    .ProseMirror {
        padding: 10px;
        font-size: 18px;
        line-height: 1.625;
        h1 {
            font-size: 32px;
        }
        h2 {
            font-size: 24px;
        }
        h3 {
            font-size: 21px;
        }
    }
    .ProseMirror:focus-visible {
        outline: none;
    }

    .operate-item {
        cursor: pointer;
        border-radius: 2px;
    }
    .operate-item:hover {
        background-color: lightgray;
    }

    .inline-tooltip {
        position: absolute;
        z-index: 1;
        background: #ffffff;
        box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 8%);
        border-radius: 6px;
        border: 1px solid #F4F4F4;
        padding: 10px;
    }

    .block-tooltip {
        position: fixed;
        z-index: 1;
        transition: opacity 0.3s, top 0.3s;
        .plus {
            cursor: pointer;
        }
        .operates {
            position: absolute;
            left: 0;
            top: 30px;
            width: 180px;
            background: #FFFFFF;
            box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 8%);
            border-radius: 6px;
            border: 1px solid #F4F4F4;
            transition: opacity 0.3s;
            padding: 10px;
        }
    }
}
</style>
