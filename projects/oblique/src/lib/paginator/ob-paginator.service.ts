import {Injectable} from '@angular/core';
import {MatLegacyPaginatorIntl as MatPaginatorIntl} from '@angular/material/legacy-paginator';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ObPaginatorService extends MatPaginatorIntl {
	private ofLabel = 'of';

	constructor(private readonly translateService: TranslateService) {
		super();
		this.initTranslation();
	}

	getRangeLabel = (page: number, pageSize: number, length: number): string => {
		if (length === 0 || pageSize === 0) {
			return `0 ${this.ofLabel} ${length}`;
		}
		const startIndex = page * pageSize;
		const endIndex = Math.min(startIndex + pageSize, length);
		return `${startIndex + 1} - ${endIndex} ${this.ofLabel} ${length}`;
	};

	private initTranslation(): void {
		this.translateService
			.stream([
				'i18n.pagination.items-per-page',
				'i18n.pagination.next-page',
				'i18n.pagination.previous-page',
				'i18n.pagination.of-label',
				'i18n.pagination.first-page',
				'i18n.pagination.last-page'
			])
			.subscribe(translation => {
				this.itemsPerPageLabel = translation['i18n.pagination.items-per-page'];
				this.previousPageLabel = translation['i18n.pagination.previous-page'];
				this.nextPageLabel = translation['i18n.pagination.next-page'];
				this.firstPageLabel = translation['i18n.pagination.first-page'];
				this.lastPageLabel = translation['i18n.pagination.last-page'];
				this.ofLabel = translation['i18n.pagination.of-label'];
				this.changes.next();
			});
	}
}
