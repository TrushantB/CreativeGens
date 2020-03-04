import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public url:string;

  constructor(public baseService:BaseService) { }

  getModel() {
    this.url=`${environment.api}Model`;
    return  this.baseService.getData(this.url)
  }

  getModelById(id) {
    this.url=`${environment.api}Model&modelId=${id}`;
    this.baseService.getData(this.url)
  }

  postModel(data) {
    this.url=`${environment.api}Model`;
    this.baseService.postData(this.url,data)
  }

  getInputImagesType () {
    this.url=`${environment.api}InputImagesType`;
    return this.baseService.getData(this.url)
  }

  postInputImagesType (data) {
    this.url=`${environment.api}InputImagesType`;
    return this.baseService.postData(this.url,data)
  }

  getOutputImagesType () {
    this.url=`${environment.api}OutputImagesType`;
    return this.baseService.getData(this.url)
  }

  postOutputImagesType (data) {
    this.url=`${environment.api}OutputImagesType`;
    return this.baseService.postData(this.url,data)
  }
}
