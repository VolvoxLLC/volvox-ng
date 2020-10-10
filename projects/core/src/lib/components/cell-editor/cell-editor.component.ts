import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { ICellEditorState } from '../../models/states/cell-editor.state.model';
import { TableItem } from '../../models/table-item.model';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'volvox-cell-editor',
    templateUrl: './cell-editor.component.html',
    styleUrls: ['./cell-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellEditorComponent extends BaseComponent<ICellEditorState> implements OnInit {

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

    @ContentChild(MatSelect)
    private select: MatSelect;

    private oldValue: any;

    constructor(
        private readonly myElementRef: ElementRef<HTMLElement>,
        private readonly myChangeDetectorRef: ChangeDetectorRef,
    ) {
        super();
        this.store$ = new BehaviorSubject<ICellEditorState>({
            mode: 'output',
        });
    }

    public get element(): HTMLElement {
        return this.myElementRef.nativeElement;
    }

    public ngOnInit(): void {
        this.oldValue = this.value;
        this.rowItem.rowOriginalData = this.rowItem;
    }

    public toOutput(save?: boolean): void {
        if (this.snapshot.mode !== 'output') {
            this.updateState({...this.snapshot, mode: 'output'});
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
        this.updateState({...this.snapshot, mode: 'input'});
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
