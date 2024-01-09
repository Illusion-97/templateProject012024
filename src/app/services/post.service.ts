import { Injectable } from '@angular/core';
import {Post} from "../models/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[] = []
  constructor() { }

  save(post: Post) {
    this.posts.push(post);
    console.log("POSTS", this.posts);
  }
}
