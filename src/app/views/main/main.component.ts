import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Kanban } from 'src/app/models/kanban.model';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // variaveis
  Kanbans: Kanban[];
  selectedTodo: Kanban;
  createMode = false;
  editMode = false;
  todo = [];
  doing = [];
  done = [];

  //iniciando o service do kanban
  constructor(private kanbanService: KanbanService) { }

  // funcoes que executam no inicio do componente
  ngOnInit(): void {
    this.list()
  }

  // criando nova tarefa
  newTodo(){
    this.createMode = true;
    this.editMode = false;
    this.selectedTodo = new Kanban();
  }

  // alternatando modo de edicao/criacao
  changeMode(mode: string){
    switch (mode) {
      case 'edit':
        this.editMode = !this.editMode;
        break;

      case 'create':
        this.createMode = !this.createMode;
        break;
    }
  }

  // resetando selectedsTodos
  resetSelectedTodo(){
    this.selectedTodo.name = null
    this.selectedTodo.Kanban = null
  }

  // listagem
  list(){
    this.kanbanService.listTodo().subscribe(Kanbans => {
      this.Kanbans = Kanbans;
      this.todo = Kanbans.filter(i => i.Kanban === 'To Do');
      this.doing = Kanbans.filter(i => i.Kanban === 'Doing');
      this.done = Kanbans.filter(i => i.Kanban === 'Done');
    });
  }

  // seleciona Kanban
  selected(Kanban: Kanban){
    this.editMode = true;
    this.createMode = false;
    this.selectedTodo = Kanban;
  }

  // remove Kanban
  remove(id: string){
    this.kanbanService.deleteTodo(id).subscribe(() => {
      this.list();
      alert('Removido com sucesso');
    });
  }

  //Funcao para salvar as alterções
  save(){
  
    if(this.createMode){
      if(this.selectedTodo.name == null || this.selectedTodo.Kanban == null){
        alert('Favor preencher todos os campos!');
      } else {
        
        this.kanbanService.addTodo(this.selectedTodo).subscribe(() => {
          this.list();
          this.createMode = false;
          alert('Tarefa adicionada!');
          this.resetSelectedTodo()
        })
      }
    } else {
      this.kanbanService.updateTodo(this.selectedTodo).subscribe(() => {
        this.list();
        this.editMode = false;
        alert('Tarefa atualizada!');
        this.resetSelectedTodo()
      })
    }
  }

  // manipulando o drag and drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}
