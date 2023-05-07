
export interface Cart{
    // drinks: ,-vel elválasztva a drink_id & mennyiseg, ;-vel elvasztva az egyes italok
    // split után: drinks[0][0] = id, drinks[0][1] = mennyiseg
    // id = user idja
    id: string;
    drinks: string;
    // össz pénz
    carted_count: number;
}