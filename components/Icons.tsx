import React from 'react';

type IconProps = {
    className?: string;
};

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);


export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.435A9.75 9.75 0 019.75 22.5a.75.75 0 01-.75-.75c0-5.056 2.383-9.555 6.084-12.435A9.75 9.75 0 019.315 7.584z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M11.022 1.566a.75.75 0 01.866 0l.236.129a.75.75 0 01.5.654l.055.291a.75.75 0 01-.336.723l-.226.15a.75.75 0 01-.788-.076l-.212-.164a.75.75 0 01-.258-.621l.02-.273a.75.75 0 01.5-.655l.235-.128z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12.978 14.334a.75.75 0 01.866 0l.236.129a.75.75 0 01.5.654l.055.291a.75.75 0 01-.336.723l-.226.15a.75.75 0 01-.788-.076l-.212-.164a.75.75 0 01-.258-.621l.02-.273a.75.75 0 01.5-.655l.235-.128z" clipRule="evenodd" />
    </svg>
);


export const ClockIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const FlameIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.66 17.66C16.25 19.07 14.25 20 12 20s-4.25-.93-5.66-2.34C4.93 16.25 4 14.25 4 12c0-1.86.64-3.59 1.68-4.93C7.26 4.93 9.5 3.36 9.5 2c0-1.5 1.5-2 2.5-2s2.5 .5 2.5 2c0 1.36 2.24 2.93 3.82 5.07C19.36 8.41 20 10.14 20 12c0 2.25-.93 4.25-2.34 5.66z" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

export const XCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);