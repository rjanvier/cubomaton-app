import { Component, OnInit, Input } from '@angular/core';
import { MongodbService } from '../mongodb.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Stone } from '../stone';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
//  stones: any = [];
//  
//  selectedStone: any;

  stones: Stone[];
  selectedStone: Stone;
  newstone : Stone = {
   name:'',
   id:null,
   updateAt:new Date('12/12/2017')
   };
  
  constructor(private router: Router, 
  private mongodbService: MongodbService) { }
  
  @Input()
  stone: Stone;
  
  onSelect(stone: Stone): void {
    this.selectedStone = stone;
  }

  ngOnInit() {
  // Retrieve acquisitions from the API
    this.mongodbService.getAllStones()
        .subscribe(stones => {this.stones = stones});
  }
  
  add(stone: Stone) {
//    name = name.trim();
//    if (!name) { 
//      return ; 
//    }
    console.log(stone.name);
    this.mongodbService.create(stone)
        .then(stone => {
          this.stones.push(stone);
          this.selectedStone = null;
          console.log("here");
        })
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedStone.id]);
  }

}
