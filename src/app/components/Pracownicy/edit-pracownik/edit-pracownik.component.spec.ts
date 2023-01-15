import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPracownikComponent } from './edit-pracownik.component';

describe('EditPracownikComponent', () => {
  let component: EditPracownikComponent;
  let fixture: ComponentFixture<EditPracownikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPracownikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPracownikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
