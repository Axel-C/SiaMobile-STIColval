import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class RedditService{
    http:any;
    baseUrl: String;

    constructor(http:Http){
        this.http = http;
        this.baseUrl = 'https://www.reddit.com/r';
    }

    getPosts(category, limit){
        return this.http.get(this.baseUrl+'/'+category+'/top.json?limit='+limit)
            .map(res => res.json());

    }

     
}