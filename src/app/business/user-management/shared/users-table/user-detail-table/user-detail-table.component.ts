import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../../core/services/User/user.service';
import { User, UserDetails } from '../../../../../models/Users/UserModel';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-detail-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-detail-table.component.html',
  styleUrl: './user-detail-table.component.css'
})
export class UserDetailTableComponent implements OnChanges {
    @Input() headers: string[] = [];
    @Input() users: UserDetails[] = [];
    @Output() edit = new EventEmitter<UserDetails>();
    @Output() delete = new EventEmitter<number>();
    search: string= '';
    filteredUsers: UserDetails[] = [];
    ngOnChanges(changes: SimpleChanges): void {
      if(changes['users']){
        this.filteredUsers = this.users;
      }
    }
    searchUser():void{
      if(!this.search){
        this.filteredUsers = this.users;
        return;
      }else{
        const search = this.search.toLocaleLowerCase();
        this.filteredUsers = this.users.filter(user=>user.user.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
      }
    }
    editUser(user: UserDetails): void {
      this.edit.emit(user);
    }
    deleteUser(id: number): void {
      this.delete.emit(id);
    }
}
