import { defaultMarkdownSerializer } from 'prosemirror-markdown'


export const update = {
    _view: null,
    _emit: null,
    setView(view) {
        this._view = view
    },
    setEmit(emit) {
        this._emit = emit
    },
    emit() {
        this._emit('input', defaultMarkdownSerializer.serialize(this._view.state.doc))
    }
}
