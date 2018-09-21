import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { UploadDetailsService } from '../../services/upload-details/upload-details.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { GetSetSessionDetails } from '../../utils/getSessionDetails';
import { SharedService } from '../../services/shared.service';
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
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
  public fromDate: FormControl = new FormControl();
  public ToDate: FormControl = new FormControl();
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
  itemList: string;
  imageURL: string;
  @Output() optionSelected: EventEmitter<MatAutocompleteSelectedEvent>
  userDetails: FormGroup;
  coursesDetails = [];
  grades = [];
  userId: any;
  thumbNail: string;
  filePath: string;
  resourceId: any;
  listUserDetails = [];
  editDetails: any;
  @ViewChild("auto") auto: MatAutocomplete;
  displayInstitueName: any;
  displayCourseName: any;
  tempName: any;
  isView = false;

  constructor(
    private fb: FormBuilder,
    private _UploadDetailsService: UploadDetailsService,
    private _GetSetSessionDetails: GetSetSessionDetails,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this._GetSetSessionDetails.userInfoDetails().userId;
    this.route.params.subscribe(params => {
      this.resourceId = params['id'];
    });

    this._UploadDetailsService.fetchALLCredetailResource(this.userId).subscribe(
      res => {
        this.listUserDetails = res;
        const id = this.listUserDetails.findIndex((item) => { return item.resourceId == this.resourceId });
        this.editDetails = this.listUserDetails[id];
        console.log(this.editDetails);
        this.displayInstitueName = this.editDetails.institution ? this.editDetails.institution : '';
        this.displayCourseName = this.editDetails.course ? this.editDetails.course: '';
        this.userDetails.patchValue({
          degree: this.editDetails.credentialName,
          marks: this.editDetails.marks,
          selectedOption: this.editDetails.credentialYear
        });
        this.imageURL = environment.API_ENDPOINT + 'files?fileName=' + this.editDetails.thumbNailPath + "&isThumbNail=" + 1;
        this.isView = true;
      });

    this.userDetails = this.fb.group({
      degree: ['', Validators.required],
      course: ['', Validators.required],
      institute: ['', Validators.required],
      marks: ['', Validators.required],
      grade: ['', Validators.required],
      fromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      credentailsYear: ['', Validators.required]
    });

    this.getListofYears();

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
      res => {
        this.grades = res;
      },
      error => {
        console.log("Not data found");
      }
    );
  }

  displayInstitue(val) {
    if (val != undefined && val != '' && val != undefined) {
      return val;
    } else if (this.displayInstitueName.institutionName) {
      this.onInstitutionChanged(this.displayInstitueName.institutionName);
      return this.displayInstitueName.institutionName;
    } else {
      return '';
    }
  }
  


  formSubmit(formValues) {
    const values = {
      resourceId: this.resourceId,
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

    this._UploadDetailsService.formSubmitCredentialResource(values).subscribe(res => {
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
    for (var i = min; i <= max; i++) {
      this.years.push(i);
    }
  }

  // onChange of institute, displaying list of course name
  onInstitutionChanged(institution: string) {
    
    if(this.editDetails.institution) {
        console.log("object...."+ this.editDetails);
        this.userDetails.controls.course.setValue(this.editDetails.course.courseName);
       this.editDetails={};
      //this.coursesDetails = this.editDetails.course.courseName;
    } else {
      this.userDetails.controls.course.setValue('');
      this.institutionId = this.instituteDetails.find(element => element.institutionName == institution).institutionId;
      this.coursesDetails = this.instituteDetails[0].courses;
      const id = this.instituteDetails.findIndex((item) => { return item.institutionName == institution });
      this.coursesDetails = this.institutesDupliate[id].courses;
    }
    //this.displayInstitueName = {...this.institutesDupliate[id]};
  }

  onCourseChanged(course: string) {
    this.courseId = this.coursesDetails.find(element => element.courseName == course).courseId;
  }


  // to filter the institute name
  filterValues(search: string) {
    return this.institutesDupliate.filter(value => {
      return value.institutionName.toLowerCase().includes(search);
    });
  }

}
