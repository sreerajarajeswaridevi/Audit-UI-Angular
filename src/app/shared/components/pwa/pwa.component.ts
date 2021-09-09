import { Component, OnInit } from '@angular/core';
import { PwaService } from '../../services/pwa-service.service';

@Component({
  selector: 'app-pwa',
  templateUrl: './pwa.component.html',
  styleUrls: ['./pwa.component.scss']
})
export class PwaComponent implements OnInit {

  showUpdateButton = false;

  constructor(public Pwa: PwaService) {}

  ngOnInit(): void {
    this.Pwa.askUserToUpdate.subscribe(() => {
      this.showUpdateButton = true;
    })
  }

  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }

  updateSoftware() {
    this.Pwa.updateSoftware();
  }

}
