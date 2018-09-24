import { Component, OnInit, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { UploadDetailsService } from '../../services/upload-details/upload-details.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete, MatRadioChange, MatSelectChange, MatRadioButton } from '@angular/material';
import { GetSetSessionDetails } from '../../utils/getSessionDetails';
import { ActivatedRoute } from "@angular/router";
import { environment } from '../../../environments/environment';
import { AlertMessageService } from '../../services/alert-message/alert-message.service';


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
  public percentage: FormControl = new FormControl();
  public cgpa: FormControl = new FormControl();
  public chooseOption: FormControl = new FormControl();
  public totalmarks: FormControl = new FormControl();
  public totalcgpa: FormControl = new FormControl();

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
  @Output() change: EventEmitter<MatRadioChange>
  @Output() selectionChange: EventEmitter<MatSelectChange>
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
  marksTypeId: any;
  isEdit;
  isButtonDisabled;
  markTypes = [];
  toYearLessThanFrom;
  selectedCredentailsYear;
  selectedToDate;
  selectedfromDate;

  constructor(
    private fb: FormBuilder,
    private _UploadDetailsService: UploadDetailsService,
    private _GetSetSessionDetails: GetSetSessionDetails,
    private route: ActivatedRoute,
    private _AlertMessageService: AlertMessageService
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
        this.filePath = this.editDetails.filePath;
        this.thumbNailPath = this.editDetails.thumbNailPath;
        if (this.editDetails.institution) {
          this.isEdit = true;
          this.isButtonDisabled = true;
          this.displayInstitueName = this.editDetails.institution ? this.editDetails.institution : '';
          this.displayCourseName = this.editDetails.course ? this.editDetails.course : '';
          this.selectedCredentailsYear = this.editDetails.credentialYear;
          this.selectedToDate = this.editDetails.endYear;
          this.selectedfromDate = this.editDetails.startYear;
          this.marksTypeId = this.editDetails.marksType.marksTypeId;
          if (this.editDetails.marksType.marksTypeId == 1) {
            this.userDetails.patchValue({
              marks: this.editDetails.obtainedMarks,
              totalmarks: this.editDetails.totalMarks
            });
          }

          if (this.editDetails.marksType.marksTypeId == 2) {
            this.userDetails.patchValue({
              grade: this.editDetails.obtainedMarks,
            });
          }

          if (this.editDetails.marksType.marksTypeId == 3) {
            this.userDetails.patchValue({
              cgpa: this.editDetails.obtainedMarks,
              totalcgpa: this.editDetails.totalMarks
            });
          }

          if (this.editDetails.marksType.marksTypeId == 4) {
            this.userDetails.patchValue({
              percentage: this.editDetails.obtainedMarks,
            });
          }

          this.userDetails.patchValue({
            degree: this.editDetails.credentialName
          });
        } else {
          this.isEdit = false;
        }

        this.imageURL = environment.API_ENDPOINT + 'files?fileName=' + this.editDetails.thumbNailPath + "&isThumbNail=" + 1;
        this.isView = true;
      });

    this.userDetails = this.fb.group({
      degree: ['', Validators.required],
      course: ['', Validators.required],
      institute: ['', Validators.required],
      chooseOption: ['', Validators.required],
      fromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      credentailsYear: ['', Validators.required],
      marks: [''],
      totalmarks: [],
      grade: [''],
      totalcgpa: [''],
      cgpa: [''],
      percentage: ['']
    });

    this.getListofYears();

    this._UploadDetailsService.getMarksType().subscribe(
      res => {
        this.markTypes = res;
      },
      error => {
        console.log("Not data found");
      });

    this._UploadDetailsService.getInstitutionDetails().subscribe(
      res => {
        let response = res.json().filter(element => {
          return element.institutionName != null;
        });
        this.instituteDetails = response;
        this.institutesDupliate = response;
      },
      error => {
        if (error.status < 200 || error.status >= 300) {
          this._AlertMessageService.sendMessage("Something went wrong!!!", error.status, "Error");
        }
      });

    this.userDetails.controls.institute.valueChanges.subscribe(newValue => {
      this.instituteDetails = this.filterValues(newValue.toLowerCase());
    });
  }

  // For enable/disabling other options like marks, grades, cgpa, percentrage
  radioOptionSelected(value: string) {
    this.marksTypeId = value;
  }

  //autocomplete get the selected value onchange
  displayInstitue(val) {
    if (val != undefined && val != '' && val != undefined) {
      return val;
    } else if (this.displayInstitueName) {
      this.onInstitutionChanged(this.displayInstitueName.institutionName);
      return this.displayInstitueName.institutionName;
    } else {
      return '';
    }
  }

  // form submit
  formSubmit(formValues) {
    let totalMarks = '';
    let marksObtained = '';
    if (this.marksTypeId == 1) {
      totalMarks = formValues.totalmarks,
        marksObtained = formValues.marks
    }

    if (this.marksTypeId == 2) {
      totalMarks = formValues.totalmarks,
        marksObtained = formValues.grade
    }

    if (this.marksTypeId == 3) {
      totalMarks = formValues.totalmarks,
        marksObtained = formValues.cgpa
    }

    if (this.marksTypeId == 4) {
      totalMarks = formValues.totalmarks,
        marksObtained = formValues.percentage
    }

    const values = {
      userId: this.userId,
      courseId: this.courseId,
      institutionId: this.institutionId,
      totalMarks: totalMarks,
      marksObtained: marksObtained,
      degree: formValues.degree,
      issuedYear: formValues.credentailsYear,
      startYear: formValues.fromDate,
      endYear: formValues.ToDate,
      filePath: this.filePath,
      thumbNailPath: this.thumbNailPath,
      statusId: 1,
      marksTypeId: this.marksTypeId,
      resourceId: this.resourceId,
    }
    this._UploadDetailsService.formSubmitCredentialResource(values).subscribe(res => {
      if (res.status === 200) {
        this._AlertMessageService.sendMessage("Data is saved successfully", res.status, "Success");
        this.isEdit = true;
        this.isButtonDisabled = true;
      }
    },
    error => {
      if (error.status < 200 || error.status >= 300) {
        this._AlertMessageService.sendMessage("Something went wrong!!!", error.status, "Error");
      }
    });
  }

  //To get the grade ID on selecting grade names
  getGradeId(grade: string) {
    this.gardeId = this.grades.find(element => element.gradeName == grade).gradeId;
  }

  //populate years in credentail years, from and to
  getListofYears() {
    const max = new Date().getFullYear();
    const min = max - 20;
    for (var i = min; i <= max; i++) {
      this.years.push(i);
    }
  }

  // onChange of institute, displaying list of course name
  onInstitutionChanged(institution: string) {
    if (this.editDetails.institution) {
      this.userDetails.controls.institute.setValue(this.editDetails.institution.institutionName);
      this.userDetails.controls.course.setValue(this.editDetails.course.courseName);
      this.courseId = this.editDetails.course.courseId;
      this.institutionId = this.editDetails.institution.institutionId;
      this.editDetails = {};
    } else {
      this.userDetails.controls.course.setValue('');
      this.institutionId = this.instituteDetails.find(element => element.institutionName == institution).institutionId;
      this.coursesDetails = this.instituteDetails[0].courses;
      /* const id = this.instituteDetails.findIndex((item) => { return item.institutionName == institution });
      this.coursesDetails = this.institutesDupliate[id].courses; */
    }
  }

  //To get courseId on selecting the course name
  onCourseChanged(course: string) {
    this.courseId = this.coursesDetails.find(element => element.courseName == course).courseId;
  }

  //TO validate toDate>fromDate
  onChangeToYear(year) {
    if (parseInt(this.userDetails.controls.fromDate.value) >= parseInt(year)) {
      this.toYearLessThanFrom = true;
    }
  }


  // to filter the institute name
  filterValues(search: string) {
    return this.institutesDupliate.filter(value => {
      return value.institutionName.toLowerCase().includes(search);
    });
  }

}
