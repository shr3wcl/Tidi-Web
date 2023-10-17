import EditorJS from '@editorjs/editorjs';
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune'

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

const config = (mode, holder='editorjs', data = initData) => {
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

export default config;
