import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../../core/services/User/user.service';
import { UpdateUserRole, User, UserDetails } from '../../../../../models/Users/UserModel';
import { FormsModule } from '@angular/forms';
import { UserDetailsModalComponent } from '../user-details-modal/user-details-modal.component';
@Component({
  selector: 'app-user-detail-table',
  standalone: true,
  imports: [FormsModule, UserDetailsModalComponent, UserDetailsModalComponent],
  templateUrl: './user-detail-table.component.html',
})
export class UserDetailTableComponent implements OnChanges {
    @Input() headers: string[] = [];
    @Input() users: UserDetails[] = [];
    @Output() edit = new EventEmitter<UserDetails>();
    @Output() delete = new EventEmitter<number>();
    search: string= '';
    filteredUsers: UserDetails[] = [];
    editUserModalIsOpen: boolean = false;
    selected_User: UserDetails = {} as UserDetails;
    constructor(private userService: UserService, private router: Router) {}
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
        this.filteredUsers = this.users.filter(user=>user.user_name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
      }
    }
    openEditUserModal(user:UserDetails): void {
      this.selected_User = user;
      this.editUserModalIsOpen = true;
    }
    closeEditUserModal(): void {
      this.editUserModalIsOpen = false;
      this.selected_User = {} as UserDetails;
    }
    deleteUser(id: number): void {
      this.delete.emit(id);
    }
    changeUserRole(user_id:number,user_role:string | null){
      const user:  UpdateUserRole = {
        user_id: user_id,
        role: user_role
      }
      console.log(user_role);
      this.userService.updateUserRole(user).subscribe({
        next: (res) => {
          console.log("Response: ",res);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
}
