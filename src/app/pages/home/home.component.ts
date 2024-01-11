import { Component } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  posts: Observable<Post[]>

  image: string = "pic10.jpg";
  constructor(private service: PostService) {
    this.posts = this.service.all();
  }

delete(id?: number) {
  this.service.delete(id || 0).subscribe({
    next : () => {
      this.posts = this.service.all();
    }
  })
  }  
}
