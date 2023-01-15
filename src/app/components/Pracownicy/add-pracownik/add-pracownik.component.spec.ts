import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPracownikComponent } from './add-pracownik.component';

describe('AddPracownikComponent', () => {
  let component: AddPracownikComponent;
  let fixture: ComponentFixture<AddPracownikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPracownikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPracownikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
