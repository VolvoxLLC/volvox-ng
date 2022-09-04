import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { TableItem } from '../../models/table-item.model';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'volvox-cell-editor',
    templateUrl: './cell-editor.component.html',
    styleUrls: [ './cell-editor.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class CellEditorComponent<T = any> extends BaseComponent implements OnInit {

    @Input()
    public key: string;

    @Input()
    public rowItem: TableItem<T>;

    @Input()
    public value: T;

    @Output()
    public valueChange: EventEmitter<T> = new EventEmitter<T>();

    @Output()
    public cellClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @Output()
    private cellChange: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    private cellCancel: EventEmitter<void> = new EventEmitter<void>();

    @ContentChild(MatSelect)
    private select: MatSelect;

    public mode: 'input' | 'output' = 'output';

    private oldValue: T;

    constructor(
        private readonly myChangeDetectorRef: ChangeDetectorRef,
        private readonly myElementRef: ElementRef<HTMLElement>,
    ) {
        super();
    }

    public get element(): HTMLElement {
        return this.myElementRef.nativeElement;
    }

    public ngOnInit(): void {
        this.oldValue = this.value;
        this.rowItem.rowOriginalData = this.rowItem;
    }

    public toOutput(save?: boolean): void {
        if (this.mode !== 'output') {
            this.mode = 'output';
            this.myChangeDetectorRef.markForCheck();
            this.element.classList.remove('focused');

            if (save) {
                if (!this.rowItem.changedRowKeys) {
                    this.rowItem.changedRowKeys = [];
                }
                const index: number = this.rowItem.changedRowKeys.indexOf(this.key);
                if (this.value !== this.oldValue) {
                    if (index === -1) {
                        this.rowItem.changedRowKeys.push(this.key);
                        this.element.classList.add('edited');
                    }
                    this.cellChange.emit();
                } else {
                    if (index !== -1) {
                        this.rowItem.changedRowKeys.splice(index, 1);
                        this.element.classList.remove('edited');
                    }
                }
            } else {
                this.value = this.oldValue;
                this.cellCancel.emit();
            }
            this.valueChange.next(this.value);
        }
    }

    public toInput(): void {
        this.mode = 'input';
        this.myChangeDetectorRef.markForCheck();
        this.element.classList.add('focused');
        setTimeout((): void => {
            const comp: HTMLElement = this.element.querySelector('.cell-input');

            if (comp instanceof HTMLInputElement) {
                comp.focus();
            } else if (this.select) {
                this.select.open();
            }
        });
    }

}
