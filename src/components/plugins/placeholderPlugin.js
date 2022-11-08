import { Plugin } from 'prosemirror-state'
import { DecorationSet, Decoration } from 'prosemirror-view'


export default function placeholderPlugin(text) {
    return new Plugin({
        props: {
            decorations(state) {
                let doc = state.doc
                let dom = document.createElement('span')
                dom.innerText = text
                dom.style.color = 'lightgray'
                if (doc.childCount === 1 && doc.firstChild.isTextblock && doc.firstChild.content.size === 0) {
                    return DecorationSet.create(doc, [Decoration.widget(1, dom)])
                }
            }
        }
    })
}
