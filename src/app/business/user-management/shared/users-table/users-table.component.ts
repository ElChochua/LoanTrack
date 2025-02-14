import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/User/user.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User, UpdateUserRole } from '../../../../models/Users/UserModel';
@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users-table.component.html',
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
