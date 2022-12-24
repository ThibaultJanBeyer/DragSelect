export default class SettingsStore {
    /**
     * @class ScrollStore
     * @constructor ScrollStore
     * @param {{ DS:DragSelect, settings:Settings }} p
     * @ignore
     */
    constructor({ DS, settings }: {
        DS: DragSelect;
        settings: Settings;
    });
    /**
     * @type {Settings}
     * @private
     * */
    private _settings;
    /**
     * Holds the settings and their previous value `:pre`
     * @example {
     *    autoScrollSpeed: 3,
     *    'autoScrollSpeed:pre': 5
     * }
     * @type {Settings}
     * */
    s: Settings;
    DS: DragSelect;
    /** @param {{settings: Settings, init?: boolean}} props */
    update: ({ settings, init }: {
        settings: Settings;
        init?: boolean;
    }) => void;
    /** @param {{settings: Settings, init: boolean}} props */
    _update: ({ settings, init }: {
        settings: Settings;
        init: boolean;
    }) => void;
}
import DragSelect from "../DragSelect";
import "../types"
