import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLojista } from './cadastro-lojista';

describe('CadastroLojista', () => {
  let component: CadastroLojista;
  let fixture: ComponentFixture<CadastroLojista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroLojista],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroLojista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
