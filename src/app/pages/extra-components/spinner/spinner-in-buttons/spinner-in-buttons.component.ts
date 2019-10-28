import { Component } from '@angular/core';

@Component({
  selector: 'ngx-spinner-in-buttons',
  templateUrl: 'spinner-in-buttons.component.html',
  styleUrls: ['spinner-in-buttons.component.scss'],
})

export class SpinnerInButtonsComponent {

  loadingLargeGroup = false;
  loadingMediumGroup = false;

  toggleLoadingLargeGroupAnimation() {
    this.loadingLargeGroup = false;

    // setTimeout(() => this.loadingLargeGroup = false, 3000);
    setTimeout(() => this.loadingLargeGroup = false, 1);
  }

  toggleLoadingMediumGroupAnimation() {
    this.loadingMediumGroup = false;

    setTimeout(() => this.loadingMediumGroup = false, 1);
  }
}
