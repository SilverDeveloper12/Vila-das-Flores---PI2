import { Component } from '@angular/core';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vila-Das-Flores';
}