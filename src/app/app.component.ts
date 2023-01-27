import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  private url = 'http://127.0.0.1:8000/api/contact';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cel: ['', Validators.required],
      message: ['', Validators.required],
      contact_area: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.http.post(this.url, JSON.stringify(formData))
      .subscribe(res => {
        console.log(res);
        alert(JSON.stringify(res));
        this.form.reset();
      },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
