import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente';
import { CadastroLojistaComponent } from './pages/cadastro-lojista/cadastro-lojista';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contatos', component: ContatosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastro-cliente', component: CadastroClienteComponent},
  {path: 'cadastro-lojista',component: CadastroLojistaComponent}
];