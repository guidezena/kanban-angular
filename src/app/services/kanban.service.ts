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
  listTodo(): Observable<Kanban[]>{
    return this.http.get<Kanban[]>('https://crudcrud.com/api/264b71551b8743379dda2dc1de39a30f/kanbans/');
  }

  // funcao para adicionar novos Kanban
  addTodo(Kanban: Kanban): Observable<Kanban>{
    return this.http.post<Kanban>('https://crudcrud.com/api/264b71551b8743379dda2dc1de39a30f/kanbans/', Kanban);
  }

  //comando put chamado para atualizar o ID e o ''PRODUTO''
  updateTodo(Kanban: Kanban): Observable<any>{
    const id = Kanban._id;
    delete Kanban._id;
                                                                                            
    return this.http.put('https://crudcrud.com/api/264b71551b8743379dda2dc1de39a30f/kanbans/' + id, Kanban);
  }

  // funcao para deletar o kanban
  deleteTodo(id: string): Observable<any> {
    return this.http.delete('https://crudcrud.com/api/264b71551b8743379dda2dc1de39a30f/kanbans/' + id);
  }
}
