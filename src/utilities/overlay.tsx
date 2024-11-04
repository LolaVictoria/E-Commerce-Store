import React, { ReactNode } from "react";

interface OverlayProps {
    children: ReactNode;
}

export const Overlay: React.FC<OverlayProps> = ({ children }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            {children}
        </div>
    );
};
