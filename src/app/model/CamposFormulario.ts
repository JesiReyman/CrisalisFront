export class CamposFormulario {
    key: string;
    value: string | number | Date;
    label: string;
    type: string;
    required: boolean;
    pattern?: string;
    options?: string[];

    constructor(key: string, value: string | number, label: string, type: string, required: boolean, pattern?: string, options?: string[]) {
        this.key = key;
        this.value = value;
        this.label = label;
        this.type = type;
        this.required = required;
        this.pattern = pattern;
        this.options = options;
    }
}
