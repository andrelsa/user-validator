import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserValidatorsService} from './core/services/validators/user-validators.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: UserValidatorsService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [
        // initial value
        null,
        // sync built-in validators
        Validators.compose(
          [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
        )
      ],
      email: [
        // initial value
        null,
        // sync built-in validators
        Validators.compose(
          [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.email],
        ),
        // custom async validator
        this.service.userValidator()
      ],
    });
  }

  save() {
    console.log('save to db');
  }

}
