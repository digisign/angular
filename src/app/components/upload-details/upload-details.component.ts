import { Component, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { UploadDetailsService } from '../../services/upload-details/upload-details.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { GetSetSessionDetails } from '../../utils/getSessionDetails';
import { SharedService } from '../../services/shared.service';



@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadDetailsComponent implements OnInit {
  public instituteDetails = [];
  public institutesDupliate = [];
  public coursesDuplicate = [];
  public years = [];
  public degree: FormControl = new FormControl();
  public marks: FormControl = new FormControl();
  public institute: FormControl = new FormControl();
  public course: FormControl = new FormControl();
  public grade: FormControl = new FormControl();
  public startDate: FormControl = new FormControl();
  public endDate: FormControl = new FormControl();
  public credentailsYear: FormControl = new FormControl();
  courseId: any;
  institutionId: any;
  intitutionName: string;
  courseName: string;
  gradeName: string;
  gardeId: any;
  file: string;
  thumbNailPath: string;
  statusId: any;
  imageURL: string;

  @Output() optionSelected: EventEmitter<MatAutocompleteSelectedEvent>
  userDetails: FormGroup;
  coursesDetails = [];
  grades = [];
  userId: any;
  thumbNail: string;
  filePath: string;
  constructor(
    private fb: FormBuilder,
    private _UploadDetailsService: UploadDetailsService,
    private _GetSetSessionDetails: GetSetSessionDetails,
    private _SharedService: SharedService
  ) { }

  ngOnInit() {
    this._SharedService.getFileInfo.subscribe(response => {
      this.filePath = response[0].filePath;
      this.thumbNail = response[0].thumbNailPath;
    });
    this.imageURL = "http://172.16.18.173:8080/files?fileName="+ this.thumbNail + "&isThumbNail=" + 1;
    this.userDetails = this.fb.group({
      degree: ['', Validators.required],
      course: ['', Validators.required],
      institute: ['', Validators.required],
      marks: ['', Validators.required],
      grade: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      credentailsYear: ['', Validators.required]
    }, { validator: this.checkDates });

    this.getListofYears();
    this.userId = this._GetSetSessionDetails.userInfoDetails().userId;

    this._UploadDetailsService.getDetails().subscribe(
      res => {
        this.instituteDetails = res;
        this.institutesDupliate = res;
      },
      error => {
        console.log("Not data found");
      });
    
      this.userDetails.controls.institute.valueChanges.subscribe(newValue => {
      this.instituteDetails = this.filterValues(newValue.toLowerCase());
    });

    this._UploadDetailsService.getGrades().subscribe(
      res=> {
        this.grades = res;
      },
      error => {
        console.log("Not data found");
      }
    );

  }

  formSubmit(formValues) {
    const values = {
      resourceId: null,
      userId: this.userId,
      marks: formValues.marks,
      courseId: this.courseId,
      institutionId: this.institutionId,
      gradeId: this.gardeId,
      degree: formValues.degree,
      institutionName: formValues.institute,
      courseName: formValues.course,
      gradeName: formValues.grade,
      filePath: this.filePath,
      thumbNailPath: this.thumbNail,
      statusId: 1
    }

    this._UploadDetailsService.credentialResource(values).subscribe(res => {
      console.log(res);
    });
  }

  getGradeId(grade: string) {
    this.gardeId = this.grades.find(element => element.gradeName == grade).gradeId;
  }

  //get List of years
  getListofYears() {
    const max = new Date().getFullYear();
    const min = max - 20;
    for(var i=min; i<=max; i++) {
      this.years.push(i);
    }
  }

  // onChange of institute, displaying list of course name
  onInstitutionChanged(institution: string) {
    this.course.setValue('');
    this.institutionId = this.instituteDetails.find(element => element.institutionName == institution).institutionId;
    const id = this.instituteDetails.findIndex((item)=>{return item.institutionName == institution});
    this.coursesDetails = this.institutesDupliate[id].courses;
  }

  onCourseChanged(course: string) {
    this.courseId = this.coursesDetails.find(element => element.courseName == course).courseId;
  }

  checkDates(group: FormGroup) {
    if (group.controls.endDate.value < group.controls.startDate.value) {
      return { notValid: true }
    }
    return null;
  }

  // to filter the institute name
  filterValues(search: string) {
    return this.institutesDupliate.filter(value => {
      return value.institutionName.toLowerCase().includes(search);
    });
  }

}
