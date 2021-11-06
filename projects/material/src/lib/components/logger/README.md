# Logger

The volvox logger is a tool to display messages / infos to a user. It can also be used to catch http request errors and
directly display the error message to the user

## Example usage

### HTML

`````html
<volvox-logger></volvox-logger>
`````

### TypeScript

````typescript
export class AppComponent implements OnInit {
    
    @ViewChild(LoggerComponent)
    public set logger(logger: LoggerComponent) {
        this.myLoggerService.logger(logger, this.defaultLoggerConfig);
    }
    
    constructor(
        private myCoreLoggerService: CoreLoggerService,
        private myLoggerService: LoggerService,
    ) {
    }

    public ngOnInit(): void {
        // Subscribe to ui logs
        this.defaultLoggerConfig = {
            debug: !environment.production,
            closeOnClick: false,
            showDismiss: true,
        };
        this.myCoreLoggerService.subUiLogs()
            .subscribe((data: ILogEvent): void => {
                if (data) {
                    this.myLoggerService.show({
                        title: data.title,
                        msg: data.msg,
                        ...data.config,
                        ...this.defaultLoggerConfig as ILoggerConfig,
                    }, data.type);
                }
            });
    }
}
````

## Logger features

For model definition see [ILoggerConfig](../../../../../core/src/lib/models/logger/logger-config.model.ts)

````typescript
// Subscribe to each log emitted in the code, or from http requests
this.myLoggerService.subUiLogs()

// Get error message from an object
this.myLoggerService.getErrorMsg(err);

// Get error title from an object
this.myLoggerService.getErrorTitle(err);

// Log an error
this.myLoggerService.logError({ msg: message });

// Log a success message
this.myLoggerService.logSuccess({ msg: message });

// Log a warning message
this.myLoggerService.logWarning({ msg: message });

// Log an info message
this.myLoggerService.logInfo({ msg: message });

// Any kind of log
this.myLoggerService.log({ msg: message });

// Any kind of log
this.myLoggerService.show({ msg: message }, 'default');
````