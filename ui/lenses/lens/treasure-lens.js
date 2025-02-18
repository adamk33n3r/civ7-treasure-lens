import { LAYER_ID, LENS_ID } from '../../../globals.js';
import LensManager from '/core/ui/lenses/lens-manager.js';

class TreasureLens {
    constructor() {
        // Default layers
        this.activeLayers = new Set([
            'fxs-hexgrid-layer',
            'fxs-resource-layer',
            'fxs-culture-borders-layer',
            LAYER_ID,
        ]);

        // Layers that are allowed to be enabled while lens is active. Ignored
        this.allowedLayers = new Set([
            'fxs-yields-layer'
        ]);
    }
}
LensManager.registerLens(LENS_ID, new TreasureLens());
