import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../models/models';

@Component({
  selector: 'app-cadastro-lojista',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-lojista.html',
  styleUrl: './cadastro-lojista.css'
})
export class CadastroLojistaComponent {

  novoUsuario: Usuario = {
    tipo: 'lojista',
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    endereco: '',
    nomeLoja: '',
    cnpj: ''
  };

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  cadastrar() {
    this.apiService.createUsuario(this.novoUsuario).subscribe({
      next: () => {
        alert('Lojista cadastrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Erro ao cadastrar lojista.');
      }
    });
  }
}