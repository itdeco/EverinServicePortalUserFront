export type GenericAction = {
    type: string;
    payload?: any;
}

export type Action = GenericAction;

export type ActionResult = {
    payload?: any;
    error?: any;
}