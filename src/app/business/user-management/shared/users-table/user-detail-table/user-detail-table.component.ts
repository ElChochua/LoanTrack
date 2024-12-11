import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../../core/services/User/user.service';
import { User, UserDetails } from '../../../../../models/Users/UserModel';
@Component({
  selector: 'app-user-detail-table',
  standalone: true,
  imports: [],
  templateUrl: './user-detail-table.component.html',
  styleUrl: './user-detail-table.component.css'
})
export class UserDetailTableComponent {
    @Input() headers: string[] = [];
    @Input() users: UserDetails[] = [];
    @Output() edit = new EventEmitter<number>();
    @Output() delete = new EventEmitter<number>();
  
    editUser(id: number): void {
      this.edit.emit(id);
    }
    deleteUser(id: number): void {
      this.delete.emit(id);
    }
}
