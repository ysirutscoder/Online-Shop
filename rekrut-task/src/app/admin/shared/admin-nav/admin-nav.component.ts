import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
  }
  logout(ev) {
    ev.preventDefault();
    this.auth.logout();
    this.route.navigate(['/admin', 'login']);
  }
  isAuth() {
    return this.auth.isAuth();
  }

}
