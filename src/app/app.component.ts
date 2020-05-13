import {Component, OnInit} from '@angular/core';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {filter, map} from 'rxjs/internal/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GatewayApp';

  constructor(private titleService: Title,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private router: Router,
  ) {
    [
      'close', 'edit', 'delete', 'eye', 'add'].forEach((iconName) => this.matIconRegistry.addSvgIcon(
      `app-${iconName}`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/img/${iconName}.svg`)
    ));
  }

  ngOnInit() {
    const appTitle = this.titleService.getTitle();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.route.firstChild;
        while (child.firstChild) {
          child = child.firstChild;
        }
        if (child.snapshot.data.title) {
          return child.snapshot.data.title;
        }
        return appTitle;
      })
    ).subscribe((ttl: string) => {
      this.titleService.setTitle(`${this.title} | ${ttl}`);
    });
  }
}
