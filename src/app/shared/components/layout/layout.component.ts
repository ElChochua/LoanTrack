import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html'
})
export default class  LayoutComponent {
  
}
