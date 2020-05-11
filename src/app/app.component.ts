import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gateway-app';

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    [
      'close', 'edit', 'delete', 'eye'].forEach((iconName) => this.matIconRegistry.addSvgIcon(
      `app-${iconName}`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/img/${iconName}.svg`)
    ));
  }
}
