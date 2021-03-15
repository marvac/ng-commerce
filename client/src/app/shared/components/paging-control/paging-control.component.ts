import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-paging-control',
  templateUrl: './paging-control.component.html',
  styleUrls: ['./paging-control.component.scss']
})
export class PagingControlComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageSize: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPageChanged(event: any){
    this.pageChanged.emit(event);
  }

}
