import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [ MatCardModule, MatIconModule, MatChipsModule, MatToolbarModule, CardModule, ButtonModule],
  templateUrl: './organizations.component.html',
})
export default class OrganizationsComponent {

}
