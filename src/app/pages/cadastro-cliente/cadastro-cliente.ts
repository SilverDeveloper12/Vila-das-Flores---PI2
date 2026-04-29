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
confirmarSenha: string = '';
 
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(this.novoUsuario.email)) {
    alert('Digite um e-mail válido.');
    return;
  }

  if (this.novoUsuario.senha.length < 8) {
    alert('A senha deve ter no mínimo 8 caracteres.');
    return;
  }

  if (this.novoUsuario.senha !== this.confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  if (!/^\d+$/.test(this.novoUsuario.telefone)) {
    alert('Telefone deve conter apenas números.');
    return;
  }

  if (this.novoUsuario.telefone.length > 11) {
    alert('Telefone deve ter no máximo 11 números.');
    return;
  }

  this.apiService.getUsuarios().subscribe((usuarios) => {

    const emailExiste = usuarios.some(
      (u: any) => u.email.toLowerCase() === this.novoUsuario.email.toLowerCase()
    );

    if (emailExiste) {
      alert('Este e-mail já está cadastrado.');
      return;
    }

    this.apiService.createUsuario(this.novoUsuario).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Erro ao cadastrar usuário.');
      }
    });

  });

 }
}