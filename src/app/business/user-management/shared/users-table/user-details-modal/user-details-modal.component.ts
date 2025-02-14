import { Component, EventEmitter, Input, Output, ComponentDecorator} from "@angular/core";
import { UserDetails } from "../../../../../models/Users/UserModel";

@Component({
    selector: "app-user-details-modal",
    standalone: true,
    templateUrl: "./user-details-modal.component.html",
    imports: [],
})
export class UserDetailsModalComponent {
    @Input() user: UserDetails = {} as UserDetails;
    @Output() closeModal = new EventEmitter<void>();
    constructor() {
    }
    onClose():void {
        this.closeModal.emit();
    }
}