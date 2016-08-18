﻿import {MultiselectDirectiveController} from './multiselect-directive-controller';

//TODO: Problems with tv4 validation, only triggers validaton on check, not on blur. ($parsers will never be triggered)
/**
 * Wrapper for AngularJS Dropdown Multiselect:
 * http://dotansimha.github.io/angularjs-dropdown-multiselect/
 */
export class MultiselectDirective implements ng.IDirective {
    restrict = 'E';
    template = `<div    ng-dropdown-multiselect 
                        options='options' 
						selected-model='ngModel' 
						checkboxes='true' 
						extra-settings='settings' 
						translation-texts='translations'></div>`;
    require = ['ngModel', 'multiselect'];
    scope = {};
    bindToController = {
        ngModel: '=',    // The object the will contain the model for the selected items in the dropdown.
        options: '=',    // The options for the dropdown.
        extraSettings: '&?',   // See 'Settings' section on http://dotansimha.github.io/angularjs-dropdown-multiselect/
        translationTexts: '&?',   // See 'Translation Texts' section on http://dotansimha.github.io/angularjs-dropdown-multiselect/
        dropup: '='     // Defines if a dropup menu should be used instead on a dropdown
    };
    controller = MultiselectDirectiveController;
    controllerAs = 'ctrl';

    //TODO: discuss splitting
    link = (scope, element, attrs, controllers) => {
        let ngModelCtrl:ng.INgModelController = controllers[0];
        let multiselectCtrl:MultiselectDirectiveController = controllers[1];
        
        let container = element.find('.multiselect-parent');
        let dropdownMultiselect:any = angular.element(container).scope();
        
        if (dropdownMultiselect) {
            // Close on ESC keypress:
            element.bind('keydown', (evt) => {
                if (evt.which === 27) { // ESC key
                    evt.preventDefault();
                    evt.stopPropagation();
                    dropdownMultiselect.open = false;
                    // Trigger $digest cycle:
                    scope.$apply();
                }
            });

            // Dropup?
            if (multiselectCtrl.dropup) {
                container.addClass('dropup');
                element.find('.dropdown-toggle').addClass('dropdown-toggle-up');
            }

            // Enable labels translation:
            // FIXME: remove when https://github.com/dotansimha/angularjs-dropdown-multiselect/issues/54
            multiselectCtrl.translateLabels(dropdownMultiselect);
            scope.$root.$on('$translateChangeSuccess', () => {
                multiselectCtrl.translateLabels(dropdownMultiselect);
            });
        }

        // Toggle dirty state:
        let originalValue = angular.copy(scope.ngModel);
        scope.$watch('ngModel', (newValue, oldValue) => {
            if (!angular.equals(originalValue, newValue)) {
                ngModelCtrl.$setDirty();
                //Trigger parsers here
            }
        }, true);
    };
}

