import {InjectionToken} from '@angular/core';
import {ObIconService} from './icon.service';

export function iconFactory(iconService: ObIconService): () => void {
	return () => iconService.registerOnAppInit();
}

export const ObTIconConfig = new InjectionToken<ObIconConfig>('Oblique icon configuration');

export interface ObIconConfig {
	registerObliqueIcons?: boolean;
	additionalIcons?: string[];
	fontClass?: string;
}

export const defaultIconConfig: ObIconConfig = {
	registerObliqueIcons: true
};

export enum ObEIcon {
	ADDRESS_BOOK = 'address-book',
	ALD = 'ald',
	ANCHOR = 'anchor',
	APPS = 'apps',
	ARCHIVE = 'archive',
	ARROW_DOWN = 'arrow-down',
	ARROW_LEFT = 'arrow-left',
	ARROW_RIGHT = 'arrow-right',
	ARROW_UP = 'arrow-up',
	ART = 'art',
	ATTACHMENT = 'attachment',
	AUDIO = 'audio',
	AUDIO_DESCRIPTION = 'audio-description',
	AUDIO_LOW = 'audio-low',
	AUDIO_MUTE = 'audio-mute',
	BALANCE = 'balance',
	BALANCE_SLASH = 'balance-slash',
	BAN = 'ban',
	BARCODE = 'barcode',
	BED = 'bed',
	BELL = 'bell',
	BELL_SLASH = 'bell-slash',
	BLIND = 'blind',
	BOLT = 'bolt',
	BOOK = 'book',
	BOOKMARK = 'bookmark',
	BRAILLE = 'braille',
	BRIEFCASE = 'briefcase',
	BRUSH = 'brush',
	BUG = 'bug',
	BUILDING = 'building',
	BULLHORN = 'bullhorn',
	BULLSEYE = 'bullseye',
	BUNDESHAUS = 'bundeshaus',
	CALCULATOR = 'calculator',
	CALENDAR = 'calendar',
	CAMERA = 'camera',
	CANCEL = 'cancel',
	CANCEL_CIRCLE = 'cancel-circle',
	CAR = 'car',
	CARDS = 'cards',
	CERTIFICATE = 'certificate',
	CHART = 'chart',
	CHART_BAR = 'chart-bar',
	CHART_DECREASE = 'chart-decrease',
	CHART_INCREASE = 'chart-increase',
	CHART_LINE = 'chart-line',
	CHART_PIE = 'chart-pie',
	CHART_SEARCH = 'chart-search',
	CHECKMARK = 'checkmark',
	CHECKMARK_CIRCLE = 'checkmark-circle',
	CHEVRON_DOUBLE_LEFT = 'chevron-double-left',
	CHEVRON_DOUBLE_RIGHT = 'chevron-double-right',
	CHEVRON_DOWN = 'chevron-down',
	CHEVRON_LEFT = 'chevron-left',
	CHEVRON_LINE_LEFT = 'chevron-line-left',
	CHEVRON_LINE_RIGHT = 'chevron-line-right',
	CHEVRON_RIGHT = 'chevron-right',
	CHEVRON_SMALL_DOWN = 'chevron-small-down',
	CHEVRON_SMALL_LEFT = 'chevron-small-left',
	CHEVRON_SMALL_RIGHT = 'chevron-small-right',
	CHEVRON_SMALL_UP = 'chevron-small-up',
	CHEVRON_UP = 'chevron-up',
	CLIPBOARD = 'clipboard',
	CLOCK = 'clock',
	CLOUD = 'cloud',
	CLOUD_UPLOAD = 'cloud-upload',
	COFFEE = 'coffee',
	COG = 'cog',
	COINS = 'coins',
	COMPARE = 'compare',
	COMPASS = 'compass',
	COMPRESS = 'compress',
	CREDIT_CARD = 'credit-card',
	CROP = 'crop',
	DATABASE = 'database',
	DEAF = 'deaf',
	DECREASE = 'decrease',
	DESKTOP = 'desktop',
	DOG = 'dog',
	DOWNLOAD = 'download',
	DRAG_INDICATOR = 'drag-indicator',
	DUPLICATE = 'duplicate',
	ENVELOPE = 'envelope',
	ERASER = 'eraser',
	EXCHANGE = 'exchange',
	EXPAND = 'expand',
	EXTERNAL = 'external',
	EYE = 'eye',
	EYEDROPPER = 'eyedropper',
	EYE_SLASH = 'eye-slash',
	FAMILY = 'family',
	FAX = 'fax',
	FILE = 'file',
	FILE_AUDIO = 'file-audio',
	FILE_BULLET = 'file-bullet',
	FILE_CHECKMARK = 'file-checkmark',
	FILE_CODE = 'file-code',
	FILE_CSV = 'file-csv',
	FILE_EPUB = 'file-epub',
	FILE_EXCEL = 'file-excel',
	FILE_FORWARD = 'file-forward',
	FILE_IMAGE = 'file-image',
	FILE_JSON = 'file-json',
	FILE_LINES = 'file-lines',
	FILE_PDF = 'file-pdf',
	FILE_PLUS = 'file-plus',
	FILE_PPT = 'file-ppt',
	FILE_REFRESH = 'file-refresh',
	FILE_SERVER = 'file-server',
	FILE_USER = 'file-user',
	FILE_VIDEO = 'file-video',
	FILE_WORD = 'file-word',
	FILE_XML = 'file-xml',
	FILE_ZIP = 'file-zip',
	FILTER = 'filter',
	FILTER_ASCENDING = 'filter-ascending',
	FILTER_DESCENDING = 'filter-descending',
	FITNESS = 'fitness',
	FLAG = 'flag',
	FLAG_FILLED = 'flag-filled',
	FLASK = 'flask',
	FOLDER = 'folder',
	FOLDER_OPEN = 'folder-open',
	FORWARD = 'forward',
	FROWN = 'frown',
	GENDER_IDENTITY_AGENDER = 'gender-identity-agender',
	GENDER_IDENTITY_BIGENDER = 'gender-identity-bigender',
	GENDER_IDENTITY_FEMALE = 'gender-identity-female',
	GENDER_IDENTITY_GENDER_EXPANSIVE = 'gender-identity-gender-expansive',
	GENDER_IDENTITY_MALE = 'gender-identity-male',
	GENDER_IDENTITY_NEUTROIS = 'gender-identity-neutrois',
	GENDER_IDENTITY_NON_BINARY = 'gender-identity-non-binary',
	GIT_HUB = 'git-hub',
	GLOBE = 'globe',
	HEADPHONES = 'headphones',
	HEART = 'heart',
	HEART_FILLED = 'heart-filled',
	HELP = 'help',
	HELP_CIRCLE = 'help-circle',
	HISTORY = 'history',
	HOME = 'home',
	HORSE = 'horse',
	ID_CARD = 'id-card',
	IMAGE = 'image',
	INBOX = 'inbox',
	INCREASE = 'increase',
	INDUSTRY = 'industry',
	INFO = 'info',
	INFO_CIRCLE = 'info-circle',
	KEY = 'key',
	KEYBOARD = 'keyboard',
	LANGUAGE = 'language',
	LIFERING = 'lifering',
	LINK = 'link',
	LIST = 'list',
	LIST_PARAGRAPH = 'list-paragraph',
	LOCK = 'lock',
	LOGIN = 'login',
	LOGOUT = 'logout',
	LOW_VISION = 'low-vision',
	MAGNET = 'magnet',
	MAIL_ATTACHMENT = 'mail-attachment',
	MAP = 'map',
	MAP_MARKER = 'map-marker',
	MENU = 'menu',
	MICROPHONE = 'microphone',
	MICROPHONE_SLASH = 'microphone-slash',
	MINUS = 'minus',
	MOBILE = 'mobile',
	MORE = 'more',
	PAPER_PLANE = 'paper-plane',
	PEN = 'pen',
	PHONE = 'phone',
	PIN = 'pin',
	PLUS = 'plus',
	PRINTER = 'printer',
	QRCODE = 'qrcode',
	RANDOM = 'random',
	REFRESH = 'refresh',
	REPEAT = 'repeat',
	REPLY = 'reply',
	RSS = 'rss',
	SAVE = 'save',
	SCROLL = 'scroll',
	SEARCH = 'search',
	SERVER = 'server',
	SHARE = 'share',
	SHOPPING_CART = 'shopping-cart',
	SIGN_LANGUAGE = 'sign-language',
	SMILE = 'smile',
	SPEECH_BUBBLE = 'speech-bubble',
	STACK = 'stack',
	STAR = 'star',
	STAR_FILLED = 'star-filled',
	STOP = 'stop',
	TABLET = 'tablet',
	TACHOMETER = 'tachometer',
	TAG = 'tag',
	THUMBS_DOWN = 'thumbs-down',
	THUMBS_UP = 'thumbs-up',
	TICKET = 'ticket',
	TRASH = 'trash',
	TRUCK = 'truck',
	UNIVERSAL_ACCESS = 'universal-access',
	UNIVERSITY = 'university',
	UNLINK = 'unlink',
	UNLOCK = 'unlock',
	UPLOAD = 'upload',
	USER = 'user',
	USER_BRUSH = 'user-brush',
	USER_CHECKMARK = 'user-checkmark',
	USER_CODE = 'user-code',
	USER_COG = 'user-cog',
	USER_PEN = 'user-pen',
	USERS = 'users',
	VIDEO = 'video',
	WAND = 'wand',
	WARNING = 'warning',
	WARNING_CIRCLE = 'warning-circle',
	WARNING_TRIANGLE = 'warning-triangle',
	WEIGHT = 'weight',
	WHEELCHAIR = 'wheelchair',
	WI_FI = 'wi-fi',
	WRENCH = 'wrench'
}
