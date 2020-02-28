import { Component, OnInit , Output} from '@angular/core';

@Component({
  selector: 'app-merge-utility',
  templateUrl: './merge-utility.component.html',
  styleUrls: ['./merge-utility.component.css']
})
export class MergeUtilityComponent implements OnInit {
  @Output() utilityProps =  {
    targetURL: "/merge",
    btnSubmitText: "Merge PDF Files"
  }
  constructor() { }

  ngOnInit(): void {
  }

}
