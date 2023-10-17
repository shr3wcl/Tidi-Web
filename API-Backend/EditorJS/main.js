const getData = async () => {
    const id = window.location.pathname.split('/')[2];
    const rawData = await fetch(`/v1/user/blogs/${id}`).then(data => data.json());
    const data = rawData.blog.content;
    console.log(data);
    const editor = await new EditorJS(
        {
            readOnly: true,
            holder: "editorjs",
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
                    class: Checklist,
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

                // image: {
                //     class: Image,
                //     tunes: ['anyTuneName'],
                // },
                raw: RawTool,
                warning: Warning,

                marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M'
                },

                code: {
                    class: CodeTool,
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
                    class: AlignmentBlockTune,
                    config: {
                        default: "left",
                        blocks: {
                            header: "center",
                            list: "right"
                        }
                    }
                },

            },
            data: data
            // onChange: async function (api, event) {
            //     console.log('something changed', event);
            // }
        }
    );
    const currentUrl = window.location.href;
    const baseUrl = 'http://localhost:8000';
    const urlParams = new URLSearchParams(window.location.search);
    // const id = urlParams.get('id');

    history.pushState({}, null, `${baseUrl}/get/${id}`);
}
getData();