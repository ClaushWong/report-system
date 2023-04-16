export type Company = {
    name: string;
    address: string;
    logo: string;
    phone?: string;
    registration_no?: string;
};

export type PrinterInvoiceItem = {
    name: string;
    quantity: string | number;
    unit_price: string | number;
    amount: string | number;
    remarks?: string[];
    subitems?: { text: string; remark?: string }[];
};

export type PrinterInvoice = {
    type?: string;
    orderId?: string;
    header_remarks?: string;
    company: Company;
    id: string;
    date: Date;
    user?: string;
    items: PrinterInvoiceItem[];

    register_url?: string;
    subtotal: {
        total_items: string;
        amount: string;
    };

    service_charge?: {
        percent: string;
        amount: string;
    };
    service_tax?: {
        percent: string;
        amount: string;
    };
    discount?: string | number;
    total: string;
    total_rounding_adj: string;
    total_after_rounding: string;

    payment: {
        type: string;
        amount: string;
        detail?: any; // TODO: define the needed params
    };
    change: string;
};

export type PrinterKitchenSheetItem = {
    name: string;
    quantity: number;
    remarks?: string[];
    subitems?: { text: string; remark?: string }[];
};
export type PrinterKitchenSheet = {
    title?: string;
    queueNo?: string;
    type: string;
    table?: string;
    date: Date;
    items: PrinterKitchenSheetItem[];
    remarks?: string;
    header_remarks?: string;
    user?: string;
    customer?: string;
    orderId?: string;
};
export type PrinterSummarySheet = {
    header_remarks?: string;
    user?: string;
    title?: string;
    date: Date;

    summary_title?: string;
    items: { label: string; value: string | number; is_bold?: boolean }[];
    remarks?: string;
};
