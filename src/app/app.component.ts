import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage-service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  loggedin = false;
  constructor(private router:Router, private token:TokenStorageService){
      router.events.subscribe((val) => {
        if(token.getTokenString())
        this.loggedin=true;
    });
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
    this.loggedin = false;
  }
}
