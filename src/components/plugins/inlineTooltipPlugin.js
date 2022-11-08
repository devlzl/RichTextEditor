import { Plugin } from 'prosemirror-state'
import strongImg from '../../assets/inline/strong.png'
import emImg from '../../assets/inline/em.png'
import delImg from '../../assets/inline/del.png'
import { toggleMark } from 'prosemirror-commands'
import { schema } from '../schema'



function createDom(view) {
    let container = document.createElement('div')
    container.className = 'inline-tooltip'

    let strong = document.createElement('img')
    strong.classList.add('operate-item')
    strong.src = strongImg
    strong.addEventListener('click', () => {
        view.focus()  // 保持拖蓝区域被选中状态
        toggleMark(schema.marks.strong)(view.state, view.dispatch, view)
    })
    container.appendChild(strong)

    let em = document.createElement('img')
    em.classList.add('operate-item')
    em.src = emImg
    em.addEventListener('click', () => {
        view.focus()
        toggleMark(schema.marks.em)(view.state, view.dispatch, view)
    })
    container.appendChild(em)

    let del = document.createElement('img')
    del.classList.add('operate-item')
    del.src = delImg
    del.addEventListener('click', (event) => {
        view.focus()
        toggleMark(schema.marks.del)(view.state, view.dispatch, view)
    })
    container.appendChild(del)

    return container  
}


class InlineTooltip {
    constructor(view) {
        this.tooltip = createDom(view)
        view.dom.parentNode.appendChild(this.tooltip)
        this.update(view, null)
    }

    update(view, lastState) {
        let state = view.state
        // 如果文档或选区没有更改, 直接 return
        if (lastState?.doc.eq(state.doc) && lastState.selection.eq(state.selection)) {
            return
        }
        // 如果选区为空, 隐藏 tooltip
        if (state.selection.empty) {
            this.tooltip.style.display = 'none'
            return
        }
    
        // 更新位置, 显示内容
        this.tooltip.style.display = 'flex'
        let { from, to } = state.selection
        // 选区位置 转 视口坐标
        let start = view.coordsAtPos(from)
        let end = view.coordsAtPos(to)
        let box = this.tooltip.offsetParent.getBoundingClientRect()
        this.tooltip.style.left = `${start.left - box.left}px`
        this.tooltip.style.bottom = `${box.bottom - start.top}px`
    }
    
    destroy() {
        this.tooltip.remove()
    }
}


export default new Plugin({
    view(editorView) {
        return new InlineTooltip(editorView)
    }
})
