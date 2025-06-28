'use client';

import React from 'react';

export function ResponsiveTableWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full overflow-x-auto">
            {children}
        </div>
    );
}
