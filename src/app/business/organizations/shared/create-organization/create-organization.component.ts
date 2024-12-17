import { Component, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../../../../core/services/auth/auth.service";
import { OrganizationsService } from "../../../../core/services/organizations-service/organizations.service";
import { OrganizationModel, OrganizationRegisterModel } from "../../../../models/Organizations/OrganizationModel";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: "app-create-organization",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./create-organziation.component.html",
})
export  class CreateOrganizationComponent {
    @Output() closeModal = new EventEmitter<void>();
    @Output() submitOrganization = new EventEmitter<OrganizationRegisterModel>();
    organizationForm: FormGroup;
    constructor(private authService:AuthService, private fb: FormBuilder) {
        this.organizationForm = this.fb.group({
            organization_name: ['', Validators.required],
            description: ['', Validators.required],
            owner_id: this.authService.getUserId()
        });
    }
    onClose() {
        this.closeModal.emit();
    }
    onSubmit() {
        if (this.organizationForm.valid) {
            this.submitOrganization.emit(this.organizationForm.value);
            this.onClose();
        }
    }

}