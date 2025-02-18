import { LAYER_ID } from '../../../globals.js';
import LensManager from '/core/ui/lenses/lens-manager.js';

const TREASURE_RESOURCE_COLOR = 0x9918D6F4;

const ResourceClassTypes = Object.freeze({
    EMPIRE_RESOURCE: 'RESOURCECLASS_EMPIRE',
    CITY_RESOURCE: 'RESOURCECLASS_CITY',
    FACTORY_RESOURCE: 'RESOURCECLASS_FACTORY',
    TREASURE_RESOURCE: 'RESOURCECLASS_TREASURE',
    BONUS_RESOURCE: 'RESOURCECLASS_BONUS'
});

/**
 * Adapted from wltk's Discovery Lens
 */
class TreasureLensLayer {
    constructor() {
        this.treasureOverlayGroup = WorldUI.createOverlayGroup("TreasureOverlayGroup", 1);
        this.treasureOverlay = this.treasureOverlayGroup.addPlotOverlay();
        this.treasurePlots = [];
    }

    clearOverlay() {
        this.treasureOverlayGroup.clearAll();
        this.treasureOverlay.clear();
        this.treasurePlots = [];
    }

    initLayer() {
    }

    applyLayer() {
        this.clearOverlay();
        const width = GameplayMap.getGridWidth();
        const height = GameplayMap.getGridHeight();

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (this.hasDiscovery(x, y)) {
                    this.treasurePlots.push({x, y});
                }
            }
        }

        this.treasureOverlay.addPlots(this.treasurePlots, { fillColor: TREASURE_RESOURCE_COLOR });
    }

    removeLayer() {
        this.clearOverlay();
    }

    hasDiscovery(plotX, plotY) {
        const isHidden = GameplayMap.getRevealedState(GameContext.localPlayerID, plotX, plotY) == RevealedStates.HIDDEN;
        if (isHidden) {
            return false;
        }

        const resource = GameplayMap.getResourceType(plotX, plotY);
        if (resource == ResourceTypes.NO_RESOURCE) {
            return false;
        }

        const resourceDefinition = GameInfo.Resources.lookup(resource);
        if (resourceDefinition) {
            return resourceDefinition.ResourceClassType == ResourceClassTypes.TREASURE_RESOURCE;
        }

        console.error(`Could not find resource with type ${resource}.`);
        return false;
    }
    
}

LensManager.registerLensLayer(LAYER_ID, new TreasureLensLayer());
