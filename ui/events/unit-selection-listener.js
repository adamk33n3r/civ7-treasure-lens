import LensManager from '/core/ui/lenses/lens-manager.js';
import { InterfaceMode, InterfaceModeChangedEventName } from '/core/ui/interface-modes/interface-modes.js';
import { LAYER_ID, LENS_ID } from '../../globals.js';

function isSettler(type) {
    const unitDef = GameInfo.Units.lookup(type);
    if (unitDef) {
        if (unitDef.UnitType == "UNIT_SETTLER") {
            return true;
        } else {
            // Check for replacements
            const replaceDef = GameInfo.UnitReplaces.lookup(type);
            if (replaceDef != null && replaceDef.ReplacesUnitType == "UNIT_SETTLER") {
                return true;
            }
        }
    }
    return false;
}

function onInterfaceModeChanged() {
    if (InterfaceMode.isInInterfaceMode('INTERFACEMODE_UNIT_SELECTED')) {
        const unitId = UI.Player.getHeadSelectedUnit();
        if (unitId) {
            const unit = Units.get(unitId);
            if (unit && isSettler(unit.type)) {
                // LensManager.setActiveLens(LENS_ID);
                LensManager.enableLayer(LAYER_ID);
            }
        }
    }
}

// Not listening to "UnitSelectionChanged" event because interface-mode-unit-selected.js's listener will be
// registered after the interface is changed. Hence it's setUnitLens method will reset the lens to default.
window.addEventListener(InterfaceModeChangedEventName, onInterfaceModeChanged);
