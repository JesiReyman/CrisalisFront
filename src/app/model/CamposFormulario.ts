export class CamposFormulario {
    key: string;
    value: string | number;
    label: string;
    type: string;
    required: boolean;
    pattern?: string;

    constructor(key: string, value: string | number, label: string, type: string, required: boolean, pattern?: string) {
        this.key = key;
        this.value = value;
        this.label = label;
        this.type = type;
        this.required = required;
        this.pattern = pattern;
    }
}
