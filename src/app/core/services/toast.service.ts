import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  success(message: string, title?: string) {
    console.log('success');
    this.toastr.success(message, title);
  }

  error(message: string, title?: string) {
    this.toastr.error(message, title);
  }

  warning(message: string, title?: string) {
    this.toastr.warning(message, title);
  }

  info(message: string, title?: string) {
    this.toastr.info(message, title);
  }


}
