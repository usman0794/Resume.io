export interface ResumeExample {
    title: string;
    imageUrl?: string;
    href?: string;
}

export interface IndustryCategory {
    id: string;
    title: string;
    count: number;
    description: string;
    iconName: string;
    primaryExamples: ResumeExample[];
    secondaryExamples: ResumeExample[];
}
