export interface TransactionDto {
    tid:       number;
    buyer_uid: number;
    datetime:  string;
    status:    string;
    total:     number;
    items:     TransactionDtoItem[];
}

export interface TransactionDtoItem {
    tpid:     number;
    product:  TransactionProductDto;
    quantity: number;
    subtotal: number;
}

export interface TransactionProductDto {
    pid:         number;
    name:        string;
    description: string;
    price:       number;
    stock:       number;
    image_url:   string;
}
