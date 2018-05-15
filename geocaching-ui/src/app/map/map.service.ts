import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

@Injectable()
export class MapService{
    constructor(private http: Http){}

    createCachesInBoundingBoxApi(minLatitude, maxLatitude, minLongitude, maxLongitude){
        return this.http.post("http://localhost:4200/api/caches/getByBoundingBox",{
            "maxLatitude": maxLatitude,
            "minLatitude": minLatitude,
            "maxLongitude": maxLongitude,
            "minLongitude": minLongitude
        });
    };

    deleteCacheById(cacheId){
        return this.http.get("http://localhost:4200/api/caches/deleteCache/" + cacheId);
    }
}
