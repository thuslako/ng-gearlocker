import { TestBed, async } from '@angular/core/testing';

import { GearApiService } from './gear-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {Item} from './models/Item.model'; //requires formatting on the api side

describe('GearApiService', () => {
  let service: GearApiService;
  let httpMock: HttpTestingController;

  beforeEach(() =>{
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GearApiService]
    });
    service = TestBed.get(GearApiService);
    httpMock = TestBed.get(HttpTestingController)
  });

  it('should return json from api/v1/gear/all',()=>{
    const testData = [
      {"id":"002","item_type":"camera","item_name":"canon 60D","item_value":"1400.00"},
      {"id":"001","item_type":"lens","item_name":"canon pancake 40mm","item_value":"200.00"}
    ];  
    service.getAllItems().subscribe(items => {
      expect(items).toEqual(testData);
      console.log(items);

      const query = httpMock.expectOne('http://localhost:3000/api/v1/gear/all');
      expect(query.request.method).toBe('GET');
    });
  });




});
