import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChange, SimpleChanges, DestroyRef } from '@angular/core';
import { AddUserToOrganizationMemberDto, OrganizationMembers } from '../../../../models/Organizations/OrganizationModel';
import { OrganizationsService } from '../../../../core/services/organizations-service/organizations.service';
import { UserDetails } from '../../../../models/Users/UserModel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Toast } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-organization-members-modal',
  templateUrl: './manage-organization.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
})
export class OrganizationMembersModalComponent implements OnInit{
  @Input() organizationId: number = 0;
  @Output() closeModal = new EventEmitter<void>();
  members: OrganizationMembers[] = [];
  potentialMembers: OrganizationMembers[] = [];

  searchTerm: string = '';
  newMemberSearchTerm: string = '';

  user_role: string | null = null;
    constructor (private organizationService: OrganizationsService, private authService: AuthService, private toast: ToastService) {}
  filteredMembers: OrganizationMembers[] = [];
  filteredPotentialMembers: OrganizationMembers[] = [];
    ngOnInit() {
        this.loadMembers();
    }

    loadMembers() {
        this.user_role = this.authService.getRole();
        if (this.organizationId) {
            this.organizationService.getOrganizationMembers(this.organizationId).subscribe({
                next: (members) => {
                    this.members = []; // Limpiar lista antes de asignar
                    this.filteredMembers = []; // Limpiar lista antes de asignar
                    this.filteredMembers = members;
                    console.log("Aqui se cargan miembros de la org",members);
                },
                error: (err) => {
                    console.error(err);
                }
            });
    
            this.organizationService.getAllOutOfOrganizationUsers(this.organizationId).subscribe({
                next: (members) => {
                    this.potentialMembers = []; // Limpiar lista antes de asignar
                    this.filteredPotentialMembers = []; // Limpiar lista antes de asignar
                    this.potentialMembers = members;
                    this.filteredPotentialMembers = members;
                    console.log("Aqui se cargan miembros potenciales",members);
                },
                error: (err) => {
                    console.error(err);
                }
            });
        }
    }
    
    searchMembers(): void {
        if(!this.searchTerm){
            this.filteredMembers = this.members;
            return;
        }else{
            const search = this.searchTerm.toLocaleLowerCase();
            this.filteredMembers = this.members.filter((member)=>{
                 return member.name.toLowerCase().includes(search);  
            })
        }
    }
    searchPotentialMembers():void {
    if(!this.newMemberSearchTerm){
        this.filteredPotentialMembers = this.potentialMembers;
        return;
    }else{
        const search = this.newMemberSearchTerm.toLocaleLowerCase();
        this.filteredPotentialMembers = this.potentialMembers.filter((member) => {
             return member.name.toLowerCase().includes(search);
        });
    }
  }



  onClose() {
    this.closeModal.emit();
    this.members = []; // Limpiar lista antes de asignar
    this.filteredMembers = []; // Limpiar lista antes de asignar
    this.potentialMembers = []; // Limpiar lista antes de asignar
    this.filteredPotentialMembers = []; // Limpiar lista antes
  }

  updateMemberRole(member:OrganizationMembers, role:string) {
    member.role = role;
    this.organizationService.updateMemberRole(member).subscribe({
        next: (response) => {
            
            this.toast.success('Rol Actualizado Correctamente');
        },
        error: (err) => {
            this.toast.error('Error al actualizar rol');
        }
    });

  }

  removeMember(memberId:number) {
    console.log(memberId, this.organizationId);
    this.organizationService.deleteUserFromOrganization(this.organizationId, memberId).subscribe({
        next: (response) => {
            this.loadMembers();
            this.toast.success('Usuario Eliminado Correctamente');
        },
        error: (err) => {
            this.toast.error('Error al eliminar usuario');
        }
    });

  }

  addMember(user_id:number) {
    const addOrganizationDto={
        user_id: user_id,
        organization_id: this.organizationId,
        role: 'member'
    } as AddUserToOrganizationMemberDto;
    console.log(addOrganizationDto.user_id);
    this.organizationService.addUserToOrganization(addOrganizationDto).subscribe({
        next: (response) => {
            this.loadMembers();
            this.toast.success('Usuario Agregado Correctamente');
        },
        error: (err) => {
            console.error(err);
            console.log(err);
            this.toast.error('Error al agregar usuario');
        }
    });
  }
}