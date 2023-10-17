const EditorJS = require('@editorjs/editorjs');
const Embed = require('@editorjs/embed');
const Table = require('@editorjs/table');
const Paragraph = require('@editorjs/paragraph');
const List = require('@editorjs/list');
const Warning = require('@editorjs/warning');
const Code = require('@editorjs/code');
const LinkTool = require('@editorjs/link');
const Image = require('@editorjs/image');
const Raw = require('@editorjs/raw');
const Header = require('@editorjs/header');
const Quote = require('@editorjs/quote');
const Marker = require('@editorjs/marker');
const CheckList = require('@editorjs/checklist');
const Delimiter = require('@editorjs/delimiter');
const InlineCode = require('@editorjs/inline-code');
const SimpleImage = require('@editorjs/simple-image');
const AlignmentTuneTool = require('editorjs-text-alignment-blocktune');

 
const initData = {
    blocks: [
        {
            type: "header",
            data: {
                text: "Title of post",
                level: 1
            }
        },
        { 
            type: 'paragraph',
            data: {
                text: 'What you want to tell everyone'
            }
        },
    ]
}

const config = (mode, holder = 'editorjs', data = initData) => {
    return new EditorJS(
        {
            readOnly: mode,
            holder: holder,
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['marker', 'link'],
                    config: {
                        placeholder: 'Header'
                    },
                    tunes: ['anyTuneName'],
                    shortcut: 'CMD+SHIFT+H'
                },
                SimpleImage: {
                    class: SimpleImage,
                    tunes: ['anyTuneName'],
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+L'
                },

                checklist: {
                    class: CheckList,
                    inlineToolbar: true,
                },

                quote: {
                    class: Quote,
                    inlineToolbar: true,
                    config: {
                        quotePlaceholder: 'Enter a quote',
                        captionPlaceholder: 'Quote\'s author',
                    },
                    shortcut: 'CMD+SHIFT+O',
                    tunes: ['anyTuneName'],
                },

                image: {
                    class: Image,
                    tunes: ['anyTuneName'],
                },
                raw: Raw,
                warning: Warning,

                marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M'
                },

                code: {
                    class: Code,
                    shortcut: 'CMD+SHIFT+C',
                    tunes: ['anyTuneName'],
                },

                delimiter: Delimiter,

                inlineCode: {
                    class: InlineCode,
                    shortcut: 'CMD+SHIFT+C'
                },

                linkTool: LinkTool,

                embed: Embed,

                table: {
                    class: Table,
                    inlineToolbar: true,
                    shortcut: 'CMD+ALT+T'
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                    tunes: ['anyTuneName'],
                },
                anyTuneName: {
                    class: AlignmentTuneTool,
                    config: {
                        default: "left",
                        blocks: {
                            header: "center",
                            list: "right"
                        }
                    }
                },

            },
            data: data,
            // onChange: async function (api, event) {
            //     console.log('something changed', event);
            // }
        }
    );
}

module.exports = config
