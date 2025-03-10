import { LENS_ID } from '../../globals.js';

class LensPanelDecorator {
    constructor(minimap) {
        this.minimap = minimap;
    }

    beforeAttach() {}

    afterAttach() {
        this.minimap.createLensButton("LOC_UI_MINIMAP_TREASURE", LENS_ID, "lens-group");
    }

    beforeDetach() {}

    afterDetach() {}

    onAttributeChanged(name, oldValue, newValue) {}
}

Controls.decorate('lens-panel', (minimap) => new LensPanelDecorator(minimap));
