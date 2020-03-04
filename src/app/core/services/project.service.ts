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
    this.baseService.getData(this.url)
  }

  getModelById(id) {
    this.url=`${environment.api}Model&modelId=${id}`;
    this.baseService.getData(this.url)
  }

  postModel(data) {
    this.url=`${environment.api}Model`;
    this.baseService.postData(this.url,data)
  }

  getInputImagesType (id) {
    this.url=`${environment.api}InputImagesType&modelId=${id}`;
    this.baseService.getData(this.url)
  }

  postInputImagesType (data) {
    this.url=`${environment.api}InputImagesType`;
    this.baseService.postData(this.url,data)
  }
}
