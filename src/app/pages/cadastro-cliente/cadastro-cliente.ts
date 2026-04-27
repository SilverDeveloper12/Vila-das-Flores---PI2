import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../models/models';

@Component({
  selector: 'app-cadastro-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css'
})
export class CadastroClienteComponent {

  novoUsuario: Usuario = {
    tipo: 'cliente',
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    endereco: ''
  };

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  cadastrar() {
    this.apiService.createUsuario(this.novoUsuario).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Erro ao cadastrar usuário.');
      }
    });
  }
}