import { I18nSupported } from '../enums/i18n-supported.enum';

export const VOLVOX_MERGED_TRANSLATION = (lang: string) => `volvox_${ lang }_merged_${ location.host }`;
export const VOLVOX_FALLBACK_TRANSLATION = `volvox_${ I18nSupported.enUS }_merged_${ location.host }`;
