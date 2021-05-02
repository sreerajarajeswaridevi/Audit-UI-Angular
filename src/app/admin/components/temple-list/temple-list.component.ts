import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-temple-list',
  templateUrl: './temple-list.component.html',
  styleUrls: ['./temple-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TempleListComponent implements OnInit {
  temples = [];
  newTemple: FormGroup;
  loadingAddTemple = false;

  constructor(private admimService: AdminService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { 
   this.initFormGroup();
  }

  initFormGroup() {
    this.newTemple = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      code:  new FormControl('', Validators.required),
      address:  new FormControl('', Validators.required),
    });   
    this.newTemple.reset();
  }

  ngOnInit() {
    this.getTempleList();
  }

  getTempleList() {
    this.admimService.getTempleList().subscribe((list: any) => {
      if (list && list.data) {
        this.temples = list.data;
        this.cdr.detectChanges();
      }
    },
    () => { this.toastr.error('Error adding temple. Please try later')})
  }


  onAddTemple() {
    this.loadingAddTemple = true;
    this.admimService.addTemple({
      "name": "morpheus",
      "job": "leader"
    }).subscribe(() => {
      this.loadingAddTemple = false;
      this.getTempleList();
      this.initFormGroup();
    },
    () => { 
      this.loadingAddTemple = false;
      this.toastr.error('Error adding temple. Please try later');
    })
  }

}
