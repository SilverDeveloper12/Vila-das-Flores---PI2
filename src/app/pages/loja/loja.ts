import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Produto } from '../../models/models';

@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loja.html',
  styleUrl: './loja.css'
})
export class LojaComponent implements OnInit {
  produtos: Produto[] = [];
  carregando = true;

  constructor(
  private apiService: ApiService,
  private cd: ChangeDetectorRef
) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.carregando = true;

    this.apiService.getProdutos().subscribe({
      next: (produtos: Produto[]) => {
        this.produtos = produtos;
        this.carregando = false;
        this.cd.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        this.carregando = false;
      }
    });
  }

  comprar(produto: Produto) {
    alert(`Obrigado pela compra de ${produto.nome}!`);
  }
}