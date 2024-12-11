import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/User/user.service';
import { User } from '../../../../models/Users/UserModel';
@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export  class UsersTableComponent {
  @Input() headers: string[] = [];
  @Input() users: User[] = [];
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  editUser(id: number): void {
    this.edit.emit(id);
  }
  deleteUser(id: number): void {
    this.delete.emit(id);
  }
}
