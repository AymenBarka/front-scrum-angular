import { User } from './models/user';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  URL1 = 'http://localhost:8084/user/';

  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${this.URL1}` + 'getall');
  }

  updateUser(id: number, user:User): Observable<any> {
    return this.httpClient.post(`${this.URL1}` + 'update' + '/' + `${id}`,user ,httpOptions);
  }

  getUser(id:any):Observable<any>{
    return this.httpClient.get(`${this.URL1}` + 'getOne' + '/' + `${id}`,httpOptions );
  }
  deleteUser(id:number): Observable<any>{
    return this.httpClient.delete(`${this.URL1}`+ 'deleteUser' + '/' + `${id}`,httpOptions );
  }

  getPhoto(id:number): Observable<any>{
    return this.httpClient.get(this.URL1 + 'photo' + '/'  + `${id}`,httpOptions );
  }
  public updatePhoto(id, image) : Observable<any>{
    return this.httpClient.post(this.URL1 + 'update-photo'  + '/'  + `${id}`,image, httpOptions)
  }
  uploadImage(file): Observable<any>{ 
    
      
    return this.httpClient.post(this.URL1 +'upload-image', file );
  }
  

}
