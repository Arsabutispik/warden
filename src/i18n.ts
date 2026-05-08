import i18next from 'i18next';

export const initI18n = async () => {
    const en = await import('../locales/en/translation.json', { with: { type: 'json' } });
    const tr = await import('../locales/tr/translation.json', { with: { type: 'json' } });

    await i18next.init({
        fallbackLng: 'en',
        resources: {
            en: { translation: en.default },
            tr: { translation: tr.default },
        },
        keySeparator: false,
        nsSeparator: false,
    });
};

export const t = (string: string, args?: Record<string, any> & { lng?: string }) =>
    i18next.t(string, args) as any as string;