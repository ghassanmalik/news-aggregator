import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PreferenceDialogProps {
    isOpen: boolean;
    onClose: () => void;
    tempPreferences: { category: string; source: string; author: string };
    onPreferenceChange: (key: string, value: string) => void;
    onSave: () => void;
    onReset: () => void;
    sources: { id: string; name: string }[];
}

export const PreferenceDialog: React.FC<PreferenceDialogProps> = ({
    isOpen,
    onClose,
    tempPreferences,
    onPreferenceChange,
    onSave,
    onReset,
    sources,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="!bg-[#f7f7f7] dark:bg-background-dark text-black dark:text-white max-w-xl sm:max-w-[90%] md:max-w-3xl lg:max-w-4xl w-[90%] md:w-auto h-auto md:h-[420px]">
                <DialogHeader>
                    <DialogTitle className={"text-[#1A1A1A] text-xl "}>Customize Your News Feed</DialogTitle>
                    <p className="text-sm text-gray-500">
                        Select your preferred news sources, categories, and authors to tailor your news feed to your interests.
                    </p>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <Select
                        value={tempPreferences.category}
                        onValueChange={(value) => onPreferenceChange("category", value)}
                        disabled={!!tempPreferences.source}
                    >
                        <SelectTrigger className={"border-gray-300 text-gray-500 hover:border-gray-300 focus:border-gray-500 focus:ring-1 focus:gray-500;"}>
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {["business", "technology", "sports", "health", "science", "entertainment"].map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={tempPreferences.source}
                        onValueChange={(value) => onPreferenceChange("source", value)}
                        disabled={!!tempPreferences.category}
                    >
                        <SelectTrigger className={"border-gray-300 text-gray-500 hover:border-gray-300 focus:border-gray-500 focus:ring-1 hover:border-red-500;"}>
                            <SelectValue placeholder="Select Source" />
                        </SelectTrigger>
                        <SelectContent>
                            {sources?.length ? (
                                sources.map((source) => (
                                    <SelectItem key={source.id} value={source.id}>
                                        {source.name}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem value={null} disabled>No sources available</SelectItem>
                            )}
                        </SelectContent>
                    </Select>

                    <Input
                        type="text"
                        placeholder="Author"
                        value={tempPreferences.author}
                        onChange={(e) => onPreferenceChange("author", e.target.value)}
                    />

                    <div className="flex flex-col gap-4 justify-center items-center w-full">
                        <Button onClick={onSave} className="bg-[#2c2c2c] text-white hover:bg-black mt-5 w-[90%] cursor-pointer">
                            Save Preferences
                        </Button>
                        <Button onClick={onReset} className="border border-[#df5b5b] text-[#df5b5b] hover:border-[#ff5b5b] hover:text-[#ff5b5b] w-[90%] cursor-pointer">
                            Reset Preferences
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};