import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent implements OnInit {
  @Input('modelId') modelId;
  public FAQData=[];
  constructor(public projectService:ProjectService) { }

  ngOnInit(): void {
    this.projectService.getFAQByModelId(this.modelId).subscribe((response:any[]) => {
      this.FAQData=response;
     })
  }

}
