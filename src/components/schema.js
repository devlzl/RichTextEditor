import { Schema } from 'prosemirror-model'
import { schema as basicSchema } from 'prosemirror-schema-basic'
import audioFileIcon from '../assets/block/audioFile.png'
import videoFileIcon from '../assets/block/videoFile.png'
import uploadingImageIcon from '../assets/block/uploading-image.png'
import reuploadImageIcon from '../assets/block/reupload-image.png'
import uploadingFileIcon from '../assets/block/uploading-file.png'
import reuploadFileIcon from '../assets/block/reupload-file.png'


const imageNodeSpec = {
    attrs: {
        src: {
            default: ''
        },
        backgroundImage: {
            default: ''
        },
        height: {
            default: 0
        },
    },
    inline: true,
    group: 'inline',
    toDOM: (node) => {
        return [
            'img',
            {
                src: node.attrs.src,
                style: `
                    display: block;
                    width: 700px;
                    margin: 20px auto;
                    height: ${node.attrs.height}px;
                    background-image: url(${node.attrs.backgroundImage});
                    background-size: cover;
                `
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


const uploadingImageNodeSpec = {
    attrs: {
        previewUrl: {
            default: ''
        },
    },
    inline: true,
    group: 'inline',
    toDOM: (node) => {
        return [
            'uploading-image',
            {
                style: `
                    display: flex;
                    position: relative;
                    width: 700px;
                    margin: 20px auto;
                `,
            },
            [
                'style',
                {},
                `
                    @keyframes rotate {
                        from { transform: rotate(360deg); }
                        to { transform: rotate(0deg); }
                    }
                `
            ],
            [
                'img',
                {
                    src: node.attrs.previewUrl,
                    style: `
                        width: 100%;
                    `
                }
            ],
            [
                'div',
                {
                    style: `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(53, 53, 53, 0.7);
                    `
                }
            ],
            [
                'img',
                {
                    src: uploadingImageIcon,
                    style: `
                        position: absolute;
                        width: 24px;
                        right: 32px;
                        bottom: 22px;
                        animation: rotate 1s linear infinite;
                    `
                }
            ]
        ]
    },
    parseDOM: [{
        tag: 'uploading-image',
        getAttrs(dom) {
            return {}
        }
    }]
}


const reuploadImageNodeSpec = {
    attrs: {
        previewUrl: {
            default: ''
        },
    },
    inline: true,
    group: 'inline',
    toDOM: (node) => {
        return [
            'reupload-image',
            {
                style: `
                    display: flex;
                    position: relative;
                    width: 700px;
                    margin: 20px auto;
                `,
            },
            [
                'img',
                {
                    src: node.attrs.previewUrl,
                    style: `
                        width: 100%;
                    `
                }
            ],
            [
                'div',
                {
                    style: `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(53, 53, 53, 0.7);
                    `
                }
            ],
            [
                'img',
                {
                    class: 'reupload-image',
                    src: reuploadImageIcon,
                    style: `
                        position: absolute;
                        width: 24px;
                        right: 32px;
                        bottom: 22px;
                        cursor: pointer;
                    `
                }
            ]
        ]
    },
    parseDOM: [{
        tag: 'reupload-image',
        getAttrs(dom) {
            return {}
        }
    }]
}


const uploadingFileNodeSpec = {
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
            'uploading-file',
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
                    src: uploadingFileIcon,
                    style: `
                        width: 20px;
                        position: relative;
                        animation: rotate 1s linear infinite;
                    `
                }
            ]
        ]
    },
    parseDOM: [{
        tag: 'uploading-file',
        getAttrs(dom) {
            return {}
        }
    }]
}


const reuploadFileNodeSpec = {
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
            'reupload-file',
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
                    class: 'reupload-file',
                    src: reuploadFileIcon,
                    style: `
                        width: 20px;
                        cursor: pointer;
                    `,
                }
            ]
        ]
    },
    parseDOM: [{
        tag: 'reupload-file',
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
            .addBefore('', 'uploadingImage', uploadingImageNodeSpec)
            .addBefore('', 'reuploadImage', reuploadImageNodeSpec)
            .addBefore('', 'uploadingFile', uploadingFileNodeSpec)
            .addBefore('', 'reuploadFile', reuploadFileNodeSpec),
    marks: basicSchema.spec.marks.addBefore('', 'del', delMarkSpec)
})
