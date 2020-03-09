import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ProjectService } from 'src/app/core/services/project.service';

interface Image {
  id?:number,
  src: string;
  tag?: string;
  alt?: string;
}


@Component({
  selector: 'app-fourth',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
public imagesDataStore:Image[]=[];
public imagesData:Image[]=[];
public outputImages:Image[]=[];
public modelData=[];
public selectedModel=null;
// public   url: string | ArrayBuffer;
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
      this.loadFAQ();
      this.loadInputOutputImagesTypes();
    })
  }

  selectModel(event) {
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
    this.selectedModel.inputImages && this.selectedModel.inputImages.map((item) => {
      this.projectService.getInputImagesTypeById(item).subscribe((response) => {
        this.selectedModel.inputImagesTypes.push(response);
      })
    })

    this.selectedModel.outputImages &&  this.selectedModel.outputImages.map((item) => {
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

  evolve() {
    let data=[];
    this.selectedModel.inputImagesTypes.length > 0 && this.selectedModel.inputImagesTypes.map((item,index) => {
      data.push({
        modelId: this.selectedModel.id,
        inputImagesTypeId: item.id,
        imgPath: item.url
      })
      if(this.selectedModel.inputImagesTypes.length-1==index) {
        this.projectService.postInputImages(data).subscribe((response) => {
          this.getOutput();
        })
      }
    })
  }

  getOutput() {
    // for generate fake output images
    let outputLength=this.selectedModel.outputImages.length;
    let randomNum=Math.floor(Math.random() * (15 - outputLength)) + 1 ;

    this.projectService.getOutputImages(`_start=${randomNum}&_limit=${outputLength}`).subscribe((response:Image[]) => {
      this.outputImages=response;
    })
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

  grabImage() {
    this.selectedModel.inputImagesTypes[0].url=this.outputImages[this.outputImages.length-1].src;
  }

  selectGalleryImage(url) {
    this.selectedModel.inputImagesTypes[0].url=url;
  }
}
