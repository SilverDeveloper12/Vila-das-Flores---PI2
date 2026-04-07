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

  editando = false;
  produtoEditandoId: string | null = null;

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
  removerProduto(id: string): void {
  this.api.deleteProduto(id).subscribe({
    next: () => {
      this.produtos = this.produtos.filter(produto => produto.id !== id);
      console.log('Produto removido com sucesso');
    },
    error: (erro) => {
      console.error('Erro ao remover produto:', erro);
    }
  });
  }
  editarProduto(produto: Produto): void {
    this.novoProduto = { ...produto };
    this.editando = true;
    this.produtoEditandoId = produto.id!;
  }
  salvarProduto(): void {
  if (this.editando && this.produtoEditandoId) {
    this.api.updateProduto(this.produtoEditandoId, this.novoProduto).subscribe({
      next: (produtoAtualizado) => {
        this.produtos = this.produtos.map(produto =>
          produto.id === this.produtoEditandoId ? produtoAtualizado : produto
        );

        console.log('Produto atualizado:', produtoAtualizado);
        this.resetarFormulario();
      },
      error: (erro) => {
        console.error('Erro ao atualizar produto:', erro);
      }
    });
  } else {
    this.api.addProduto(this.novoProduto).subscribe({
      next: (produtoAdicionado) => {
        this.produtos.push(produtoAdicionado);
        console.log('Produto adicionado:', produtoAdicionado);
        this.resetarFormulario();
      },
      error: (erro) => {
        console.error('Erro ao adicionar produto:', erro);
      }
    });
  }
}
resetarFormulario(): void {
  this.novoProduto = {
    nome: '',
    preco: 0,
    estoque: 0,
    categoria: '',
    imagem: '',
    descricao: ''
  };

  this.editando = false;
  this.produtoEditandoId = null;
}
}