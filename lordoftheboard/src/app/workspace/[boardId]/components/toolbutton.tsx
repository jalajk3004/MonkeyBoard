"use client";

import { LucideIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";


interface ToolButtonProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
}

export const ToolButton = ({
    icon: Icon,
    onClick,
    isActive,
    isDisabled,
}: ToolButtonProps) => {
    return (
        <Button
            disabled={isDisabled}
            onClick={onClick}
            size="icon"
            variant={isActive ? 'boardActive' : 'board'}
            className={`flex items-center justify-center w-10 h-10 rounded-md ${isActive ? 'bg-gray-200' : 'bg-white'}`}
            >

            <Icon />
        </Button>

    );

}
