import { Component, OnInit } from '@angular/core';
import {PdfService} from '../../components/filepdf/pdf.service';
@Component({
  selector: 'app-filepdf',
  templateUrl: './filepdf.component.html',
  styles: [],
  providers:[PdfService]
})
export class FilepdfComponent implements OnInit {
  page:number=1;
  pdfSrc:string='';
  pdfSrcArr = [];
  constructor(private pdfService:PdfService) { }

  ngOnInit() {
    // this.pdfSrc=this.pdfService.getPDF();
    this.pdfSrcArr.push(this.pdfService.getPDF());
  }
onFileSelected(){
  let img:any=document.querySelector("#file");
  if(typeof(FileReader)!=='undefined')
  {
    let reader=new FileReader();
    reader.onload=(e:any)=>{
      // this.pdfSrc=e.target.result;
      this.pdfSrcArr.push(e.target.result);
    }
    reader.readAsArrayBuffer(img.files[0]);
  }
}
}
