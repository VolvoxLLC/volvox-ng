# Changelog

11.0.0
--------------------------------
- Update versions to angular version
- Create own file for changelog

2.1.1 (2021-05-26)
--------------------------------
- Improve findInArray pipe
    - Search parameter is optional
- Sieve add setters
- Replace range prototype

2.1.0 (2021-05-19)
--------------------------------
- Parameter change for logger
- Add sieve response model

2.0.7 (2021-05-02)
--------------------------------
- Added join pipe
- Added findInArray pipe
- Updated packages

2.0.6 (2021-03-25)
--------------------------------
- Fix peerDependency Version

2.0.5 (2021-02-19)
--------------------------------
- Extend api service with http options

2.0.4 (2021-02-18)
--------------------------------
- Fix ApiService Content-Type when uploading files

2.0.3 (2021-02-17)
--------------------------------
- Fix ApiService always sending application/json as content-type

2.0.2 (2021-02-16)
--------------------------------
- Add update Dictionary
- Add remove item from dictionary
- Add get index

2.0.1 (2021-01-23)
--------------------------------
- Fixed logger

2.0.0 (2021-01-15)
--------------------------------
- Added roundNearest()
- seperated core to core and material
    - UI -> @volvox-ng/material
    - Other -> @volvox-ng/core

1.3.6 (2020-12-13)
--------------------------------
- Added disabled state for volvox-loading-button

1.3.6 (2020-12-13)
--------------------------------
- Added getErrorTitle
- ApiService accepts now options to set token instead of single accessToken

1.3.5 (2020-12-07)
--------------------------------
- Fixed default error handling

1.3.4 (2020-11-23)
--------------------------------
- Bug fixes

1.3.3 (2020-11-23)
--------------------------------
- Added loading button (spinner / progress-bar)
- Added log title - Now **all** log() calls need a title
- Logs can have a default config now

1.3.2 (2020-11-17)
--------------------------------
- Api errors fix

1.3.1 (2020-11-14)
--------------------------------
- Added Global error handling
- Added more supported languages
- Extended api call options

1.3.0 (2020-11-14)
--------------------------------
- Upgrade to Angular 11

1.2.3 (2020-11-14)
--------------------------------
- Refactor folder structure
- Add utils
- Add enums

1.2.2 (2020-10-25)
--------------------------------
- Bug fixes

1.2.1 (2020-10-11)
--------------------------------
- Updated live updated timeSince pipe
- Added behaviour subject to use with state
- Updated translation

1.1.2 (2020-10-03)
--------------------------------

- First release

### Classes

- Added Dictionary
- Added i18n model
- Added prototypes
- Added sieve

### Components

- Added alert widget
- Added base
- Added cell editor
- Added confirm dialog
- Added logger
- Added skeleton loader

### Directives

- Added cell editor
- Added click outside
- Added scroll
- Added var

### Pipes

- Added dictionary item pipe
- Added volvox date pipe

### Services

- Added cell editor service
- Added logger service
- Added socket service
- Added VolvoxTranslateService