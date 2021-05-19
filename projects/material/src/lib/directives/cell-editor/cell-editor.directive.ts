import { ContentChild, Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { CellEditorComponent } from '../../components/cell-editor/cell-editor.component';
import { CellEditorService } from '../../services/cell-editor.service';

@Directive({
    selector: 'td[volvoxCellEditor]',
})
export class CellEditorDirective implements OnInit {

    @ContentChild(CellEditorComponent)
    private cellEditor: CellEditorComponent;

    constructor(
        private readonly myElementRef: ElementRef<HTMLElement>,
        private readonly myCellEditorService: CellEditorService,
    ) {
    }

    public ngOnInit(): void {
        this.myElementRef.nativeElement.classList.add('editable-cell');
    }

    @HostListener('keydown.escape', ['$event'])
    public onEscapeKeyDown(e: KeyboardEvent): void {
        e.preventDefault();
        this.cellEditor.toOutput();
    }

    @HostListener('keydown.tab', ['$event'])
    @HostListener('keydown.shift.tab', ['$event'])
    @HostListener('keydown.meta.tab', ['$event'])
    public onShiftKeyDown(e: KeyboardEvent): void {
        e.preventDefault();
        if (e.shiftKey) {
            this.moveToCell(e, false);
        } else {
            this.moveToCell(e, true);
        }
    }

    @HostListener('keydown.enter', ['$event'])
    public onEnterKeyDown(e: KeyboardEvent): void {
        e.preventDefault();
        if (this.myCellEditorService.isEditingCellValid()) {
            this.moveToNextRowCell(e);
        }
    }

    @HostListener('click', ['$event'])
    public onClick(e: MouseEvent): void {
        e.preventDefault();
        this.myCellEditorService.updateEditingCell(this.cellEditor);
        this.cellEditor.cellClick.emit();
    }

    private static invokeElementMethod(element: any, methodName: string, args?: any[]): void {
        (element as any)[methodName].apply(element, args);
    }

    private static executeMove(e: KeyboardEvent, targetCell: Element): void {
        e.preventDefault();
        // If datepicker is opened, remove cdk-overlay from dom
        const element: Element = e.composedPath()[0] as Element;
        if (element.className.indexOf('td-input-date') > -1) {
            const cdkOverlayContainer: Element = document.getElementsByClassName('cdk-overlay-container')[0];
            const cdkBackdrop: Element = cdkOverlayContainer.getElementsByClassName('cdk-overlay-backdrop')[0];
            if (cdkBackdrop != null) {
                CellEditorDirective.invokeElementMethod(cdkBackdrop, 'click');
            }
            cdkOverlayContainer.innerHTML = '';
        }

        CellEditorDirective.invokeElementMethod(e.target, 'blur');
        if (targetCell != null) {
            CellEditorDirective.invokeElementMethod(targetCell, 'click');
        }
    }

    private moveToNextRowCell(e: KeyboardEvent): void {
        const currentCell: Element = this.cellEditor?.element?.parentElement;
        if (!currentCell) {
            return;
        }

        let columnDefClass: string = '';
        currentCell.classList.forEach((className: string): void => {
            const found: boolean = className.indexOf('mat-column-') > -1;
            if (found) {
                columnDefClass = className;
            }
        });

        const targetCell: Element = this.findNextRowEditableColumn(currentCell, columnDefClass);
        this.cellEditor.toOutput(true);
        CellEditorDirective.executeMove(e, targetCell);
    }

    private findNextRowEditableColumn(row: Element, matColumnClassName: string): Element {
        const nextRow: Element = row.parentElement?.nextElementSibling;
        if (!nextRow) {
            return null;
        }

        const column: Element = nextRow.getElementsByClassName(matColumnClassName)[0];
        return column?.classList.contains('editable-cell') ?
            column.firstChild as HTMLElement :
            this.findNextRowEditableColumn(nextRow, matColumnClassName);
    }

    private findNextEditableColumn(cell: HTMLElement): HTMLElement {
        let nextCell: HTMLElement = cell.parentElement?.nextElementSibling as HTMLElement;

        if (!nextCell) {
            const nextRow: HTMLElement = cell.parentElement.parentElement.nextElementSibling as HTMLElement;
            if (nextRow) {
                nextCell = nextRow.firstElementChild as HTMLElement;
            }
        }

        if (nextCell) {
            return nextCell.classList.contains('editable-cell') ?
                nextCell.firstChild as HTMLElement :
                this.findNextEditableColumn(nextCell);
        } else {
            return null;
        }
    }

    private findPreviousEditableColumn(cell: HTMLElement): HTMLElement {
        let prevCell: HTMLElement = cell.previousElementSibling as HTMLElement;

        if (!prevCell) {
            const previousRow: HTMLElement = cell.parentElement.previousElementSibling as HTMLElement;
            if (previousRow) {
                prevCell = previousRow.lastElementChild as HTMLElement;
            }
        }

        if (prevCell) {
            return prevCell.classList.contains('editable-cell') ?
                prevCell.firstChild as HTMLElement :
                this.findPreviousEditableColumn(prevCell);
        } else {
            return null;
        }
    }

    private moveToCell(event: any, nextCell: boolean): void {
        const currentCell: HTMLElement = this.cellEditor.element;
        if (this.cellEditor.element != null) {
            const targetCell: HTMLElement = nextCell ?
                this.findNextEditableColumn(currentCell) :
                this.findPreviousEditableColumn(currentCell);
            if (this.myCellEditorService.isEditingCellValid()) {
                this.cellEditor.toOutput(true);
                targetCell?.click();
            }
            CellEditorDirective.executeMove(event, targetCell);
        }
    }

}
