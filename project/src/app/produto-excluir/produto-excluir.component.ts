import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Produto } from '../model/produto.model';

@Component({
  selector: 'app-produto-excluir',
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './produto-excluir.component.html',
  styleUrl: './produto-excluir.component.css'
})
export class ProdutoExcluirComponent {
  @Input() visible: boolean = false;
  @Input() produto: Produto = { nome: '', preco: 0, disponivel: false };
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() produtoExcluido = new EventEmitter<Produto>();
  @Output() cancelar = new EventEmitter<void>();

  onVisibleChange(visible: boolean) {
    this.visible = visible;
    this.visibleChange.emit(visible);
  }

  onConfirmar() {
    this.produtoExcluido.emit(this.produto);
    this.onVisibleChange(false);
  }

  onCancelar() {
    this.cancelar.emit();
    this.onVisibleChange(false);
  }
}
