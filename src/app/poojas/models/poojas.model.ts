export interface Poojas {
    id?: number;
    name?: string;
    color?: string;
    pantone_value?: string;

    address?: string;
    star?: string;
    price?: number
}
export interface NewPoojaResponse {
    phoneNumber?: string;
    address?: string;
    persons: any[];
    totalPrice: number,
    date: string
}

export const starSigns = [
'അശ്വതി',
'ഭരണി',
'കാർത്തിക',
'രോഹിണി',
'മകയിരം',
'തിരുവാതിര',
'പുണർതം',
'പൂയം',
'ആയില്യം',
'മകം',
'പൂരം',
'ഉത്രം',
'അത്തം',
'ചിത്തിര',
'ചോതി',
'വിശാഖം',
'അനിഴം',
'തൃക്കേട്ട',
'മൂലം',
'പൂരാടം',
'ഉത്രാടം',
'തിരുവോണം',
'അവിട്ടം',
'ചതയം',
'പൂരുരുട്ടാതി',
'ഉത്രട്ടാതി',
'രേവതി',
]