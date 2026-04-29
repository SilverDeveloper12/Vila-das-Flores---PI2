import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaComponent } from './loja';

describe('Loja', () => {
  let component: LojaComponent;
  let fixture: ComponentFixture<LojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LojaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LojaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
