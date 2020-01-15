import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Item} from './models/Item.model';

@Injectable({
  providedIn: 'root'
})
export class GearApiService {

  constructor( private http: HttpClient) { }

  getAllItems(){
    //return items in gear locker
    return this.http.get('http://localhost:3000/api/v1/gear/all') ;
  }
}
