import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kanban } from '../models/kanban.model';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  // SERVIÇOS REST - ESTRUTURA BASICA DE CHAMADAS

  constructor(private http: HttpClient) { }

  // utilização do httpCliente e funcao para listagem dos elementos do Kanban

  list(): Observable<Kanban[]> {
    return this.http.get<Kanban[]>('https://crudcrud.com/api/69433062bc4c4e28a0f7d990cafc90d6/kanbans/');
  }

  // funcao para adicionar novos Kanban
  add(Kanban: Kanban): Observable<Kanban> {
    return this.http.post<Kanban>('https://crudcrud.com/api/69433062bc4c4e28a0f7d990cafc90d6/kanbans/', Kanban);
  }

  //comando put chamado para atualizar o ID e o ''PRODUTO''
  update(Kanban: Kanban): Observable<any> {
    const id = Kanban._id;
    delete Kanban._id;

    return this.http.put('https://crudcrud.com/api/69433062bc4c4e28a0f7d990cafc90d6/kanbans/' + id, Kanban);
  }

  // funcao para deletar o kanban
  delete(id: string): Observable<any> {
    return this.http.delete('https://crudcrud.com/api/69433062bc4c4e28a0f7d990cafc90d6/kanbans/' + id);
  }
}
