import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
 public FAQData=[];
 public inputImagesData=[];
 public inputImage:string;
 public outputImagesData=[];
 public outputImage:string;
 public FAQanswer:string;
 public FAQquestion:string;
//  public inputImageFlag:boolean=false;
  constructor(public http:HttpClient,public projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getInputImagesType().subscribe((response:any) => {
      this.inputImagesData=response;
    })

    this.projectService.getOutputImagesType().subscribe((response:any) => {
      this.outputImagesData=response;
    })
   
  }
  submit() {
    console.log("submit");
    
  }
  checkHandle(event) {
    event.check=!event.check;
  }

  addInputImage() {
    if(this.inputImage) {
      this.projectService.postInputImagesType({name:this.inputImage}).subscribe((response) => {
        this.inputImagesData.push(response);
        this.inputImage='';
      });
    }
  }

  addOutputImage() {
    if(this.outputImage) {
      this.projectService.postOutputImagesType({name:this.outputImage}).subscribe((response) => {
        this.outputImagesData.push(response);
        this.outputImage='';
      });
    }
  }
  

  addFAQ() {
    if(this.FAQanswer && this.FAQquestion) {
      this.FAQData.unshift({question:this.FAQquestion, answer:this.FAQanswer});
      this.FAQanswer='';
      this.FAQquestion='';
    }
  }

  removeFAQ(item) {
    this.FAQData.splice(this.FAQData.indexOf(item),1);
  }

  

}
