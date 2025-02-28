import * as React from "react";
import {Button} from "@/components/ui/button";
import {TuneIcon} from "@/components/ui/icons/icons";
import { PreferenceDialog } from "@/components/ui/news/PreferenceDialog";


export const Navbar = ({
       isCustomizing,
       setIsCustomizing,
       tempPreferences,
       handlePreferenceChange,
       handlePreferenceSave,
       handlePreferenceReset,
       sources
})=>{
    return (
        <div className="flex justify-between items-center bg-[#2c2c2c] text-white p-3 sticky top-0">
            <h1 className="text-xl text-[#f7f7f7] font-bold">Innoscripta News</h1>
            <Button onClick={() => setIsCustomizing(true)} className={"cursor-pointer"} >
                <div className="flex justify-center items-center gap-2">
                    <TuneIcon/>
                    <p className="hidden sm:block">Customize</p>
                </div>
            </Button>

            <PreferenceDialog
                isOpen={isCustomizing}
                onClose={() => setIsCustomizing(false)}
                tempPreferences={tempPreferences}
                onPreferenceChange={handlePreferenceChange}
                onSave={handlePreferenceSave}
                onReset={handlePreferenceReset}
                sources={sources}
            />
        </div>
    )
}