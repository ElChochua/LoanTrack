import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";


@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export default class LandingpageComponent {

}
