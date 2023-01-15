import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracownicyListaComponent } from './pracownicy-lista.component';

describe('PracownicyListaComponent', () => {
  let component: PracownicyListaComponent;
  let fixture: ComponentFixture<PracownicyListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracownicyListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracownicyListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
