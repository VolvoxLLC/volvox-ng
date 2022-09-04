import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService, isNullOrEmpty } from '@volvox-ng/core';
import { timer } from 'rxjs';
import { IUpdateConfig, IVersion, UpdateDialogResult } from '../../models/update-config.model';
import { BaseComponent } from '../base/base.component';
import { MatUpdateDialog } from './mat-update-dialog/mat-update.dialog';

@Component({
    selector: 'volvox-update-dialog',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
/***
 * ## How to use this dialog:
 *
 * ### Add following line to your package.json and run npm install
 * **"gulp": "~4.0.2"**
 *
 * ### Add these lines to your gulpfile.js
 * ```js
 * const gulp = require('gulp');
 * const fs = require('fs');
 * const pkg = require('./package.json');
 * gulp.task('create-version', async () => {
 *   const data = {
 *        version: pkg.version,
 *        timestamp: Date.now(),
 *    };
 *    console.log(data);
 *    fs.writeFileSync('src/assets/version.json', JSON.stringify(data));
 * })
 * ```
 */
export class UpdateDialog extends BaseComponent implements OnInit {

    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('config')
    public set updateConfig(config: IUpdateConfig) {
        if (config) {
            if (!config.versionPath) {
                console.warn('LoggerService: No version path was provided. This field is required!');
                return;
            }

            if (!config.localStorageKey) {
                config.localStorageKey = 'volvoxApplicationVersion';
            }

            if (!config.ignoreTimeout) {
                config.ignoreTimeout = 30000;
            }

            if (!config.refreshInterval) {
                config.refreshInterval = 15000;
            }

            if (!config.title) {
                config.title = 'volvox.components.updateDialog.title';
            }

            if (!config.message) {
                config.message = 'volvox.components.updateDialog.message';
            }

            this.config = config;
            this.end();
            this.start();
        } else {
            console.warn('LoggerService: Cannot check for version. No config was provided.');
        }
    }

    private firstLoad: boolean = true;

    private blocked: boolean;
    private interval: number;
    private config: IUpdateConfig;

    constructor(
        private readonly myApiService: ApiService,
        private readonly myMatDialog: MatDialog,
    ) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    private start(): void {
        if (this.interval) {
            this.end();
        }
        void this.checkForUpdate();
        this.interval = setInterval((): Promise<void> => this.checkForUpdate(), this.config.refreshInterval);
    }

    private openDialog(version: IVersion): void {
        this.myMatDialog
            .open(MatUpdateDialog, {
                width: '600px',
                data: this.config,
            })
            .afterClosed()
            .subscribe((result: UpdateDialogResult): void => {
                switch (result) {
                    case UpdateDialogResult.cancel:
                        this.end();
                        this.blocked = true;
                        break;
                    case UpdateDialogResult.ignore:
                        timer(this.config.ignoreTimeout).subscribe((): void => {
                            this.openDialog(version);
                        });
                        break;
                    case UpdateDialogResult.reload:
                        window.location.reload();
                        window.localStorage.setItem(this.config.localStorageKey, JSON.stringify(version));
                        break;
                }
            });
    }

    private async checkForUpdate(): Promise<void> {
        if (!this.blocked) {
            const localStorageVersion: string = window.localStorage.getItem(this.config.localStorageKey);
            let localVersion: IVersion = { version: '0.0.0', timestamp: 0 };
            if (!isNullOrEmpty(localStorageVersion)) {
                localVersion = JSON.parse(localStorageVersion);
            }
            const data: IVersion = await this.myApiService.getAsync(this.config.versionPath);
            if (this.firstLoad) {
                window.localStorage.setItem(this.config.localStorageKey, JSON.stringify(data));
                this.firstLoad = false;
                return;
            }
            if (data.version !== localVersion.version) {
                this.blocked = true;
                this.end();
                this.openDialog(data);
            }
        }
    }

    private end(): void {
        clearInterval(this.interval);
        this.interval = null;
    }

}
