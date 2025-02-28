import * as React from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar/Navbar';
import { useNewsSources } from '@/hooks/useNewsSources';
import {Preferences} from "@/components/layout/layout-template";

const Layout: React.FC = () => {
    const PERSIST_KEY = 'newsPreferences';

    const { data: sources } = useNewsSources();
    const [preferences, setPreferences] = useState<Preferences>(() => {
        const savedPreferences = localStorage.getItem(PERSIST_KEY);
        return savedPreferences ? JSON.parse(savedPreferences) : { category: '', source: '', author: '' };
    });
    const [isCustomizing, setIsCustomizing] = useState<boolean>(false);

    // Temporary preferences during customization
    const [tempPreferences, setTempPreferences] = useState<Preferences>(preferences);

    const handlePreferenceChange = (key: keyof Preferences, value: string) => {
        setTempPreferences((prev) => ({ ...prev, [key]: value }));
    };

    // Saving preferences to state and localStorage
    const handlePreferenceSave = () => {
        setPreferences(tempPreferences);
        localStorage.setItem(PERSIST_KEY, JSON.stringify(tempPreferences));
        setIsCustomizing(false);
    };

    // Resetting preferences to default
    const handlePreferenceReset = () => {
        const defaultPreferences: Preferences = { category: '', source: '', author: '' };
        setPreferences(defaultPreferences);
        setTempPreferences(defaultPreferences);
        localStorage.removeItem(PERSIST_KEY);
    };

    return (
        <>
            <Navbar
                isCustomizing={isCustomizing}
                setIsCustomizing={setIsCustomizing}
                tempPreferences={tempPreferences}
                handlePreferenceChange={handlePreferenceChange}
                handlePreferenceSave={handlePreferenceSave}
                handlePreferenceReset={handlePreferenceReset}
                sources={sources || []}
            />

            <main className="p-4">
                <Outlet
                    context={{
                        isCustomizing,
                        sources: sources || [],
                        preferences,
                        tempPreferences,
                        setIsCustomizing,
                        handlePreferenceChange,
                        handlePreferenceSave,
                        handlePreferenceReset,
                    }}
                />
            </main>
        </>
    );
};

export default Layout;