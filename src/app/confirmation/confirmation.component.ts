import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  statusChangeEvent = new EventEmitter()
  details!: { message: string }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  ngOnInit(): void {
    this.details = this.data ?? null
  }

  onChangeStatus() {
    this.statusChangeEvent.emit()
  }

}
