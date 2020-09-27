import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Subject } from 'rxjs';
import { TableItem } from '../../models/table-item.model';

@Component({
    selector: 'apollo-cell-editor',
    templateUrl: './cell-editor.component.html',
    styleUrls: ['./cell-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellEditorComponent implements OnInit, OnDestroy {

    public mode: 'input' | 'output' = 'output';

    @Input()
    public key: string;

    @Input()
    public rowItem: TableItem<any>;

    @Input()
    public value: any;

    @Output()
    public valueChange: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public cellClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @Output()
    private cellChange: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    private cellCancel: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild(MatSelect) private select: MatSelect;
    private ngUnsubscribe: Subject<any>;
    private oldValue: any;

    constructor(
        private readonly myElementRef: ElementRef<HTMLElement>,
        private readonly myChangeDetectorRef: ChangeDetectorRef,
    ) {
    }

    public get element(): HTMLElement {
        return this.myElementRef.nativeElement;
    }

    public ngOnInit(): void {
        this.ngUnsubscribe = new Subject<any>();
        this.oldValue = this.value;
        this.rowItem.rowOriginalData = this.rowItem;
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public toOutput(save?: boolean): void {
        if (this.mode !== 'output') {
            this.mode = 'output';
            this.element.classList.remove('focused');

            if (save) {
                if (!this.rowItem.rowChangedRowKeys) {
                    this.rowItem.rowChangedRowKeys = [];
                }
                const index: number = this.rowItem.rowChangedRowKeys.indexOf(this.key);
                if (this.value !== this.oldValue) {
                    if (index === -1) {
                        this.rowItem.rowChangedRowKeys.push(this.key);
                        this.element.classList.add('edited');
                    }
                    this.cellChange.emit();
                } else {
                    if (index !== -1) {
                        this.rowItem.rowChangedRowKeys.splice(index, 1);
                        this.element.classList.remove('edited');
                    }
                }
            } else {
                this.value = this.oldValue;
                this.cellCancel.emit();
            }
            this.valueChange.next(this.value);
            this.myChangeDetectorRef.markForCheck();
        }
    }

    public toInput(): void {
        this.mode = 'input';
        this.element.classList.add('focused');
        setTimeout((): void => {
            const comp: any = this.element.querySelector('.cell-input');

            if (comp instanceof HTMLInputElement) {
                comp.focus();
            } else if (this.select) {
                this.select.open();
            }
        });
        this.myChangeDetectorRef.markForCheck();
    }

}
