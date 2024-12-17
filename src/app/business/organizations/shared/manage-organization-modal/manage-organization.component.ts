import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { OrganizationMembers } from '../../../../models/Organizations/OrganizationModel';
import { OrganizationsService } from '../../../../core/services/organizations-service/organizations.service';
import { UserDetails } from '../../../../models/Users/UserModel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Toast } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-organization-members-modal',
  templateUrl: './manage-organization.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
})
export class OrganizationMembersModalComponent implements OnInit{
  @Input() organizationId: number = 0;
  @Input() organizationName: string | null = null;
  @Output() closeModal = new EventEmitter<void>();
  members: UserDetails[] = [];
  searchTerm: string = '';
  newMemberSearchTerm: string = '';
  user_role: string | null = null;
    potentialMembers: UserDetails[] = [];
    constructor (private organizationService: OrganizationsService, private authService: AuthService) {}
  filteredMembers: UserDetails[] = [];
    ngOnInit() {
        this.loadMembers();
    }
    loadMembers(){
        this.user_role = this.authService.getRole();
        if(this.organizationId){
            this.organizationService.getOrganizationMembers(this.organizationId).subscribe({
                next: (members) => {
                    this.members = members;
                },
                error: (err) => {
                    console.error(err);
                }
            });
            this.organizationService.getAllOutOfOrganizationUsers(this.organizationId).subscribe({
                next: (members) => {
                    this.potentialMembers = members;
                },
                error: (err) => {
                    console.error(err);
                }
            });
        }
    }
  searchPotentialMembers():void {
    if(!this.newMemberSearchTerm){
        this.potentialMembers = this.members;
        return;
    }else{
        const search = this.newMemberSearchTerm.toLocaleLowerCase();
        this.potentialMembers = this.members.filter((member) => {
            return member.user_name.toLowerCase().includes(search)|| member.email.toLowerCase().includes(search) ;
        });
    }
  }



  onClose() {
    this.closeModal.emit();
  }

  updateMemberRole(member:number, role:string) {
    let organizationMember: OrganizationMembers = {
        organization_ID: this.organizationId,
        user_ID: member,
        role: role
    };
    this.organizationService.updateMemberRole(organizationMember).subscribe({
        next: (member) => {
            this.loadMembers();
        },
        error: (err) => {
            console.error(err);
        }
    });

  }

  removeMember(memberId:number) {
    this.organizationService.deleteUserFromOrganization(memberId, this.organizationId).subscribe({
        next: (response) => {
            this.loadMembers();
        },
        error: (err) => {
            console.error(err);
        }
    });

  }

  addMember(userId:number) {
    
  }
}