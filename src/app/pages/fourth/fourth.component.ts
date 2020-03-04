import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

interface Image {
  src: string;
  title?: string;
  alt?: string;
}


@Component({
  selector: 'app-fourth',
  templateUrl: './fourth.component.html',
  styleUrls: ['./fourth.component.scss']
})
export class FourthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    

  }


  imagesData: Image[] = [
    {
      src: 'assets/images/empty_image.png',
      alt: '',
      title: ''
    },
    {
      src: 'assets/images/empty_image.png',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/images/empty_image.png',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/images/empty_image.png',
      alt: '',
      title: ''
    },
    {
      src: 'assets/images/empty_image.png',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/images/empty_image.png',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/images/empty_image.png',
      alt: '',
      title: ''
    },
    {
      src: 'assets/images/empty_image.png',
      alt: 'image',
      title: 'image'
    },
    {
      src: 'assets/images/empty_image.png',
      alt: 'image',
      title: 'image'
    },
  ]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    margin: 20,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 9
      }
    },
    nav: true
  }

}
