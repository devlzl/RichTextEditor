import { Schema } from 'prosemirror-model'
import { schema as basicSchema } from 'prosemirror-schema-basic'
import audioFileIcon from '../assets/block/audioFile.png'
import videoFileIcon from '../assets/block/videoFile.png'
import loadingIcon from '../assets/block/loading.png'
import reuploadIcon from '../assets/block/reupload.png'


const imageNodeSpec = {
    attrs: {
        src: {
            default: ''
        }
    },
    inline: true,
    group: 'inline',
    toDOM: (node) => {
        return [
            'img',
            {
                src: node.attrs.src,
                style: 'display: block; width: 700px; margin: 20px auto;'
            }
        ]
    },
    parseDOM: [{
        tag: 'img',
        getAttrs(dom) {
            return {
                src: dom.src
            }
        }
    }]
}


const audioNodeSpec = {
    attrs: {
        src: {
            default: ''
        }
    },
    inline: true,
    group: 'inline',
    toDOM: (node) => {
        return [
            'audio',
            {
                controls: 'true',
                src: node.attrs.src,
                style: 'display: block; width: 700px; margin: 20px auto;'
            }
        ]
    },
    parseDOM: [{
        tag: 'audio',
        getAttrs(dom) {
            return {
                src: dom.src
            }
        }
    }]
}


const videoNodeSpec = {
    attrs: {
        src: {
            default: ''
        }
    },
    inline: true,
    group: 'inline',
    toDOM: (node) => {
        return [
            'video',
            {
                controls: 'true',
                src: node.attrs.src,
                style: 'display: block; width: 700px; margin: 20px auto;'
            }
        ]
    },
    parseDOM: [{
        tag: 'video',
        getAttrs(dom) {
            return {
                src: dom.src
            }
        }
    }]
}


const uploadingNodeSpec = {
    attrs: {
        fileType: {
            default: ''
        },
        fileName: {
            default: ''
        },
        fileSize: {
            default: ''
        }
    },
    inline: true,
    group: 'inline',
    toDOM: (node) => {
        return [
            'uploading',
            {
                style: `
                    display: flex;
                    align-items: center;
                    margin: 20px auto;
                    width: 420px;
                    height: 73px;
                    border: 1px solid #AAACAE;
                    border-radius: 8px;
                `,
            },
            [
                'img',
                {
                    src: node.attrs.fileType === 'audio' ? audioFileIcon : videoFileIcon,
                    style: `
                        width: 36px;
                        height: 36px;
                        margin-left: 30px;
                    `
                }
            ],
            [
                'div',
                {
                    style: `
                        margin-left: 16px;
                        width: 290px;
                    `
                },
                [
                    'div',
                    {
                        style: `
                            font-size: 16px;
                        `
                    },
                    node.attrs.fileName
                ],
                [
                    'div',
                    {
                        style: `
                            font-size: 12px;
                            color: #AAACAE;
                        `
                    },
                    node.attrs.fileSize
                ]
            ],
            [
                'style',
                {},
                `
                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `
            ],
            [
                'img',
                {
                    src: loadingIcon,
                    style: `
                        position: relative;
                        animation: rotate 1s linear infinite;
                    `
                }
            ]
        ]
    },
    parseDOM: [{
        tag: 'uploading',
        getAttrs(dom) {
            return {}
        }
    }]
}


const reuploadNodeSpec = {
    attrs: {
        fileName: {
            default: ''
        },
        fileSize: {
            default: ''
        }
    },
    inline: true,
    group: 'inline',
    toDOM: (node) => {
        return [
            'reupload',
            {
                style: `
                    display: flex;
                    align-items: center;
                    margin: 20px auto;
                    width: 420px;
                    height: 73px;
                    border: 1px solid #AAACAE;
                    border-radius: 8px;
                `,
            },
            [
                'img',
                {
                    src: node.attrs.fileType === 'audio' ? audioFileIcon : videoFileIcon,
                    style: `
                        width: 36px;
                        height: 36px;
                        margin-left: 30px;
                    `
                }
            ],
            [
                'div',
                {
                    style: `
                        margin-left: 16px;
                        width: 290px;
                    `
                },
                [
                    'div',
                    {
                        style: `
                            font-size: 16px;
                        `
                    },
                    node.attrs.fileName
                ],
                [
                    'div',
                    {
                        style: `
                            font-size: 12px;
                            color: #AAACAE;
                        `
                    },
                    node.attrs.fileSize
                ]
            ],
            [
                'style',
                {},
            ],
            [
                'img',
                {
                    class: 'reupload',
                    src: reuploadIcon,
                    style: `
                        cursor: pointer;
                    `,
                }
            ]
        ]
    },
    parseDOM: [{
        tag: 'reupload',
        getAttrs(dom) {
            return {}
        }
    }]
}


const delMarkSpec = {
    content: 'inline*',
    toDOM() {
        return ['del', 0]
    },
    parseDOM: [{
        tag: 'del'
    }]
}


export const schema = new Schema({
    nodes: basicSchema.spec.nodes
            .addBefore('', 'image', imageNodeSpec)
            .addBefore('', 'audio', audioNodeSpec)
            .addBefore('', 'video', videoNodeSpec)
            .addBefore('', 'uploading', uploadingNodeSpec)
            .addBefore('', 'reupload', reuploadNodeSpec),
    marks: basicSchema.spec.marks.addBefore('', 'del', delMarkSpec)
})
