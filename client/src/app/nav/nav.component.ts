import { Component, OnInit } from '@angular/core';
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
  loggedIn = false;
  constructor(private accountService: AccountService) { }

  loggedIn$!: Observable<boolean>;

  ngOnInit(): void {
    this.loggedIn$ = this.accountService.currentUserSource$
      .pipe(
        map(user => user != null)
      );
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User | null = localStorage.getItem('user') ? 
      JSON.parse(localStorage.getItem('user') || '{}') : null;


    this.accountService.setCurrentUser(user);
  }

  login() {
    this.accountService.login(this.model)
      .subscribe(response => {
        console.log(response);
        this.loggedIn = true;
      }, err => {
        console.log(err);
      })
  }

  logout() {
    this.accountService.logout();
  }

}
