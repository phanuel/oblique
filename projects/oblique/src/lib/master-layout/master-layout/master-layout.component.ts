import {
	AfterViewInit,
	Component,
	ContentChild,
	ContentChildren,
	ElementRef,
	HostBinding,
	HostListener,
	Inject,
	Input,
	OnDestroy,
	OnInit,
	Optional,
	QueryList,
	TemplateRef,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import {NavigationEnd, Params, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {delay, filter, map, takeUntil, tap} from 'rxjs/operators';

import {ObMasterLayoutService} from '../master-layout.service';
import {ObMasterLayoutConfig} from '../master-layout.config';
import {ObScrollingEvents} from '../../scrolling/scrolling-events';
import {appVersion} from '../../version';
import {WINDOW} from '../../utilities';
import {ObEMasterLayoutEventValues, ObIDynamicJumpLink, ObINavigationLink} from '../master-layout.model';
import {ObOffCanvasService} from '../../off-canvas/off-canvas.service';
import {merge, Subject} from 'rxjs';
import {ObGlobalEventsService} from '../../global-events/global-events.service';
import {ObUseObliqueIcons} from '../../icon/icon.model';

@Component({
	selector: 'ob-master-layout',
	exportAs: 'obMasterLayout',
	templateUrl: './master-layout.component.html',
	styleUrls: [
		'./master-layout.component.scss',
		'./master-layout.component-cover.scss',
		'./master-layout.component-offcanvas.scss',
		'./master-layout.component-accessibility.scss'
	],
	encapsulation: ViewEncapsulation.None,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {class: 'ob-master-layout', 'ob-version': appVersion}
})
export class ObMasterLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
	home = this.config.homePageRoute;
	route = {path: '', params: undefined};
	@Input() navigation: ObINavigationLink[] = [];
	@Input() jumpLinks: ObIDynamicJumpLink[] = [];
	@HostBinding('class.ob-has-cover') hasCover = this.masterLayout.layout.hasCover;
	@HostBinding('class.ob-has-layout') hasLayout = this.masterLayout.layout.hasLayout;
	@HostBinding('class.ob-has-max-width') hasMaxWidth = this.masterLayout.layout.hasMaxWidth;
	@HostBinding('class.ob-header-expanded') isMenuOpened = this.masterLayout.layout.isMenuOpened;
	@HostBinding('class.ob-no-navigation') noNavigation = !this.masterLayout.layout.hasMainNavigation;
	@HostBinding('class.ob-off-canvas') hasOffCanvas = this.masterLayout.layout.hasOffCanvas;
	@HostBinding('class.ob-master-layout-scrolling') isScrolling = false;
	@HostBinding('class.ob-outline') outline = false;
	isHeaderSticky = this.masterLayout.header.isSticky;
	isFooterSticky = this.masterLayout.footer.isSticky;
	scrollTarget: HTMLElement | Window;
	@ContentChild('obHeaderLogo') readonly obLogo: TemplateRef<any>;
	@ContentChildren('obHeaderControl') readonly headerControlTemplates: QueryList<TemplateRef<any>>;
	@ContentChildren('obHeaderMobileControl') readonly headerMobileControlTemplates: QueryList<TemplateRef<any>>;
	@ContentChildren('obFooterLink') readonly footerLinkTemplates: QueryList<TemplateRef<any>>;
	@ViewChild('offCanvasClose', {read: ElementRef}) readonly offCanvasClose: ElementRef<HTMLElement>;
	@ViewChild('main') readonly main: ElementRef<HTMLElement>;
	@ViewChild('wrapper') readonly wrapper: ElementRef<HTMLElement>;
	private readonly unsubscribe = new Subject();

	constructor(
		private readonly masterLayout: ObMasterLayoutService,
		private readonly config: ObMasterLayoutConfig,
		private readonly offCanvasService: ObOffCanvasService,
		private readonly router: Router,
		private readonly scrollEvents: ObScrollingEvents,
		private readonly globalEventsService: ObGlobalEventsService,
		@Optional() @Inject(ObUseObliqueIcons) public readonly useObliqueIcons: boolean,
		@Inject(DOCUMENT) private readonly document: any,
		@Inject(WINDOW) private readonly window: Window
	) {
		this.propertyChanges();
		this.focusFragment();
		this.focusOffCanvasClose();
	}

	@HostListener('mousedown')
	mousedown() {
		this.outline = false;
	}

	@HostListener('keydown')
	mouseup() {
		this.outline = true;
	}

	scrollTop(element?: HTMLElement): void {
		const scrollTop = element?.scrollTop ?? (this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0);
		this.scrollEvents.hasScrolled(scrollTop);
		if (this.isScrolling !== scrollTop > 0) {
			this.isScrolling = scrollTop > 0;
			this.scrollEvents.scrolling(this.isScrolling);
		}
	}

	ngOnInit(): void {
		this.globalEventsService.scroll$.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.scrollTop());
		this.masterLayout.layout.configEvents$
			.pipe(filter(evt => evt.name === ObEMasterLayoutEventValues.LAYOUT_HAS_MAIN_NAVIGATION))
			.subscribe(evt => this.updateJumpLinks(evt.value));
		this.updateJumpLinks(!this.noNavigation);
	}

	ngAfterViewInit() {
		// to avoid a ExpressionHasBeenChangedAfterItHasBeenCheckedError
		setTimeout(() => (this.scrollTarget = this.getScrollTarget()));
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	private getScrollTarget(): HTMLElement | Window {
		if (this.isHeaderSticky && this.isFooterSticky) {
			return this.main.nativeElement;
		}
		if (this.isHeaderSticky !== this.isFooterSticky) {
			return this.wrapper.nativeElement;
		}
		if (!this.isHeaderSticky && !this.isFooterSticky) {
			return this.window;
		}
	}

	private updateJumpLinks(hasNavigation: boolean): void {
		const staticJumpLinks = hasNavigation && this.navigation.length ? 3 : 2;
		this.jumpLinks = this.jumpLinks.map((jumpLink, i) => ({...jumpLink, accessKey: i + staticJumpLinks}));
	}

	private propertyChanges() {
		merge(this.masterLayout.layout.configEvents$, this.masterLayout.header.configEvents$, this.masterLayout.footer.configEvents$)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(event => {
				switch (event.name) {
					case ObEMasterLayoutEventValues.LAYOUT_HAS_MAIN_NAVIGATION:
						this.noNavigation = !event.value;
						break;
					case ObEMasterLayoutEventValues.LAYOUT_HAS_COVER:
						this.hasCover = event.value;
						break;
					case ObEMasterLayoutEventValues.LAYOUT_HAS_OFF_CANVAS:
						this.hasOffCanvas = event.value;
						break;
					case ObEMasterLayoutEventValues.IS_MENU_OPENED:
						this.isMenuOpened = event.value;
						break;
					case ObEMasterLayoutEventValues.LAYOUT_HAS_DEFAULT_LAYOUT:
						this.hasLayout = event.value;
						break;
					case ObEMasterLayoutEventValues.LAYOUT_HAS_MAX_WIDTH:
						this.hasMaxWidth = event.value;
						break;
					case ObEMasterLayoutEventValues.HEADER_IS_STICKY:
						this.isHeaderSticky = event.value;
						this.scrollTarget = this.getScrollTarget();
						break;
					case ObEMasterLayoutEventValues.FOOTER_IS_STICKY:
						this.isFooterSticky = event.value;
						this.scrollTarget = this.getScrollTarget();
						break;
				}
			});
	}

	private focusFragment() {
		this.router.events
			.pipe(
				filter(evt => evt instanceof NavigationEnd),
				map((evt: NavigationEnd) => evt.url),
				tap(url => (this.route.path = (url.match(/^[^?&#]*/) || [])[0])),
				tap(url => (this.route.params = this.formatQueryParameters(this.extractUrlPart(url, /[?&][^#]*/)))),
				map(url => this.extractUrlPart(url, /#[^?&]*/)),
				filter(fragment => this.config.focusableFragments.indexOf(fragment) > -1)
			)
			.subscribe(fragment => this.document.querySelector(`#${fragment}`)?.focus());
	}

	private extractUrlPart(url: string, regex: RegExp): string {
		// substr remove the leading #, ? or & character
		return (url.match(regex) || [])[0]?.substr(1);
	}

	private formatQueryParameters(parameters: string): Params {
		return parameters
			?.split('&')
			.map(parameters => parameters.split('='))
			.reduce((params, parameter) => ({...params, [parameter[0]]: parameter[1]}), {});
	}

	private focusOffCanvasClose() {
		this.offCanvasService.opened
			.pipe(
				takeUntil(this.unsubscribe),
				filter(() => this.hasOffCanvas),
				filter(value => value),
				delay(600) // duration of the open animation
			)
			.subscribe(() => this.offCanvasClose.nativeElement.focus());
	}
}
