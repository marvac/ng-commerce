import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  test(status: number) {
    this.http.get(`${this.baseUrl}/fail/${status}`).subscribe(res => {
      console.log(res);
    }, error => console.log(error));
  }
}
