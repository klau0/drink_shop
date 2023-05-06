
export interface Cart{
    // params: drink_id, db_szam
    drinks: Map<string, number>;
    user_id: string;
    carted_count: number;
}