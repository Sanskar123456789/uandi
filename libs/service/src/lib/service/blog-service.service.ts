import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {blog} from '@uandi/models'

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

  api = "http://localhost:3000/api/blog";

  constructor(private http : HttpClient) { }

  getBlog():Observable<blog[]>{
    return this.http.get<blog[]>(`${this.api}/allBlogs`);
  }

  addblog(Data : FormData):Observable<blog>{
    return this.http.post<blog>(`${this.api}/newBlog`, Data);
  }

  deleteblog(id:string):Observable<any>{
    return this.http.delete<any>(`${this.api}/deleteBlog/${id}`);
  }

  getOneblog(id:string):Observable<blog>{
    return this.http.get<blog>(`${this.api}/blog/${id}`)
  }

  updateblog(data:FormData,id:string):Observable<blog>{
    return this.http.put<blog>(`${this.api}/updateblog/${id}`,data);
  }
}
