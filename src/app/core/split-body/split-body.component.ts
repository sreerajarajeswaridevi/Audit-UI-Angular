import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-split-body',
  templateUrl: './split-body.component.html',
  styleUrls: ['./split-body.component.scss']
})
export class SplitBodyComponent implements OnInit {

  @Input() isLoading$: Observable<boolean>;

  isLoading = false;

  constructor() {
  }
  
  ngOnInit(): void {
    if (this.isLoading$) {
      this.isLoading$.subscribe(loading => this.isLoading = loading);
    }
  }

}
