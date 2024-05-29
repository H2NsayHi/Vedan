import { Component, OnInit } from '@angular/core';
import { PlateRecognitonService } from '@services/plate-recognition.service';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private plateRecognitonService: PlateRecognitonService
  ) {
  }
  public isShowRecogButton = true;
  public isLoading: boolean = false;
  public isShowUpload: boolean = true;
  public imageLocalUrl: any
  public plateText: string = ''
  public accuracyText: string = ''
  public accuracyTextPadding: string = 'Độ chính xác: '
  public currentFile: any
  public imgResult = ''
  ngOnInit(): void {}
  upload(target: any){
    var files = target.files;
    if (files.length === 0) return;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        // this.message = "Only images are supported.";
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
        this.imageLocalUrl = reader.result;
    }
    this.currentFile = files[0]
    this.isShowUpload = false
  }
  reset(){
    this.isShowUpload = true
    this.imageLocalUrl = ''
    this.plateText = ''
    this.accuracyText = ''
    this.isLoading = false
    this.currentFile = undefined
    this.isShowRecogButton = true
  }
  recognition(){
    this.isLoading = true
    if (this.currentFile != undefined) {
      var data = new FormData()
      data.append('file', this.currentFile)
      this.plateRecognitonService.recognition(data).subscribe(res => {
        this.isLoading = false
      },
      (error) => {
        if (error.status == 200) {
          this.isLoading = false
          this.isShowRecogButton = false
          console.log(error.body)
          this.imgResult = "http://" + window.location.hostname + ":8080/runs/segment/predict/image0.jpg"
        }
      })
    }
  }
}
