import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { Produto, Usuario } from '../../models/models';

@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loja.html',
  styleUrl: './loja.css'
})
export class LojaComponent implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  usuarios: Usuario[] = [];

  carregando = true;
  pesquisa = '';

  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.carregando = true;

    forkJoin({
      produtos: this.apiService.getProdutos(),
      usuarios: this.apiService.getUsuarios()
    }).subscribe({
      next: ({ produtos, usuarios }) => {
        this.produtos = produtos;
        this.produtosFiltrados = produtos;
        this.usuarios = usuarios;

        this.carregando = false;
        this.cd.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar dados:', erro);
        this.carregando = false;
      }
    });
  }

  filtrarProdutos() {
    const termo = this.pesquisa.toLowerCase();

    this.produtosFiltrados = this.produtos.filter(produto =>
      produto.nome.toLowerCase().includes(termo) ||
      produto.categoria.toLowerCase().includes(termo) ||
      produto.descricao.toLowerCase().includes(termo)
    );
  }

  getNomeLojista(id: string | undefined): string {
    const lojista = this.usuarios.find(usuario => usuario.id === id);

    return lojista?.nomeLoja || 'Lojista não encontrado';
  }

  comprar(produto: Produto) {
    alert(`Obrigado pela compra de ${produto.nome}!`);
  }
}