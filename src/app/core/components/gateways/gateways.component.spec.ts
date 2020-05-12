import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {GatewaysComponent} from './gateways.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../../material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {GatewayService} from '../../services/gateway.service';
import {of} from 'rxjs/index';
import {Gateway} from '../../models';

describe('GatewaysComponent', () => {
  let component: GatewaysComponent;
  let fixture: ComponentFixture<GatewaysComponent>;
  let gatewayService: GatewayService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientTestingModule, BrowserAnimationsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [GatewaysComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaysComponent);
    component = fixture.componentInstance;
    gatewayService = TestBed.inject(GatewayService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill the table with values returned  from server', () => {
    const gateways: Gateway[] = [
      {
        id: '1588947442214',
        displayName: 'Test Gateway',
        ipv4_address: '192.169.43.5',
        p_devices: [
          {
            uid: 122354576765634,
            vendor: 'LG',
            createdDate: new Date('Fri May 08 2020 09:07:11 GMT-0400 (GMT-04:00)'),
            status: 0,
          },
          {
            uid: 122354236465634,
            vendor: 'Huawei',
            createdDate: new Date('Fri May 08 2020 09:07:11 GMT-0400 (GMT-04:00)'),
            status: 1,
          },
          {
            uid: 122354576765612,
            vendor: 'SAMSUNG',
            createdDate: new Date('Fri May 08 2020 09:07:11 GMT-0400 (GMT-04:00)'),
            status: 1,
          },
          {
            uid: 54354576765634,
            vendor: 'Motorola',
            createdDate: new Date('Fri May 08 2020 09:07:11 GMT-0400 (GMT-04:00)'),
            status: 0,
          },
          {
            uid: 7122677876765634,
            vendor: 'Nokia',
            createdDate: new Date('Fri May 08 2020 09:07:11 GMT-0400 (GMT-04:00)'),
            status: 0,
          },
        ],
      },
      {
        id: '1589307159625',
        displayName: 'Gteway1',
        ipv4_address: '192.34.5.1',
        p_devices: [
          {
            uid: 345262123,
            vendor: 'SAMSUNG',
            createdDate: new Date('2020-05-11T04:00:00.000Z'),
            status: 0
          },
          {
            uid: 9699785685686,
            vendor: 'LG',
            createdDate: new Date('2020-05-12T04:00:00.000Z'),
            status: 1
          }
        ]
      }
    ];
    spyOn(gatewayService, 'getGateways').and.callFake(() => {
      return of(gateways);
    });
    component.getAllGateways();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const tableRows = fixture.nativeElement.querySelectorAll('mat-row');
      expect(tableRows.length).toBe(2);
    });
  });
});
