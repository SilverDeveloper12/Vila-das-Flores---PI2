import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Produto } from '../../models/models';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];

  novoProduto: Produto = {
    nome: '',
    preco: 0,
    estoque: 0,
    categoria: '',
    imagem: '',
    descricao: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.api.getProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
        console.log('Produtos carregados:', dados);
      },
      error: (erro) => {
        console.error('Erro ao buscar produtos:', erro);
      }
    });
  }

  adicionarProduto(): void {
    this.api.addProduto(this.novoProduto).subscribe({
      next: (produtoAdicionado) => {
        this.produtos.push(produtoAdicionado);
        console.log('Produto adicionado:', produtoAdicionado);

        this.novoProduto = {
          nome: '',
          preco: 0,
          estoque: 0,
          categoria: '',
          imagem: '',
          descricao: ''
        };
      },
      error: (erro) => {
        console.error('Erro ao adicionar produto:', erro);
      }
    });
  }
}