import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  usuarioLogado: any;
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

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.apiService.getProdutos().subscribe((produtos: Produto[]) => {
      if (this.usuarioLogado.tipo === 'lojista') {
        this.produtos = produtos.filter((p: Produto) =>
          String(p.lojistaId) === String(this.usuarioLogado.id)
        );
      } else {
        this.produtos = produtos;
      }
      this.cdr.detectChanges();
    });
  }

  adicionarProduto(): void {
    this.novoProduto.lojistaId = this.usuarioLogado.id;
    this.apiService.addProduto(this.novoProduto).subscribe({
      next: (produtoAdicionado) => {
        this.produtos.push(produtoAdicionado);
        this.novoProduto = {
          nome: '',
          preco: 0,
          estoque: 0,
          categoria: '',
          imagem: '',
          descricao: ''
        };
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao adicionar produto:', erro);
      }
    });
  }

  removerProduto(id: string): void {
    this.apiService.deleteProduto(id).subscribe({
      next: () => {
        this.produtos = this.produtos.filter(produto => produto.id !== id);
        this.cdr.detectChanges();
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  salvarProduto(): void {
    if (this.editando && this.produtoEditandoId) {
      this.apiService.updateProduto(this.produtoEditandoId, this.novoProduto).subscribe({
        next: (produtoAtualizado) => {
          this.produtos = this.produtos.map(produto =>
            produto.id === this.produtoEditandoId ? produtoAtualizado : produto
          );
          this.resetarFormulario();
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao atualizar produto:', erro);
        }
      });
    } else {
      this.apiService.addProduto(this.novoProduto).subscribe({
        next: (produtoAdicionado) => {
          this.produtos.push(produtoAdicionado);
          this.resetarFormulario();
          this.cdr.detectChanges();
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