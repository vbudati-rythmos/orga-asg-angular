import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { JsonplaceholderService } from '../services/jsonplaceholder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  percent: any;
  data = [];
  pieChartLabels:string[] = ['Latitude > 0', 'Latitude < 0', 'Longitude > 0','Longitude < 0'];
  chartColors: any[]=[{backgroundColor:["#ff6347", "#47d1d1", "#ffc61a", "#b3b3ff"] }]
  pieChartData:number[]=[];
  pieChartType:string = 'pie';
  latG = 0;
  latL = 0;
  longG = 0;
  longL = 0;
  displayedColumns = ['sNo', 'name', 'userName', 'city', 'pinCode', 'companyName']
  constructor(private jsonService: JsonplaceholderService) { }

  ngOnInit() {
    this.fetchData();
  }

  async fetchData() {
    let result = await this.jsonService.getData().toPromise();
    this.percent = (result.length/100) * 100;
    let items = result || [];
    this.data = items.map((item) => {
      let newItem = {};
      newItem['sNo'] = item.id;
      newItem['name'] = item.name;
      newItem['userName'] = item.username;
      newItem['city'] = item.address.city;
      newItem['pinCode'] = item.address.zipcode;
      newItem['companyName'] = item.company.name;
      if (Math.sign(parseFloat(item.address.geo.lat)) === -1) {
        this.latL++;
      }
      if (Math.sign(parseFloat(item.address.geo.lat)) !== -1) {
        this.latG++;
      }
      if (Math.sign(parseFloat(item.address.geo.lng)) === -1) {
        this.longL++;
      }
      if (Math.sign(parseFloat(item.address.geo.lng)) !== -1) {
        this.longG++;
      }
      return newItem;
    });
    this.pieChartData.push(this.latG, this.latL, this.longG, this.longL);
    this.dataSource = new MatTableDataSource(this.data);
  }

  

  

  

}
