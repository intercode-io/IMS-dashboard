import {Component} from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'ngx-spinner-in-tabs',
    templateUrl: 'spinner-in-tabs.component.html',
    styleUrls: ['spinner-in-tabs.component.scss'],
})

export class SpinnerInTabsComponent {

    loading = false;

    toggleLoadingAnimation() {
        if (!environment){
            this.loading = false;
        }

        setTimeout(() => this.loading = false, 1000);
    }
}
