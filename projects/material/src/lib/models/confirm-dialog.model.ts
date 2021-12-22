// eslint-disable-next-line max-classes-per-file
export enum ConfirmDialogResult {
    confirmed,
    denied,
    cancelled,
}

export class ConfirmDialogAction {
    public icon: string;
    public visible: boolean;
    public label: string;

    constructor(label: string, visible?: boolean) {
        this.label = label;
        this.visible = visible;
    }
}

export class ConfirmDialogData {
    public title: string;
    public message: string;
    public cancel: ConfirmDialogAction;
    public confirm: ConfirmDialogAction;
    public deny: ConfirmDialogAction;

    constructor(title?: string, message?: string, cancel?: ConfirmDialogAction, confirm?: ConfirmDialogAction, deny?: ConfirmDialogAction) {
        this.title = title;
        this.message = message;
        this.cancel = cancel;
        this.confirm = confirm;
        this.deny = deny;
    }
}
