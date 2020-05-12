import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEditGatewayComponent} from './add-edit-gateway.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../../../material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GatewayService} from '../../../services/gateway.service';
import {of} from 'rxjs/index';

describe('AddEditGatewayComponent', () => {
  let component: AddEditGatewayComponent;
  let fixture: ComponentFixture<AddEditGatewayComponent>;
  let gatewayService: GatewayService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientTestingModule, BrowserAnimationsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [AddEditGatewayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditGatewayComponent);
    component = fixture.componentInstance;
    gatewayService = TestBed.inject(GatewayService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentGateway and gatewayDevices property with the item returned  from server', () => {
    const gateway = {
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
    };
    spyOn(gatewayService, 'getGateway').and.callFake(() => {
      return of(gateway);
    });
    component.loadGatewayData('1588947442214');
    expect(component.currentGateway).toEqual(gateway);
    expect(component.gatewayDevices).toEqual(gateway.p_devices);
  });

  it('should create gatewayForm with 2 controls (name,ipAddress)', () => {
    expect(component.gatewayForm.contains('name')).toBeTruthy();
    expect(component.gatewayForm.contains('ipAddress')).toBeTruthy();
  });

  it('should validate gatewayForm', () => {
    const nameControl = component.gatewayForm.controls.name;
    const ipAddressControl = component.gatewayForm.controls.ipAddress;

    nameControl.setValue('');
    expect(nameControl.valid).toBeFalsy();

    nameControl.setValue('Test Gateway');
    expect(nameControl.valid).toBeTruthy();

    ipAddressControl.setValue('');
    expect(ipAddressControl.valid).toBeFalsy();

    ipAddressControl.setValue('256.123.23.1');
    expect(ipAddressControl.valid).toBeFalsy();

    ipAddressControl.setValue('192.123.23.1');
    expect(ipAddressControl.valid).toBeTruthy();
  });

  it('should create deviceForm with 4 controls (uid, vendor, createdDate, status)', () => {
    expect(component.deviceForm.contains('uid')).toBeTruthy();
    expect(component.deviceForm.contains('vendor')).toBeTruthy();
    expect(component.deviceForm.contains('createdDate')).toBeTruthy();
    expect(component.deviceForm.contains('status')).toBeTruthy();
  });

  it('should validate deviceForm', () => {
    const uid = component.deviceForm.controls.uid;
    const vendor = component.deviceForm.controls.vendor;
    const createdDate = component.deviceForm.controls.createdDate;
    const status = component.deviceForm.controls.status;

    uid.setValue('');
    expect(uid.valid).toBeFalsy();

    uid.setValue('5657576576');
    expect(uid.valid).toBeTruthy();

    vendor.setValue('');
    expect(vendor.valid).toBeFalsy();

    vendor.setValue('Motorola');
    expect(vendor.valid).toBeTruthy();

    createdDate.setValue('');
    expect(createdDate.valid).toBeFalsy();

    status.setValue('');
    expect(status.valid).toBeFalsy();

    status.setValue(1);
    expect(status.valid).toBeTruthy();

  });
});
