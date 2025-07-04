import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { Produto } from '../model/produto.model';

@Component({
  selector: 'app-produto-detalhar',
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    PanelModule
  ],
  templateUrl: './produto-detalhar.component.html',
  styleUrl: './produto-detalhar.component.css'
})
export class ProdutoDetalharComponent {
  @Input() visible: boolean = false;
  @Input() produto: Produto = { nome: '', preco: 0, disponivel: false };
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() fechar = new EventEmitter<void>();

  onVisibleChange(visible: boolean) {
    this.visible = visible;
    this.visibleChange.emit(visible);
  }

  onFechar() {
    this.fechar.emit();
    this.onVisibleChange(false);
  }
}
