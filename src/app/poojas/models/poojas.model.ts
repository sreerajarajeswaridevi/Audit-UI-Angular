export interface PoojaTypes {
    pooja_name?: string;
    pooja_price?: string;
    pooja_code?: string;
    pooja_description?: string;
    added_by?: string;

    phone_number?: string;
    address?: string;
    nakshatram?: string;
    price?: number
}
export interface NewPoojaRequest {
    pooja_code?: string;
    phone_number?: string;
    address?: string;
    bhakthar: any[];
    pooja_price: string,
    ist_YYYYMMDD?: string
}

export interface PoojaList {
    name: string;
    nakshatram: string;
    address: string;
    pooja_price: string;
    added_by: string;
    pooja_code: string;
    phone_number: string;
    uuid: string;
    pooja_date: string;
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