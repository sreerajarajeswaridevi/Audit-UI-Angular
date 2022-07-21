import { Component, OnInit } from "@angular/core";
import { MDBModalRef, MDBModalService } from "angular-bootstrap-md";
import { take } from "rxjs/operators";
import { ConfirmModalComponent } from "src/app/shared/components/confirm-modal/confirm-modal.component";

@Component({
  selector: "app-account-head",
  templateUrl: "./account-head.component.html",
  styleUrls: ["./account-head.component.scss"],
})
export class AccountHeadComponent implements OnInit {
  isLoading = false;
  newAccountType = '';
  private modalRef: MDBModalRef;
  

  modalConfig = {
    class: 'modal-dialog-centered',
  };

  constructor(private modalService: MDBModalService) {}

  ngOnInit(): void {
  }

  openUserDeleteConfirmModal() {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          // delete service here
        }
      });
  }

  onDeleteAccountType() {

    this.openUserDeleteConfirmModal();
  }
}
