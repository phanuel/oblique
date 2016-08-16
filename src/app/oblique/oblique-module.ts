import {DateDirective} from './formatters/date-directive';
import {NumberFormatDirective} from './formatters/number-format-directive';
import {exceptionHandlerDecorator} from './infrastructure/exception-handler-decorator';
import {httpDecorator} from './infrastructure/http-decorator';
import {HttpInterceptor} from './infrastructure/http-interceptor';
import {logDecorator, LogDecorator} from './infrastructure/log-decorator';
import {NavigatorDirective} from './navigator/navigator-directive';
import {NavigatorService} from './navigator/navigator-service';
import {LoadingServiceProvider} from './status/loading-service-provider';
import {DatePickerDirective} from './ui/date-picker/date-picker-directive';
import {NotificationsDirective} from './ui/notifications/notifications-directive';
import {DelayedChangeDirective} from './ui/delayed-change-directive';
import {DropdownClosableDirective} from './ui/dropdown-closable-directive';
import {EnterDirective} from './ui/enter-directive';
import {GiveMeFocusDirective} from './ui/give-me-focus-directive';
import {MULTISELECT_CONFIG, MultiselectDirective} from './ui/multiselect-directive';
import {NavigableDirective} from './ui/navigable-directive';
import {UibTypeaheadDirective} from './ui/typeahead-directive';
import {HasErrorDirective} from './validation/has-error-directive';
import {
    SCHEMA_VALIDATE_CONFIG,
    ValidationSchemaDirective,
    ValidationBusinessDirective,
    SchemaValidateDirective
} from './validation/schema-validate-directive';
import {SchemaValidatorService} from './validation/schema-validator-service';
import {NotificationServiceProvider} from './ui/notifications/notification-service-provider';
import {DatePickerPopupDirective} from './ui/date-picker/date-picker-popup-directive';
import {UibTypeaheadPopupDirective} from './ui/typeahead-popup-directive';

export const oblique = '__MODULE__.oblique';

angular.module('__MODULE__.oblique', [])
    .directive('date', () => new DateDirective())
    .directive('numberFormat', ($filter:ng.IFilterService, $parse:ng.IParseService) => new NumberFormatDirective($filter, $parse))
    .decorator('$exceptionHandler', exceptionHandlerDecorator)
    .decorator('$http', httpDecorator)
    .service('HttpInterceptor', HttpInterceptor)
    .decorator('$log', logDecorator)
    .directive('navigator', ($navigator:NavigatorService, $document:ng.IDocumentService) => new NavigatorDirective($navigator, $document))
    .service('$navigator', NavigatorService)
    .provider('LoadingService', () => new LoadingServiceProvider())
    .directive('datePicker', () => new DatePickerDirective())
    //TODO: naming?
    .directive('datepickerPopup', (dateFilter, $dateParser, uibDatepickerPopupConfig) => new DatePickerPopupDirective(
        dateFilter,
        $dateParser,
        uibDatepickerPopupConfig
    ))
    .provider('notificationService', () => new NotificationServiceProvider())
    .directive('notifications', () => new NotificationsDirective())
    .directive('delayedChange', () => new DelayedChangeDirective())
    .directive('dropdownClosable', ($timeout:ng.ITimeoutService) => new DropdownClosableDirective($timeout))
    .directive('enter', () => new EnterDirective())
    .directive('giveMeFocus', () => new GiveMeFocusDirective())
    .constant('multiselectConfig', MULTISELECT_CONFIG)
    .directive('multiselect', ($filter:ng.IFilterService) => new MultiselectDirective($filter))
    .directive('navigable', ($parse:ng.IParseService,$timeout:ng.ITimeoutService) => new NavigableDirective($parse,$timeout))
    .directive('uibTypeahead', () => new UibTypeaheadDirective())
    .directive('uibTypeaheadPopup', () => new UibTypeaheadPopupDirective())
    .directive('hasError', () => new HasErrorDirective())
    .constant('schemaValidateConfig', SCHEMA_VALIDATE_CONFIG)
    .directive('validationSchema', ()=> new ValidationSchemaDirective())
    .directive('validationBusiness', ($log:LogDecorator) => new ValidationBusinessDirective($log))
    .directive('schemaValidate', ($log:LogDecorator,
                                  $timeout:ng.ITimeoutService,
                                  schemaValidator:SchemaValidatorService,
                                  schemaValidateConfig) => new SchemaValidateDirective($log,$timeout,schemaValidator,schemaValidateConfig))
    .service('schemaValidator', SchemaValidatorService);

