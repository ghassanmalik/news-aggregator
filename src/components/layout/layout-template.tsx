export interface Preferences {
    category: string;
    source: string;
    author: string;
}

export interface LayoutContext {
    isCustomizing: boolean;
    sources: { id: string; name: string }[];
    preferences: { category: string; source: string; author: string };
    tempPreferences: { category: string; source: string; author: string };
    setIsCustomizing: React.Dispatch<React.SetStateAction<boolean>>;
    handlePreferenceChange: (key: keyof Preferences, value: string) => void;
    handlePreferenceSave: () => void;
    handlePreferenceReset: () => void;
}
