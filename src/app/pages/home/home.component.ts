import { Component } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  image: string = "pic10.jpg";
  constructor(private service: PostService) {
  }

  get posts() {
    return this.service.posts
  }
}
