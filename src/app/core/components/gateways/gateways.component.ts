import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {getQueryParams, SHORT_PAGE_SIZES, test} from '../../utils/helpers';
import {MatTableDataSource} from '@angular/material/table';
import {GatewayService} from '../../services/gateway.service';
import {finalize, takeUntil, tap} from 'rxjs/internal/operators';
import {ToasterService} from '../../services/toaster.service';
import {Subject} from 'rxjs';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Gateway, Status} from '../../models';

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.scss']
})
export class GatewaysComponent implements OnInit, OnDestroy {
  private componentDestroy = new Subject<any>();
  readonly pageSizes: number[] = SHORT_PAGE_SIZES;
  isLoading: boolean;
  dataSource: MatTableDataSource<any>;
  gatewayDevices: MatTableDataSource<any>;
  displayedColumns: string[];
  devicesColumns: string[];
  selectedGateway: Gateway;
  paginator: MatPaginator;
  @ViewChild('gatewayDialog', {static: true}) gatewayDialog: TemplateRef<any>;

  @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  dialogRef: MatDialogRef<any>;
  initials: any;
  statusEnum = Status;
  page = 1;
  pageSize = SHORT_PAGE_SIZES[0];
  totalRecords = 0;
  dialogAction: string;

  constructor(private gatewayService: GatewayService,
              private toasterService: ToasterService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
    this.displayedColumns = ['displayName', 'ipv4_address', 'p_devices', 'actions'];
    this.devicesColumns = ['uid', 'vendor', 'createdDate', 'status'];
  }

  ngOnInit(): void {
    this.watchQueryParams();
    this.getAllGateways();
  }

  private watchQueryParams() {
    this.route.queryParamMap.pipe(
      tap(params => {
        this.page = +params.get('page');
        this.pageSize = +params.get('size');
        if (!SHORT_PAGE_SIZES.some(ps => this.pageSize === ps)) {
          this.router.navigate(['/gateway'], {
            queryParams: {pageSize: SHORT_PAGE_SIZES[0]},
            queryParamsHandling: 'merge'
          });
          return;
        }
        this.getAllGateways();
      }),
    ).subscribe();
  }

  getAllGateways() {
    this.isLoading = true;
    this.gatewayService.getGateways().pipe(
      finalize(() => this.isLoading = false),
      takeUntil(this.componentDestroy)
    ).subscribe((res) => {
      this.dataSource = new MatTableDataSource<any>(res);
      this.totalRecords = res.length;
    }, error1 => this.toasterService.showErrorToaster(error1.message));
  }

  changePage($event: PageEvent) {
    const queryParams: any = getQueryParams(this.route.snapshot.queryParamMap, ['page', 'size']);
    if ($event.pageIndex) {
      queryParams.page = $event.pageIndex + 1;
    }
    if ($event.pageSize !== this.pageSizes[0]) {
      queryParams.size = $event.pageSize;
    }
    this.router.navigate(['gateway'], {queryParams});
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  // @note: workaround for work with the paginate, didnt work with AfterViewInit
  private setDataSourceAttributes() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  goToEdit(id: any) {
    this.router.navigate(['gateway', id]);
  }

  deleteGateway(gateway) {
    this.selectedGateway = gateway;
    this.dialogAction = 'confirm';
    this.dialogRef = this.dialog.open(this.gatewayDialog, {width: '400px'});
  }

  closeDialog() {
    this.dialogRef.close();
  }

  confirmSelection() {
    this.dialogRef.close();
    this.isLoading = true;
    this.gatewayService.deleteGateway(this.selectedGateway.id).pipe(
      finalize(() => this.isLoading = false),
      takeUntil(this.componentDestroy)
    ).subscribe(() => {
      this.getAllGateways();
    }, error1 => this.toasterService.showErrorToaster('Error deleting Gateway'));
  }

  gatewayDetail(gateway) {
    this.dialogAction = 'detail';
    this.initials = gateway.displayName.split(' ');
    this.selectedGateway = gateway;
    this.gatewayDevices = new MatTableDataSource<any>(gateway.p_devices);
    this.dialogRef = this.dialog.open(this.gatewayDialog, {width: '800px'});
  }
}
