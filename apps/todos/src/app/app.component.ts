import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from './models/ITodo';

@Component({
  selector: 'angular-nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todos';
  todos$!: Observable<ITodo[]>;
  todo!: ITodo;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {

    this.todos$ = this.fetch$();
  }

  fetch$ = () => this.http.get<ITodo[]>(this.baseUrl + '/Todo')

  getTodo(id: string): void {
    if (!id || !+id || +id < 0)
      return;

    this.http.get<ITodo>(this.baseUrl + `/Todo/${id}`).subscribe(todo => this.todo = todo);
  }
}
