import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, Produto, Carrinho, Pedido, ItemPedido } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
private apiUrl = '/api';
constructor(private http: HttpClient) { }
// Métodos para Usuários
getUsuarios(): Observable<Usuario[]> {
return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
}
getUsuario(id: string): Observable<Usuario> {
  return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`);
}
login(email: string): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(
    `${this.apiUrl}/usuarios?email=${encodeURIComponent(email)}`
  );
}
createUsuario(usuario: Usuario): Observable<Usuario> {
return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario);
}
updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {
  return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${id}`, usuario);
}
deleteUsuario(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
}
// Métodos para Produtos
getProdutos(): Observable<Produto[]> {
return this.http.get<Produto[]>(`${this.apiUrl}/produtos`);
}
addProduto(produto: Produto) {
  return this.http.post<Produto>(`${this.apiUrl}/produtos`, produto);
}
deleteProduto(id: string) {
  return this.http.delete(`${this.apiUrl}/produtos/${id}`);
}
updateProduto(id: string, produto: Produto) {
  return this.http.put<Produto>(`${this.apiUrl}/produtos/${id}`, produto);
}
}