import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoInserirComponent } from './produto-inserir.component';

describe('ProdutoInserirComponent', () => {
  let component: ProdutoInserirComponent;
  let fixture: ComponentFixture<ProdutoInserirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoInserirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoInserirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
