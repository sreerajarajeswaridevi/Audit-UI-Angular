import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.router);
    this.router.navigateByUrl('admin-panel'); // for dev purpose only so that current working page loads first
  }

}
