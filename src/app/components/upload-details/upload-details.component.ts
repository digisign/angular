import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UploadDetailsService } from '../../services/upload-details/upload-details.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';


@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit {
  public instituteDetails = [];
  public institutes = [];
  public years = [];
  public institute: FormControl = new FormControl();
  public course: FormControl = new FormControl();
  public grade: FormControl = new FormControl();
  public startDate: FormControl = new FormControl();
  public endDate: FormControl = new FormControl();
  public credentailsYear: FormControl = new FormControl();

  @Output() optionSelected: EventEmitter<MatAutocompleteSelectedEvent>
  userDetails: FormGroup;
  coursesDetails = [];
  grades = [];
  constructor(
    private fb: FormBuilder,
    private _UploadDetailsService: UploadDetailsService
  ) { }

  ngOnInit() {
    this.userDetails = this.fb.group({
      degree: ['', Validators.required],
      course: ['', Validators.required],
      institute: ['', Validators.required],
      marks: ['', Validators.required],
      grade: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      place: ['', Validators.required],
      year: ['', Validators.required]
    }, { validator: this.checkDates });

    this.getListofYears();

    this._UploadDetailsService.getDetails().subscribe(
      res => {
        this.instituteDetails = res;
        this.institutes = res;
      },
      error => {
        console.log("Not data found");
      });

    this.institute.valueChanges.subscribe(newValue => {
      this.instituteDetails = this.filterValues(newValue.toLowerCase());
    });

    this._UploadDetailsService.getGrades().subscribe(
      res=> {
        this.grades = res._embedded.grades;
      },
      error => {
        console.log("Not data found");
      }
    );

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
  onSelectionChanged(course: string) {
    this.course.setValue('');
    const id = this.instituteDetails.find(element => element.institutionName == course).institutionId;;
    this.coursesDetails = this.institutes[id].courses;
  }

  checkDates(group: FormGroup) {
    if (group.controls.endDate.value < group.controls.startDate.value) {
      return { notValid: true }
    }
    return null;
  }

  // to filter the institute name
  filterValues(search: string) {
    return this.institutes.filter(value => {
      return value.institutionName.toLowerCase().includes(search);
    });
  }

}
