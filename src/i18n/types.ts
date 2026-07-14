export type Locale = "zh" | "en";

export const LOCALES: Locale[] = ["zh", "en"];
export const DEFAULT_LOCALE: Locale = "zh";
export const LOCALE_COOKIE = "pickstay-locale";

export type PersonaPresetId =
  | "firstTime"
  | "backpacker"
  | "family"
  | "chill"
  | "nightOwl";

export type DimensionKey =
  | "budget"
  | "safety"
  | "transit"
  | "shopping"
  | "nightlife"
  | "quiet"
  | "cafe";

export type Messages = {
  meta: {
    title: string;
    description: string;
    titleSuffix: string;
  };
  nav: {
    compare: string;
    dashboard: string;
    admin: string;
    login: string;
    logout: string;
  };
  header: {
    tagline: string;
  };
  home: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    cta: string;
    features: {
      engine: { title: string; desc: string };
      maps: { title: string; desc: string };
      compare: { title: string; desc: string };
      sync: { title: string; desc: string };
    };
    citiesTitle: string;
    citiesCount: string;
    neighborhoods: string;
  };
  explore: {
    selectCity: string;
    personaTitle: string;
    weightsTitle: string;
    refreshMaps: string;
    refreshing: string;
    analyzing: string;
    recommended: string;
    enriching: string;
    enrichDone: string;
    enrichMock: string;
    enrichFailed: string;
    polygonCaption: string;
    matchScore: string;
    advantages: string;
    added: string;
    addCompare: string;
    details: string;
    priceLevel: string;
    cityNotFound: string;
  };
  compare: {
    title: string;
    empty: string;
    goExplore: string;
    drawerTitle: string;
    expand: string;
    clear: string;
    dimension: string;
    matchDefault: string;
    price: string;
  };
  detail: {
    matchScore: string;
    pros: string;
    cons: string;
    bestFor: string;
    price: string;
    openInMap: string;
    mapAnalysis: string;
    cafes: string;
    transit: string;
    shopping: string;
    polygonLegend: string;
    polygonAria: string;
  };
  dashboard: {
    title: string;
    preferences: string;
    currentCity: string;
    notSet: string;
    preset: string;
    custom: string;
    continueExplore: string;
    noPreferences: string;
    favorites: string;
    noFavorites: string;
    savedComparisons: string;
    noComparisons: string;
    viewCompare: string;
  };
  auth: {
    loginTitle: string;
    registerTitle: string;
    email: string;
    password: string;
    nickname: string;
    login: string;
    loggingIn: string;
    register: string;
    registering: string;
    or: string;
    githubLogin: string;
    noAccount: string;
    hasAccount: string;
    authFailed: string;
    loading: string;
  };
  admin: {
    title: string;
    clearCache: string;
    saveCity: string;
    deleteCity: string;
    delete: string;
    name: string;
    description: string;
    mapProvider: string;
    neighborhood: string;
  };
  dimensions: Record<DimensionKey, { label: string; short: string }>;
  personas: Record<PersonaPresetId, string>;
  citySelector: {
    neighborhoods: string;
  };
};
