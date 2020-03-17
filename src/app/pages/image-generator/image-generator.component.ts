import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

interface Image {
  id?:number,
  src: string;
  tag?: string;
  alt?: string;
}


@Component({
  selector: 'app-image-generator',
  templateUrl: './image-generator.component.html',
  styleUrls: ['./image-generator.component.scss']
})
export class ImageGeneratorComponent implements OnInit {
  public imagesDataStore:Image[]=[];
  public imagesData:Image[]=[];
  public outputImages:Image[]=[];
  public modelData=[];
  public selectedModel=null;
  // public   url: string | ArrayBuffer;
  constructor(public projectService:ProjectService,public sharedService:SharedService) { 
    this.sharedService.showingSpinner();
  }
  
    ngOnInit(): void {
    this.loadModels();
      
   this.projectService.getGallery().subscribe((response:Image[]) => {
     this.imagesDataStore=response;
     this.imagesData=response;
     this.sharedService.hidingSpinner();
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
      this.sharedService.showingSpinner();
      this.selectedModel=event;
      console.log(this.selectedModel);
      
      this.loadFAQ();
      this.loadInputOutputImagesTypes();
    }
  
    loadFAQ() {
     this.projectService.getFAQByModelId(this.selectedModel.modelId).subscribe((response) => {
      this.selectedModel.FAQ=response;
      console.log(response);
      
      this.sharedService.hidingSpinner();
     })
    }
  
    loadInputOutputImagesTypes() {
      this.sharedService.showingSpinner();
      this.selectedModel.inputImagesTypes=[];
      this.selectedModel.outputImagesTypes=[];
      this.selectedModel.inputImages && this.selectedModel.inputImages.map((item) => {
        this.projectService.getInputImagesTypeById(item).subscribe((response) => {
          this.selectedModel.inputImagesTypes.push(response);
          this.sharedService.hidingSpinner();
        })
      })
  
      this.selectedModel.outputImages &&  this.selectedModel.outputImages.map((item) => {
        this.projectService.getOutputImagesTypeById(item).subscribe((response) => {
          this.selectedModel.outputImagesTypes.push(response);
          this.sharedService.hidingSpinner();
        })
      })
    }
  
   
    evolve() {
      this.sharedService.showingSpinner();
      let data=[];
      this.selectedModel.inputImagesTypes.length > 0 && this.selectedModel.inputImagesTypes.map((item,index) => {
        data.push({
          imageTypeId:item.id,
          imageType:item.name,
          imagePath:item.url
        })

        if(index == this.selectedModel.inputImagesTypes.length - 1) {
         let element= {
             modelId:this.selectedModel.id,
             imputDetails:data
          }
          this.projectService.postInputImages(element).subscribe((response:any) => {
              // this.getOutput();
              this.outputImages=response;
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
        this.sharedService.hidingSpinner();
      })
    }
  
    onSelectFile(event,item) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
         item.imagePath=event.target.files[0].name;
         
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
      this.selectedModel.inputImagesTypes[0].imagePath=url;

    }
  }
  
