import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Gateway, PDevice, Status} from '../../../models';
import {GatewayService} from '../../../services/gateway.service';
import {ToasterService} from '../../../services/toaster.service';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil, tap} from 'rxjs/internal/operators';
import {Subject} from 'rxjs/index';
import {isEqual} from 'lodash-es';

@Component({
  selector: 'app-add-edit-gateway',
  templateUrl: './add-edit-gateway.component.html',
  styleUrls: ['./add-edit-gateway.component.scss']
})
export class AddEditGatewayComponent implements OnInit, OnDestroy {
  isEditing: boolean;
  currentGateway: Gateway;
  isLoading: boolean;
  gatewayForm: FormGroup;
  deviceForm: FormGroup;
  deviceDatasource: MatTableDataSource<any>;
  gatewayDevices: PDevice[];
  devicesColumns: string[];
  todayDate: Date = new Date();
  status = [
    {value: 0, status: 'Offline'},
    {value: 1, status: 'Online'}
  ];
  statusEnum = Status;
  private componentDestroy = new Subject<any>();

  constructor(private gatewayService: GatewayService,
              private toasterService: ToasterService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.devicesColumns = ['uid', 'vendor', 'createdDate', 'status', 'remove'];
  }

  ngOnInit(): void {
    this.initializeComponent();
    const params = this.route.snapshot.params;
    if (params.id) {
      this.isEditing = true;
      this.loadGatewayData(params.id);
    }
  }

  loadGatewayData(id: string) {
    this.isLoading = true;
    this.gatewayService.getGateway(id).pipe(
      tap(res => {
        this.currentGateway = res;
        this.gatewayForm.controls.name.setValue(res.displayName);
        this.gatewayForm.controls.ipAddress.setValue(res.ipv4_address);
        this.gatewayDevices = [...res.p_devices];
        if (res.p_devices.length >= 10) {
          // this.deviceForm.controls.status.disable();
          // this.deviceForm.controls.createdDate.disable();
          this.deviceForm.disable();
        }
        this.refreshTable();
        this.isLoading = false;
      }),
      takeUntil(this.componentDestroy)
    ).subscribe(res => {
    }, error1 => this.toasterService.showErrorToaster(error1.message));
  }

  initializeComponent() {
    this.gatewayForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      ipAddress: new FormControl('', [Validators.required,
        Validators.pattern('^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')]),
    });
    this.deviceForm = new FormGroup({
      uid: new FormControl('', [Validators.required]),
      vendor: new FormControl('', [Validators.required]),
      createdDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
    if (!this.isEditing) {
      this.gatewayDevices = [];
      this.refreshTable();
    }
  }

  addDevice() {
    const duplicated = this.gatewayDevices.find(x => x.uid === this.deviceForm.controls.uid.value);
    if (duplicated) {
      this.toasterService.showErrorToaster('Device is already in gateway');
      return;
    }
    const temp: PDevice = {
      uid: this.deviceForm.controls.uid.value,
      vendor: this.deviceForm.controls.vendor.value,
      createdDate: this.deviceForm.controls.createdDate.value,
      status: this.deviceForm.controls.status.value,
    };
    this.gatewayDevices.push(temp);
    this.refreshTable();
    this.deviceForm.reset();
  }

  addGateway() {
    const gateway = {
      displayName: this.gatewayForm.controls.name.value,
      ipv4_address: this.gatewayForm.controls.ipAddress.value,
      p_devices: this.gatewayDevices,
    };
    this.gatewayService.addGateway(gateway).pipe(
      takeUntil(this.componentDestroy)
    ).subscribe(() => {
      this.toasterService.showSuccessToaster('Gateway added successfully');
      this.router.navigate(['gateway']);
    }, error1 => this.toasterService.showErrorToaster(error1.message));
  }

  editGateway() {
    const patchObject = this.getPatchedObject();
    this.gatewayService.editGateway(this.currentGateway.id, patchObject).pipe(
      takeUntil(this.componentDestroy)
    ).subscribe(() => {
      this.toasterService.showSuccessToaster('Gateway edited successfully');
      this.router.navigate(['gateway']);
    }, error1 => this.toasterService.showErrorToaster(error1.message));
  }

  getPatchedObject() {
    const gateway: any = {};
    const equalArrays = isEqual(this.currentGateway.p_devices, this.gatewayDevices);
    if (this.currentGateway.displayName !== this.gatewayForm.controls.name.value) {
      gateway.displayName = this.gatewayForm.controls.name.value;
    }
    if (this.currentGateway.ipv4_address !== this.gatewayForm.controls.ipAddress.value) {
      gateway.ipv4_address = this.gatewayForm.controls.ipAddress.value;
    }
    if (!equalArrays) {
      gateway.p_devices = this.gatewayDevices;
    }
    return gateway;
  }

  removeDevice(uid: number) {
    const deleteIndex = this.gatewayDevices.findIndex(x => x.uid === uid);
    this.gatewayDevices.splice(deleteIndex, 1);
    this.refreshTable();
  }

  private refreshTable() {
    this.deviceDatasource = new MatTableDataSource<any>(this.gatewayDevices);
    if (this.gatewayDevices.length >= 10) {
      this.deviceForm.disable();
    } else {
      this.deviceForm.enable();
    }

  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }
}
