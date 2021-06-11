/**
 * The main component that renders single TabComponent
 * instances.
 */

 import {
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit,
  } from '@angular/core';
  
  import { TabComponent } from './tab.component';
  
  @Component({
    selector: 'rr-tabs',
    template: `
      <ul class="nav nav-tabs navbar-nav d-flex flex-row">
        <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.nav-item]="true">
          <a [class]="'nav-link waves-light'" [class.active]="tab.active">{{tab.title}}</a>
        </li>
      </ul>
      <ng-content></ng-content>
    `,
    styleUrls: ['./tab.component.scss']
  })
  export class TabsComponent implements AfterContentInit {
    
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
    
    // contentChildren are set
    ngAfterContentInit() {
      // get all active tabs
      let activeTabs = this.tabs.filter((tab)=>tab.active);
      
      // if there is no active tab set, activate the first
      if(activeTabs.length === 0) {
        this.selectTab(this.tabs.first);
      }
    }
    
    selectTab(tab: any){
      // deactivate all tabs
      this.tabs.toArray().forEach(tab => tab.active = false);
      
      // activate the tab the user has clicked on.
      tab.active = true;
    }
  }
  