import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {ObMasterLayoutConfig} from '../master-layout.config';
import {ObIMasterLayoutEvent, ObEMasterLayoutEventValues} from '../master-layout.model';

@Injectable({
	providedIn: 'root'
})
export class ObMasterLayoutFooterService {
	private readonly _events = new Subject<ObIMasterLayoutEvent>();
	private readonly eventsS = this._events.asObservable();
	private _isCustom = this.config.footer.isCustom;
	private _hasScrollTransition = this.config.footer.hasScrollTransitions;

	constructor(private readonly config: ObMasterLayoutConfig) {}

	get configEvents(): Observable<ObIMasterLayoutEvent> {
		return this.eventsS;
	}

	get isCustom() {
		return this._isCustom;
	}

	set isCustom(value: boolean) {
		this._isCustom = value;
		this._events.next({
			name: ObEMasterLayoutEventValues.FOOTER_IS_CUSTOM,
			value: value
		});
	}

	get hasScrollTransition(): boolean {
		return this._hasScrollTransition;
	}

	set hasScrollTransition(value: boolean) {
		this._hasScrollTransition = value;
		this._events.next({
			name: ObEMasterLayoutEventValues.SCROLL_TRANSITION,
			value: value
		});
	}
}
