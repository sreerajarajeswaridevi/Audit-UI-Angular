import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Subject } from 'rxjs';

@Injectable()
export class PwaService {
  public promptEvent = new Event('beforeinstallprompt') as any;

  private $askUserToUpdate = new Subject<boolean>();
  public askUserToUpdate = this.$askUserToUpdate.asObservable();

  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe((event: any) => {
      this.$askUserToUpdate.next(event);
    });
    
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }

  updateSoftware() {
    window.location.reload();
  }
}