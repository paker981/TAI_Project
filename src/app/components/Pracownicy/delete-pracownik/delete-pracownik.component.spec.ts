import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePracownikComponent } from './delete-pracownik.component';

describe('DeletePracownikComponent', () => {
  let component: DeletePracownikComponent;
  let fixture: ComponentFixture<DeletePracownikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePracownikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePracownikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
