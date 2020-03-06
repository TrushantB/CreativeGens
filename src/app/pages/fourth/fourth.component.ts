import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ProjectService } from 'src/app/core/services/project.service';

interface Image {
  id?:number,
  src: string;
  tag?: string;
  alt?: string;
}


@Component({
  selector: 'app-fourth',
  templateUrl: './fourth.component.html',
  styleUrls: ['./fourth.component.scss']
})
export class FourthComponent implements OnInit {
public imagesDataStore:Image[]=[];
public imagesData:Image[]=[];
public modelData=[];
public selectedModel=null;
  url: string | ArrayBuffer;
  constructor(public projectService:ProjectService) { }

  ngOnInit(): void {
this.loadModels();
    
 this.projectService.getGallery().subscribe((response:Image[]) => {
   this.imagesDataStore=response;
   this.imagesData=response;
 })
  }

  loadModels() {
    this.projectService.getModel().subscribe((response:any) => {
      this.modelData=response;
      this.selectedModel=response[0];
    })
  }

  selectModel(event) {
    console.log(this.selectedModel);

    this.selectedModel=event;
    this.loadFAQ();
    this.loadInputOutputImagesTypes();
  }

  loadFAQ() {
   this.projectService.getFAQByModelId(this.selectedModel.modelId).subscribe((response) => {
    this.selectedModel.FAQ=response;
   })
  }

  loadInputOutputImagesTypes() {
    this.selectedModel.inputImagesTypes=[];
    this.selectedModel.outputImagesTypes=[];
    this.selectedModel.inputImages.map((item) => {
      this.projectService.getInputImagesTypeById(item).subscribe((response) => {
        this.selectedModel.inputImagesTypes.push(response);
      })
    })

    this.selectedModel.outputImages.map((item) => {
      this.projectService.getOutputImagesTypeById(item).subscribe((response) => {
        this.selectedModel.outputImagesTypes.push(response);
      })
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    center: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 20,
    dots: false,
    navSpeed: 700,
    autoWidth:true,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 5
      },
      400: {
        items: 5
      },
      740: {
        items: 5

      },
      940: {
        
    items:10,
        
      }
    },
    nav: false
  }


  onSelectFile(event,item) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        item.url = event.target.result;
      }
    }
  }
}
