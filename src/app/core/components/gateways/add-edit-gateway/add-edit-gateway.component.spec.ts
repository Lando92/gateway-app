import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEditGatewayComponent} from './add-edit-gateway.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../../../material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AddEditGatewayComponent', () => {
  let component: AddEditGatewayComponent;
  let fixture: ComponentFixture<AddEditGatewayComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
