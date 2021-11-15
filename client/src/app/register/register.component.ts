import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    @Input() test!: () => void;
    @Output() cancelRegister = new EventEmitter();
    model: any = {};

    constructor(private accountService: AccountService, 
        private router: Router,
        private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    register() {
        this.accountService.register(this.model).subscribe(
            resp => { console.log(resp); this.router.navigateByUrl('/members')},
            error => this.toastr.error(error.error)
            );
    }

    cancel() {
        this.cancelRegister.emit();
    }

}
