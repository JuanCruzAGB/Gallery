// ? HTMLCreator repositories
import List from "juancruzagb/htmlcreator/js/Boxes/List";
import Nav from "juancruzagb/htmlcreator/js/Boxes/Nav";
import Image from "juancruzagb/htmlcreator/js/Visuals/Image";

// ? Core
import Html from "juancruzagb/htmlcreator/js/Core/Html";

/**
 * * Gallery makes an excellent gallery of files.
 * @export
 * @class Gallery
 * @author Juan Cruz Armentia <juan.cruz.armentia@gmail.com>
 * @extends Html
 */
export default class Gallery extends Html {
    /**
     * * Creates an instance of Gallery.
     * @param {object} [data]
     * @param {object} [data.props]
     * @param {string} [data.props.id] Gallery primary key.
     * @param {string[]} [data.props.classList]
     * @param {string[]} [data.props.images]
     * @param {string} [data.props.nodeName]
     * @param {object} [data.state]
     * @param {string} [data.state.generate] If the Gallery Images should be generated.
     * @param {string} [data.state.selected] What Gallery Image is selected.
     * @param {boolean} [data.state.preventDefault=true] If the Button click event should execut prevent default.
     * @param {object} [data.callbacks]
     * @param {object} [data.callbacks.select]
     * @param {function} [data.callbacks.select.function]
     * @param {object} [data.callbacks.select.params]
     * @param {array} [data.children]
     * @param {HTMLElement|false} [data.parentNode]
     * @memberof Gallery
     */
    constructor (data = {
        props: {
            id: 'gallery-1',
            classList: [],
            images: [],
            nodeName: 'SECTION',
        }, state: {
            generate: false,
            id: true,
            order: null,
            preventDefault: true,
            selected: false,
        }, callbacks: {
            select: {
                function: (params) => { /* console.log(params) */ },
                params: {},
            },
        }, children: [],
        parentNode: false,
    }) {
        let props = {
            ...Gallery.props,
            ...(data && data.hasOwnProperty('props')) ? data.props : {},
        };
        if (props.hasOwnProperty('classList')) {
            props.classList.unshift('gallery');
        }
        let state = {
            ...Gallery.state,
            ...(data && data.hasOwnProperty('state')) ? data.state : {},
        };
        super({
            props: props,
            state: state,
            callbacks: {
                ...Gallery.callbacks,
                ...(data && data.hasOwnProperty('callbacks')) ? data.callbacks : {},
            }, children: [
                ...Gallery.children({
                    props: props,
                    state: state,
                }),
                ...(data && data.hasOwnProperty('children')) ? data.children : [],
            ], parentNode: (data && data.hasOwnProperty('parentNode')) ? data.parentNode : false,
        });
        if (!this.children.length) {
            this.setChildren(Gallery.children(this.props));
        }
        this.setButtons();
        this.setImage();
        this.checkState();
    }

    /**
     * * Set the Gallery Buttons.
     * @param {array} [buttons]
     * @memberof Gallery
     */
    setButtons (buttons = []) {
        if (!this.buttons) {
            this.buttons = [];
        }
        if (!buttons.length) {
            for (const child of this.children) {
                if (child instanceof Nav) {
                    for (const navChild of child.children) {
                        if (navChild instanceof List) {
                            for (const item of navChild.items) {
                                for (const itemChild of item.children) {
                                    if (itemChild.hasClassName('gallery-button')) {
                                        itemChild.setCallbacks({
                                            click: {
                                                function: (params) => this.select(itemChild.props.id, params),
                                            },
                                        });
                                        this.buttons.push(itemChild);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            console.log('Create buttons by array not supported yet');
        }
    }

    /**
     * * Set the Gallery Image.
     * @param {string} [source]
     * @memberof Gallery
     */
    setImage (source = false) {
        if (!source) {
            for (const child of this.children) {
                if (child instanceof Image) {
                    if (child.hasClassName('gallery-image')) {
                        this.image = child;
                    }
                }
            }
        } else {
            console.log('Set image source not supported yet');
        }
    }

    /**
     * * Check the Gallery state values.
     * @memberof Gallery
     */
    checkState () {
        this.checkSelectedState();
    }

    /**
     * * Check the Gallery selected state values.
     * @memberof Gallery
     */
    checkSelectedState () {
        if (this.state.selected) {
            this.select(this.state.selected);
        }
    }

    /**
     * * Select a new Image.
     * @param {string} id
     * @memberof Gallery
     */
    select (id = false, params = {}) {
        let found = false;
        if (id) {
            for (const btn of this.buttons) {
                btn.inactive();
                if (btn.props.id == id) {
                    found = btn;
                }
            }
            if (found) {
                for (const child of found.children) {
                    if (child instanceof Image) {
                        if (child.hasClassName('gallery-button-image')) {
                            this.image.src = child.props.src;
                        }
                    }
                }
                found.active();
                return true;
            }
        }
        this.execute('select', {
            ...this.hasCallback('select') ? this.callbacks.select.params : {},
            ...params,
            selected: found,
            Gallery: this,
        });
        return false;
    }
    
    /**
     * @static
     * @var {object} props Default properties.
     * @memberof Gallery
     */
    static props = {
        id: 'gallery-1',
        classList: [],
        images: [],
        nodeName: 'SECTION',
    }
    
    /**
     * @static
     * @var {object} state Default state.
     * @memberof Gallery
     */
    static state = {
        generate: false,
        id: true,
        order: null,
        preventDefault: true,
        selected: false,
    }
    
    /**
     * @static
     * @var {object} callbacks Default callbacks.
     * @memberof Gallery
     */
    static callbacks = {
        select: {
            function: (params) => { /* console.log(params) */ },
            params: {},
        },
    }

    /**
     * * Returns the default Gallery children.
     * @static
     * @param {object} data Gallery data.
     * @returns {array}
     * @memberof Button
     */
    static children (data = {}) {
        if (!data) {
            data = {};
        }
        if (!data.hasOwnProperty('props')) {
            data.props = {};
        }
        if (!data.hasOwnProperty('state')) {
            data.state = {};
        }
        return [
            ['nav', {
                props: {
                    id: `${ data.props.id }-nav`,
                    classList: ['gallery-nav'],
                }, children: [
                    ['ul', {
                        props: {
                            id: `${ data.props.id }-menu-list`,
                            classList: ['gallery-menu-list'],
                        }, items: (() => {
                            let items = [];
                            for (const key in data.props.images) {
                                if (Object.hasOwnProperty.call(data.props.images, key)) {
                                    items.push({
                                        props: {
                                            id: `${ data.props.id }-item-${ parseInt(key) + 1 }`,
                                            classList: ['gallery-item'],
                                        }, children: [
                                            ['button', {
                                                props: {
                                                    id: `${ data.props.id }-button-${ parseInt(key) + 1 }`,
                                                    classList: key == 0 ? ['gallery-button', 'active'] : ['gallery-button'],
                                                }, children: [
                                                    ['img', {
                                                        props: {
                                                            id: `${ data.props.id }-button-${ parseInt(key) + 1 }-image`,
                                                            classList: ['gallery-button-image'],
                                                            src: data.props.images[key],
                                                            name: 'Image genereted with htmlcreator/Gallery',
                                                        },
                                                    }],
                                                ],
                                            }],
                                            (data.state.hasOwnProperty('order') && data.state.hasOwnProperty('order') != null)
                                                ? ['label', {
                                                    children: ':D',
                                                }]
                                                : [],
                                        ],
                                    });
                                }
                            }
                            return items;
                        })(),
                    }],
                ],
            }], ['img', {
                props: {
                    id: `${ data.props.id }-image`,
                    classList: ['gallery-image'],
                    src: [...data.props.images].shift(),
                    name: 'Image genereted with htmlcreator/Gallery',
                },
            }],
        ]
    }
}