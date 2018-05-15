import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';
import { Subject } from 'rxjs';
import {AgmCoreModule, LatLngBounds} from '@agm/core';
import { debounceTime, distinctUntilChanged, catchError, single, filter } from 'rxjs/operators';
import { Http } from '@angular/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapService]
})
export class MapComponent implements OnInit {

  lat: number = 37.791152;
  lng: number = -122.401307;
  clickable: boolean=false;
  mapSubject = new Subject();
  cacheSubject = new Subject();
  minLat;
  maxLat;
  minLng;
  maxLng;
  cacheId;
  editing: boolean;
  title;
  description;

  zoom: number = 14;
  geoCache;
  icon = {
    url: '/assets/images/treasure.png', 
    scaledSize: {
      height: 36,
      width: 36
    }
  };


  constructor(private mapService: MapService ) { }

  ngOnInit() {
    
    this.editing = false;
    this.mapSubject
    .pipe(debounceTime(1000))
    //.pipe(distinctUntilChanged())  //Filter observable?
    .subscribe(elem=>this.mapService.createCachesInBoundingBoxApi(this.minLat, this.maxLat, this.minLng, this.maxLng)
    .subscribe(response=>{
    this.geoCache=response.json();
  }
  ));
  this.buildMarkers();
  this.cacheSubject
  .pipe(distinctUntilChanged())
  .subscribe(elem=>this.mapService.deleteCacheById(this.cacheId).subscribe(response=>{
    console.log(response);
  }));
  }

  boundsChange(latLngBounds: LatLngBounds){
    this.minLat = latLngBounds.getSouthWest().lat();
    this.maxLat = latLngBounds.getNorthEast().lat();
    this.minLng = latLngBounds.getSouthWest().lng();
    this.maxLng = latLngBounds.getNorthEast().lng();
    this.mapSubject.next();
  }
  buildMarkers(){
    this.mapSubject.next();
  }
  openInfoWindow(e){
    console.log(e);
  }
  deleteCacheById(cacheId, e){
    this.cacheId=cacheId;
    this.cacheSubject.next();
    this.buildMarkers();
  }
  toggleEditMode(){
    this.editing = !this.editing;
  }

  updateCache(e){
    this.toggleEditMode();
    console.log(e);

  }
  updateFormValue(e){
    console.log(e);
  }
  mapDblClick(e){
    
  }
}
