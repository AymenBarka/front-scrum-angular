import { Router } from '@angular/router';
import { TokenStorageService } from './../../../services/token-storage.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }


  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
signOut(){
this.tokenStorage.signOut();
this.router.navigate(['/']);
}
}
