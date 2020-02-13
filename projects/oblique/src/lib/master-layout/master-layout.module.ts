import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {TranslateModule} from '@ngx-translate/core';

import {NotificationModule} from '../notification/notification.module';
import {SpinnerModule} from '../spinner/spinner.module';
import {ScrollingModule} from '../scrolling/scrolling.module';
import {OffCanvasModule} from '../off-canvas/off-canvas.module';
import {ThemeService} from '../theme/theme.service';
import {TelemetryService} from '../telemetry/telemetry.service';
import {requireAndRecordTelemetry} from '../telemetry/telemetry-require';
import {MasterLayoutComponent} from './master-layout/master-layout.component';
import {MasterLayoutService} from './master-layout.service';
import {MasterLayoutHeaderComponent} from './master-layout-header/master-layout-header.component';
import {MasterLayoutHeaderToggleDirective} from './master-layout-header/master-layout-header-toggle.directive';
import {MasterLayoutFooterComponent} from './master-layout-footer/master-layout-footer.component';
import {MasterLayoutNavigationService} from './master-layout-navigation/master-layout-navigation.service';
import {MasterLayoutNavigationComponent} from './master-layout-navigation/master-layout-navigation.component';
import {MasterLayoutNavigationItemDirective} from './master-layout-navigation/master-layout-navigation-item.directive';
import {MasterLayoutNavigationToggleDirective} from './master-layout-navigation/master-layout-navigation-toggle.directive';
import {MasterLayoutNavigationMenuDirective} from './master-layout-navigation/master-layout-navigation-menu.directive';
import {MasterLayoutConfig, ScrollMode} from './master-layout.config';
import {WINDOW, windowProvider} from '../utilities';

export {MasterLayoutComponent} from './master-layout/master-layout.component';
export {MasterLayoutService} from './master-layout.service';
export {MasterLayoutHeaderToggleDirective} from './master-layout-header/master-layout-header-toggle.directive';
export {MasterLayoutNavigationService} from './master-layout-navigation/master-layout-navigation.service';
export {MasterLayoutNavigationItemDirective} from './master-layout-navigation/master-layout-navigation-item.directive';
export {MasterLayoutNavigationToggleDirective} from './master-layout-navigation/master-layout-navigation-toggle.directive';
export {MasterLayoutNavigationMenuDirective} from './master-layout-navigation/master-layout-navigation-menu.directive';
export {ORNavigationLink} from './master-layout-navigation/master-layout-navigation.component';
export {MasterLayoutConfig, ScrollMode} from './master-layout.config';

@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		RouterModule,
		NotificationModule,
		SpinnerModule,
		ScrollingModule,
		OffCanvasModule
	],
	declarations: [
		MasterLayoutComponent,
		MasterLayoutHeaderComponent,
		MasterLayoutHeaderToggleDirective,
		MasterLayoutNavigationComponent,
		MasterLayoutFooterComponent,
		MasterLayoutNavigationItemDirective,
		MasterLayoutNavigationToggleDirective,
		MasterLayoutNavigationMenuDirective
	],
	providers: [
		{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
		{provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }},
		{provide: WINDOW, useFactory: windowProvider}
	],
	exports: [
		MasterLayoutComponent,
		MasterLayoutHeaderToggleDirective,
		MasterLayoutNavigationItemDirective,
		MasterLayoutNavigationToggleDirective,
		MasterLayoutNavigationMenuDirective
	]
})
export class MasterLayoutModule {
	constructor(theme: ThemeService, telemetry: TelemetryService) {
		theme.setDefaultFont();
		requireAndRecordTelemetry(telemetry, MasterLayoutModule);
	}
}
