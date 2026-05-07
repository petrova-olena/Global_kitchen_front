export const useTranslation = () => {
  return {
    t: (key) => key,
    i18n: {
      changeLanguage: () => Promise.resolve(),
    },
  };
};
