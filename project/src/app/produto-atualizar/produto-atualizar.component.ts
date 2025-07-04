import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { Produto } from '../model/produto.model';

@Component({
  selector: 'app-produto-atualizar',
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    ButtonModule
  ],
  templateUrl: './produto-atualizar.component.html',
  styleUrl: './produto-atualizar.component.css'
})
export class ProdutoAtualizarComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() produto: Produto = { nome: '', preco: 0, disponivel: false };
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() produtoAtualizado = new EventEmitter<Produto>();
  @Output() cancelar = new EventEmitter<void>();

  produtoEditavel: Produto = { nome: '', preco: 0, disponivel: false };
  submitted: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['produto'] && this.produto) {
      this.produtoEditavel = { ...this.produto };
    }
  }

  onVisibleChange(visible: boolean) {
    this.visible = visible;
    this.visibleChange.emit(visible);
    if (!visible) {
      this.submitted = false;
    }
  }

  onSalvar() {
    this.submitted = true;

    if (this.produtoEditavel.nome?.trim() && this.produtoEditavel.preco > 0) {
      this.produtoAtualizado.emit({ ...this.produtoEditavel });
      this.onVisibleChange(false);
    }
  }

  onCancelar() {
    this.cancelar.emit();
    this.onVisibleChange(false);
  }
}
