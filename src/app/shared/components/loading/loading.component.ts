  import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<ngx-spinner
              bdColor="rgba(51,51,51,0.8)"
              size="medium"
              color="#fff"
              type="ball-scale-multiple"
              >
              <p style="font-size: 20px; color: white">Loading...</p>
              </ngx-spinner>
              `,
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}