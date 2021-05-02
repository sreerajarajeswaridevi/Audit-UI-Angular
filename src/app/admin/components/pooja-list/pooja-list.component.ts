import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-pooja-list',
  templateUrl: './pooja-list.component.html',
  styleUrls: ['./pooja-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoojaListComponent implements OnInit {
  poojas = [];
  newPooja: FormGroup;
  loadingAddPooja = false;

  constructor(private admimService: AdminService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { 
   this.initFormGroup();
  }

  initFormGroup() {
    this.newPooja = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      code:  new FormControl('', Validators.required),
      address:  new FormControl('', Validators.required),
    });   
    this.newPooja.reset();
  }

  ngOnInit() {
    this.getPoojaList();
  }

  getPoojaList() {
    this.admimService.getPoojaList().subscribe((list: any) => {
      if (list && list.data) {
        this.poojas = list.data;
        this.cdr.detectChanges();
      }
    },
    () => { this.toastr.error('Error adding pooja. Please try later')})
  }


  onAddPooja() {
    this.loadingAddPooja = true;
    this.admimService.addPooja({
      "name": "morpheus",
      "job": "leader"
    }).subscribe(() => {
      this.loadingAddPooja = false;
      this.getPoojaList();
      this.initFormGroup();
    },
    () => { 
      this.loadingAddPooja = false;
      this.toastr.error('Error adding pooja. Please try later');
    })
  }

}
