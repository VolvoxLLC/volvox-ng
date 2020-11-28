import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { IUpdateConfig, IVersion, UpdateDialogResult } from '../../models/update-config.model';
import { ApiService } from '../../services/api.service';
import { LoggerService } from '../../services/logger.service';
import { isNullOrEmpty } from '../../utils/commons.util';
import { MatUpdateDialog } from './mat-update-dialog/mat-update.dialog';

@Component({
    selector: 'volvox-update-dialog',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateDialog implements OnInit {

    @Input('config')
    private set updateConfig(config: IUpdateConfig) {
        if (config) {
            if (!config.versionPath) {
                this.myLoggerService.logError('LoggerService', 'No version path was provided. This field is required!');
                return;
            }

            if (!config.localStorageKey) {
                this.myLoggerService
                    .logWarning('LoggerService', 'No localStorageKey was provided. Using value \'volvoxApplicationVersion\'');
                config.localStorageKey = 'volvoxApplicationVersion';
            }

            if (!config.ignoreTimeout) {
                this.myLoggerService.logWarning('LoggerService', 'No ignoreTimeout was provided. Using value \'30000\'');
                config.ignoreTimeout = 30000;
            }

            if (!config.refreshInterval) {
                this.myLoggerService.logWarning('LoggerService', 'No refreshInterval was provided. Using value \'15000\'');
                config.refreshInterval = 15000;
            }

            this.config = config;
            this.end();
            this.start();
        } else {
            this.myLoggerService.logWarning('LoggerService', 'Cannot check for version. No config was provided.');
        }
    }

    private blocked: boolean;
    private firstLoad: boolean;
    private interval: number;
    private config: IUpdateConfig;

    constructor(
        private readonly myMatDialog: MatDialog,
        private readonly myApiService: ApiService,
        private readonly myLoggerService: LoggerService,
    ) {
    }

    public ngOnInit(): void {
    }

    private start(): void {
        if (this.interval) {
            this.end();
        }
        this.checkForUpdate().then();
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
    }

}
