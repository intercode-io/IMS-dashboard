import { Component } from '@angular/core';

@Component({
  selector: 'ngx-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.scss'],
})

export class SpinnerComponent {

  loading = false;

  toggleLoadingAnimation() {
    this.loading = false;
    // setTimeout(() => this.loading = false, 3000);
    setTimeout(() => this.loading = false, 1);
  }
}
