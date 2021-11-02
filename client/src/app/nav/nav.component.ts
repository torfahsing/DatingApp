import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private accountService: AccountService, 
    private router: Router, private toastr: ToastrService) { }
    
  loggedInUser$!: Observable<User | null>;

  ngOnInit(): void {
    this.loggedInUser$ = this.accountService.currentUser$;
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User | null = localStorage.getItem('user') ? 
      JSON.parse(localStorage.getItem('user') || '{}') : null;


    this.accountService.setCurrentUser(user);
  }

  login() {
    this.accountService.login(this.model)
      .subscribe(_ => {
        this.router.navigateByUrl('/members');
      }, err => {
        this.toastr.error(err.error);
      })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
