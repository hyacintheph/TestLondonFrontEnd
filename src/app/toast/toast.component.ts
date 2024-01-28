import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Input() message: string;
  @Output() closeToast: EventEmitter<boolean>;
  constructor() {
    this.closeToast = new EventEmitter<boolean>();
  }

  ngOnInit() {
  }

  close() {
    this.closeToast.emit(false);
  }
}
