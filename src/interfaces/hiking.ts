export interface Hiking {
    id?: string;
    title?: string;
    photo?: string;
    date: string;
    guide_id: string;
    startLocalization: string;
    endLocalization: string;
    duration: string;
    distance: number;
    complexity: string;
    description?: string;
    personMinNumber: number;
    personMaxNumber: number;
    hikers_id: string[];
    price?: number;
}

export interface User {
    id?: string;
    email: string;
    firstname: string;
    lastname: string;
    address: string;
}
