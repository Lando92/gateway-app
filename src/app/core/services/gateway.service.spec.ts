import {async, inject, TestBed} from '@angular/core/testing';

import {GatewayService} from './gateway.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('GatewayService', () => {
  let service: GatewayService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GatewayService]
    });
    service = TestBed.inject(GatewayService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should fetch gateways as an Observable`, async(inject([HttpTestingController, GatewayService],
    (httpClient: HttpTestingController, postService: GatewayService) => {

      const gateways = [
        {
          id: '1588947442213',
          displayName: 'Test Gateway',
          ipv4_address: '192.169.43.5',
          p_devices: [
            {
              uid: 122354576765634,
              vendor: 'LG',
              createdDate: '2020-05-08T13:07:11.000Z',
              status: 0
            },
            {
              uid: 122354236465634,
              vendor: 'Huawei',
              createdDate: '2020-05-08T13:07:11.000Z',
              status: 1
            },
            {
              uid: 122354576765612,
              vendor: 'SAMSUNG',
              createdDate: '2020-05-08T13:07:11.000Z',
              status: 1
            },
            {
              uid: 54354576765634,
              vendor: 'Motorola',
              createdDate: '2020-05-08T13:07:11.000Z',
              status: 0
            }
          ]
        },
        {
          id: '1588947442213',
          displayName: 'Test Gateway',
          ipv4_address: '192.169.43.5',
          p_devices: [
            {
              uid: 122354576765634,
              vendor: 'LG',
              createdDate: '2020-05-08T13:07:11.000Z',
              status: 0
            },
            {
              uid: 122354236465634,
              vendor: 'Huawei',
              createdDate: '2020-05-08T13:07:11.000Z',
              status: 1
            },
            {
              uid: 122354576765612,
              vendor: 'SAMSUNG',
              createdDate: '2020-05-08T13:07:11.000Z',
              status: 1
            },
            {
              uid: 54354576765634,
              vendor: 'Motorola',
              createdDate: '2020-05-08T13:07:11.000Z',
              status: 0
            }
          ]
        }
      ];

      postService.getGateways()
        .subscribe((gateway: any) => {
          expect(gateway.length).toBe(2);
        });

      const req = httpMock.expectOne('http://localhost:3000/gateway');
      expect(req.request.method).toBe('GET');

      req.flush(gateways);
      httpMock.verify();
    })));
});
