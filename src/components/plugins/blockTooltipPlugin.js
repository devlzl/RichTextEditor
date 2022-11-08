import { Plugin, TextSelection } from 'prosemirror-state'
import plusImg from '../../assets/block/plus.png'
import h1Img from '../../assets/block/h1.png'
import h2Img from '../../assets/block/h2.png'
import h3Img from '../../assets/block/h3.png'
import imgImg from '../../assets/block/img.png'
import audioImg from '../../assets/block/audio.png'
import videoImg from '../../assets/block/video.png'
import { schema } from '../schema'
import { update } from '../update'
import { formattedFileSize } from './utils'


async function uploadFile() {
    return { ok: false, data: null }
}
export function setUploadFile(realUploadFile) {
    uploadFile = realUploadFile
}
function createFileInput(view) {
    let fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.onchange = async (event) => {
        let target = event.target
        let file = target.files[0]
        let fileType = fileInput.accept.split('/')[0]
        let fileName = file.name
        let fileSize = formattedFileSize(file.size)
        if (fileType === 'image') {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                let nodeType = schema.nodes.image
                let imgNode = nodeType.create({ src: reader.result })
                view.dispatch(view.state.tr.replaceSelectionWith(imgNode))
                update.emit()
                view.focus()
            }
        } else if (fileType === 'audio' || fileType === 'video') {
            let uploadingNode = schema.nodes.uploading.create({ fileType, fileName, fileSize })
            view.dispatch(view.state.tr.replaceSelectionWith(uploadingNode))
            let from = view.state.selection.from

            async function upload() {
                let result = await uploadFile(file)
                if (result.ok) {
                    let nodeType = schema.nodes[fileType]
                    let node = nodeType.create({ src: result.data })
                    view.dispatch(view.state.tr.replaceWith(from - 1, from, node))
                    update.emit()
                    view.focus()    
                } else {
                    let nodeType = schema.nodes.reupload
                    let node = nodeType.create({ fileType, fileName, fileSize })
                    view.dispatch(view.state.tr.replaceWith(from - 1, from, node))
                    update.emit()
                    view.focus()
                    document.querySelector('.reupload').addEventListener('click', () => {
                        view.dispatch(view.state.tr.replaceWith(from - 1, from, uploadingNode))
                        upload()
                    })
                }
            }
            await upload()
        }
        target.value = ''
    }
    return fileInput
}


function createDom(view, fileInput) {
    function createContainer() {
        let container = document.createElement('div')
        container.className = 'block-tooltip'
        container.style.opacity = 0
        return container
    }
    function createOperates() {
        let operates = document.createElement('div')
        operates.className = 'operates'
        operates.style.opacity = 0
        return operates
    }
    function createPlusButton() {
        let plusButton = document.createElement('img')
        plusButton.className = 'plus'
        plusButton.src = plusImg
        plusButton.addEventListener('click', (event) => {
            event.stopPropagation()
            operates.style.opacity = Number(!Number(operates.style.opacity))
        })
        window.addEventListener('click', () => {
            if (operates.style.opacity === '1') {
                operates.style.opacity = 0
            }
        })
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                operates.style.opacity = 0
            }
        })
        return plusButton
    }
    function createH1() {
        let h1 = document.createElement('img')
        h1.classList.add('operate-item')
        h1.src = h1Img
        h1.addEventListener('click', () => {
            let pos = view.posAtCoords({ left: 800, top: plusButton.getBoundingClientRect().top + 15, })?.pos
            let tr = view.state.tr
            tr.setBlockType(pos, pos, schema.nodes.heading, { level: 1 })
            let newState = view.state.apply(tr)
            view.updateState(newState)
            update.emit()
        })
        return h1
    }
    function createH2() {
        let h2 = document.createElement('img')
        h2.classList.add('operate-item')
        h2.src = h2Img
        h2.addEventListener('click', () => {
            let pos = view.posAtCoords({ left: 800, top: plusButton.getBoundingClientRect().top + 15, })?.pos
            let tr = view.state.tr
            tr.setBlockType(pos, pos, schema.nodes.heading, { level: 2 })
            let newState = view.state.apply(tr)
            view.updateState(newState)
            update.emit()
        })
        return h2
    }
    function createH3() {
        let h3 = document.createElement('img')
        h3.classList.add('operate-item')
        h3.src = h3Img
        h3.addEventListener('click', () => {
            let pos = view.posAtCoords({ left: 800, top: plusButton.getBoundingClientRect().top + 15, })?.pos
            let tr = view.state.tr
            tr.setBlockType(pos, pos, schema.nodes.heading, { level: 3 })
            let newState = view.state.apply(tr)
            view.updateState(newState)
            update.emit()
        })
        return h3
    }
    function setCursorPos() {
        let pos = view.posAtCoords({ left: 800, top: plusButton.getBoundingClientRect().top + 15, }).pos
        let resolvedPos = view.state.doc.resolve(pos)
        let selection = new TextSelection(resolvedPos, resolvedPos)
        let tr = view.state.tr
        tr.setSelection(selection)
        let newState = view.state.apply(tr)
        view.updateState(newState)
        view.focus()
    }
    function createImage() {
        let img = document.createElement('img')
        img.classList.add('operate-item')
        img.src = imgImg
        img.addEventListener('click', () => {
            setCursorPos()
            fileInput.accept = 'image/*'
            fileInput.click()
        })
        return img
    }
    function createAudio() {
        let audio = document.createElement('img')
        audio.classList.add('operate-item')
        audio.src = audioImg
        audio.addEventListener('click', () => {
            setCursorPos()
            fileInput.accept = 'audio/*'
            fileInput.click()
        })
        return audio
    }
    function createVideo() {
        let video = document.createElement('img')
        video.classList.add('operate-item')
        video.src = videoImg
        video.addEventListener('click', () => {
            setCursorPos()
            fileInput.accept = 'video/*'
            fileInput.click()
        })
        return video
    }
    let container = createContainer()
    let operates = createOperates()
    let plusButton = createPlusButton()
    let h1 = createH1()
    let h2 = createH2()
    let h3 = createH3()
    let img = createImage()
    let audio = createAudio()
    let video = createVideo()
    operates.appendChild(h1)
    operates.appendChild(h2)
    operates.appendChild(h3)
    operates.appendChild(img)
    operates.appendChild(audio)
    operates.appendChild(video)
    container.appendChild(plusButton)
    container.appendChild(operates)
    return container
}


class BlockTooltip {
    constructor(view) {
        this.fileInput = createFileInput(view)
        this.tooltip = createDom(view, this.fileInput)
        view.dom.parentNode.appendChild(this.tooltip)
        window.addEventListener('mousemove', (event) => {
            // 如果已经点开 plusButton, 则保持不变
            let operates = this.tooltip.querySelector('.operates')
            if (operates.style.opacity === '1') {
                return
            }
            // 如果离开编辑器, 则隐藏
            let { left, right, top, bottom } = view.dom.getBoundingClientRect()
            if (event.clientX < left - 40 || event.clientX > right || event.clientY < top || event.clientY > bottom) {
                this.tooltip.style.opacity = '0'
                return
            }
            // 先获取鼠标所对应的文档中的位置
            let pos = view.posAtCoords({ left: left + 100, top: event.clientY, })?.pos
            if (pos === void 0 || pos === view.state.doc.content.size) {
                return
            }
            // 然后再把文档中的位置转换回页面上的位置使得和文档的行对齐
            let topCoord = view.coordsAtPos(pos).top
            this.tooltip.style.opacity = '1'
            this.tooltip.style.top = `${topCoord}px`
            this.tooltip.style.left = `${left - 30}px`
        })
        this.update(view, null)
    }

    update(view, lastState) {
        let state = view.state
        // 如果文档或选区没有更改, 直接 return
        if (lastState?.doc.eq(state.doc) && lastState.selection.eq(state.selection)) {
            return
        }
    }

    destroy() {
        this.tooltip.remove()
    }
}


export default new Plugin({
    view(editorView) {
        return new BlockTooltip(editorView)
    }
})
