export interface SelectPropsI {
    options: string[]
}

export interface SelectStateI {
    options: string[],
    currentValue: string,
    isOpen: boolean,
}