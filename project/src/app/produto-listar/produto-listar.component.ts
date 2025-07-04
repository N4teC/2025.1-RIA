import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { Produto } from '../model/produto.model';

@Component({
  selector: 'app-produto-listar',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    TooltipModule
  ],
  templateUrl: './produto-listar.component.html',
  styleUrl: './produto-listar.component.css'
})
export class ProdutoListarComponent {
  @Input() produtos: Produto[] = [];
  
  @Output() novoProduto = new EventEmitter<void>();
  @Output() editarProduto = new EventEmitter<Produto>();
  @Output() excluirProduto = new EventEmitter<Produto>();
  @Output() detalharProduto = new EventEmitter<Produto>();

  onNovoProduto() {
    this.novoProduto.emit();
  }

  onEditarProduto(produto: Produto) {
    this.editarProduto.emit(produto);
  }

  onExcluirProduto(produto: Produto) {
    this.excluirProduto.emit(produto);
  }

  onDetalharProduto(produto: Produto) {
    this.detalharProduto.emit(produto);
  }
}
