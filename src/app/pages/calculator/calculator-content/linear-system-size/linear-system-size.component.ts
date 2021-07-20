import {Component, EventEmitter, Output} from '@angular/core';
import {LinearSystemSizeOutput} from "./linear-system-size-output";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-linear-system-size',
  templateUrl: './linear-system-size.component.html',
  styleUrls: ['./linear-system-size.component.css']
})
export class LinearSystemSize {

  @Output() dataChange = new EventEmitter<LinearSystemSizeOutput | null>()


  editable = true

  numberOfVars = 0
  numberOfConstraints = 0


  emitValues() {
    this.dataChange.emit({
      numberOfVars: this.numberOfVars,
      numberOfConstraints: this.numberOfConstraints

    })
    this.editable = false

  }

  enableEditing() {
    this.dataChange.emit(null)

    this.editable = true
  }


  closeResult = '';

  constructor(private modalService: NgbModal) {
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }
}
