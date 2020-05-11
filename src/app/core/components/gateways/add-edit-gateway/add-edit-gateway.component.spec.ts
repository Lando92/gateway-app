import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGatewayComponent } from './add-edit-gateway.component';

describe('AddEditGatewayComponent', () => {
  let component: AddEditGatewayComponent;
  let fixture: ComponentFixture<AddEditGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
