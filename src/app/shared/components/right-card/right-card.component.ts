import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-card',
  templateUrl: './right-card.component.html',
  styleUrls: ['./right-card.component.scss']
})
export class RightCardComponent implements OnInit {

  @Input() header: string;
  @Input() footer: string;

  constructor() { }

  ngOnInit(): void {
  }

}
