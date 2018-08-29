import { Component, OnInit } from '@angular/core';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'main-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  value = '';

  constructor(private searchService: NbSearchService) {
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
      });
  }

  ngOnInit() {
  }

}
