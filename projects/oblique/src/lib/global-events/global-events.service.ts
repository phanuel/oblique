import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {fromEvent, Observable} from 'rxjs';
import {WINDOW} from '../utilities';

@Injectable({
	providedIn: 'root'
})
export class ObGlobalEventsService {
	public readonly click$: Observable<MouseEvent>;
	public readonly mouseDown$: Observable<MouseEvent>;
	public readonly mouseMove$: Observable<MouseEvent>;
	public readonly keyDown$: Observable<KeyboardEvent>;
	public readonly keyUp$: Observable<KeyboardEvent>;
	public readonly scroll$: Observable<Event>;
	public readonly resize$: Observable<UIEvent>;

	constructor(@Inject(DOCUMENT) document: Document, @Inject(WINDOW) window: Window) {
		this.click$ = fromEvent<MouseEvent>(document, 'click');
		this.mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown');
		this.mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
		this.keyDown$ = fromEvent<KeyboardEvent>(document, 'keydown');
		this.keyUp$ = fromEvent<KeyboardEvent>(document, 'keyup');
		this.scroll$ = fromEvent<Event>(window, 'scroll');
		this.resize$ = fromEvent<UIEvent>(window, 'resize');
	}
}
