import {ObLoginState} from '../service-navigation.model';

export interface ObIServiceNavigationResponse {
	statusCode: number;
	success: boolean;
}

export interface ObIServiceNavigationConfig {
	allServices: ObIPamsRequestUrl;
	inboxMail: ObIPamsRequestUrl;
	login: ObIPamsRequestUrl;
	logout: ObIPamsRequestUrl;
	polling: ObIPamsRequestUrl;
	pollingInterval: number;
	pollingNotificationsInterval: number;
	profile: ObIPamsRequestUrl;
	rights: ObIPamsRequestUrl;
	settings: ObIPamsRequestUrl;
}

interface ObIPamsRequestUrl {
	url: string;
	params: string;
	method: 'GET' | 'POST' | '';
}

export interface ObIServiceNavigationState {
	favoriteApps: ObIServiceNavigationRawApplication[];
	lastUsedApps: ObIServiceNavigationRawApplication[];
	loginState: ObLoginState;
	messageCount: number;
	profile: ObIProfileState;
}

export interface ObIServiceNavigationRawApplication {
	appID: number;
	childAppID: number;
	accessOK: boolean;
	online: boolean;
}

export interface ObIProfileState {
	avatarID: number;
	fullname: string;
}
