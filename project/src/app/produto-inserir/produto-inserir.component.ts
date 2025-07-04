import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { Produto } from '../model/produto.model';

@Component({
  selector: 'app-produto-inserir',
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    ButtonModule
  ],
  templateUrl: './produto-inserir.component.html',
  styleUrl: './produto-inserir.component.css'
})
export class ProdutoInserirComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() produtoSalvo = new EventEmitter<Produto>();
  @Output() cancelar = new EventEmitter<void>();

  produto: Produto = { nome: '', preco: 0, disponivel: false };
  submitted: boolean = false;

  ngOnInit() {
    this.resetForm();
  }

  onVisibleChange(visible: boolean) {
    this.visible = visible;
    this.visibleChange.emit(visible);
    if (!visible) {
      this.resetForm();
    }
  }

  onSalvar() {
    this.submitted = true;

    if (this.produto.nome?.trim() && this.produto.preco > 0) {
      this.produtoSalvo.emit({ ...this.produto });
      this.onVisibleChange(false);
    }
  }

  onCancelar() {
    this.cancelar.emit();
    this.onVisibleChange(false);
  }

  private resetForm() {
    this.produto = { nome: '', preco: 0, disponivel: false };
    this.submitted = false;
  }
}
