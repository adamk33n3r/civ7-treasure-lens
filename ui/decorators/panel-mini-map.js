import { LENS_ID } from '../../globals.js';

class PanelMiniMapDecorator {
    constructor(minimap) {
        this.minimap = minimap;
    }

    beforeAttach() {}

    afterAttach() {
        const isExplorationAge = Game.age == Game.getHash("AGE_EXPLORATION")
        if (isExplorationAge) {
            this.minimap.createLensButton("LOC_UI_MINIMAP_TREASURE", LENS_ID, "lens-group");
        }
    }

    beforeDetach() {}

    afterDetach() {}

    onAttributeChanged(name, oldValue, newValue) {}
}

Controls.decorate('panel-mini-map', (minimap) => new PanelMiniMapDecorator(minimap));
