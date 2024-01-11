import { Injectable } from '@angular/core';
import {Post} from "../models/post";
import {HttpClient} from "@angular/common/http";
import { Observable, tap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  API_URL = "http://localhost:3000";

  posts: Post[] = [
    {
      titre: "Interdum aenean",
      description: "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
      imageSrc: "pic01.jpg",
      imageAlt: "",
      postLink: "#"
    },
    {
      titre: "Nulla amet dolore",
      description: "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
      imageSrc: "pic02.jpg",
      imageAlt: "",
      postLink: "#"
    },
    {
      titre: "Tempus ullamcorper",
      description: "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
      imageSrc: "pic03.jpg",
      imageAlt: "",
      postLink: "#"
    },
    {
      titre: "Sed etiam facilis",
      description: "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
      imageSrc: "pic04.jpg",
      imageAlt: "",
      postLink: "#"
    },
    {
      titre: "Feugiat lorem aenean",
      description: "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
      imageSrc: "pic05.jpg",
      imageAlt: "",
      postLink: "#"
    },
    {
      titre: "Amet varius aliquam",
      description: "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
      imageSrc: "pic06.jpg",
      imageAlt: "",
      postLink: "#"
    }]
  constructor(private http: HttpClient, private toast: HotToastService) { }

  get(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/posts/${id}`).pipe(this.toast.observe({
      loading: "Recherche avec l'id : " + id,
      success: "Trouvé !",
      error: err => err.error
    }))
  }

  save(post: Post) {
    return this.http.post(`${this.API_URL}/posts`,post)
  }

  update(post: Post) {
    return this.http.put(`${this.API_URL}/posts/${post.id}`,post)
  }

  all(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}/posts`);
  }

  delete(id : number): Observable<never> {
    return this.http.delete<never>(`${this.API_URL}/posts/${id}`);
  }
}
