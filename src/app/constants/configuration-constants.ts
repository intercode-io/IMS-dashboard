import { MatSnackBarConfig } from '@angular/material/snack-bar';

export class ConfigurationConstants {
    static readonly DEFAULT_MATSNACKBACK_CONFIGURATION: MatSnackBarConfig = {
        duration: 5000,
        horizontalPosition: "center",
        verticalPosition: "top"
    }
}
