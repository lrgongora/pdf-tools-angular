import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-split-utility',
  templateUrl: './split-utility.component.html',
  styleUrls: ['./split-utility.component.css']
})
export class SplitUtilityComponent implements OnInit {
  @Output() utilityProps =  {
    targetURL: "/split",
    btnSubmitText: "Split PDF File(s)"
  }
  constructor() { }

  ngOnInit(): void {
  }

}
