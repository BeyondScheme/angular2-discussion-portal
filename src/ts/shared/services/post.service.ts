import {Post} from "../models/post";
import {LoggingService} from "./logging.service";
import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PostService {
    private postsUrl = "http://localhost:3000/posts/";

    constructor(private http: Http, private loggingService: LoggingService) {
    }

    public getPosts(): Observable<Post[]> {
        return this.http.get(this.postsUrl + "?_sort=id&_order=DESC")
            .map(res => res.json())
            .catch(this.loggingService.handleError);
    }

    public getPost(id: number): Observable<Post> {
        return this.http.get(this.postsUrl + id)
            .map(res => res.json())
            .catch(this.loggingService.handleError);
    }

    public save(post: Post): Observable<Post> {
        let headers = new Headers({
            "Content-Type": "application/json",
        });

        return this.http
            .post(this.postsUrl, JSON.stringify(post), {headers})
            .map(res => res.json())
            .catch(this.loggingService.handleError);
    }

    public delete(post: Post): Observable<Response> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http
            .delete(this.postsUrl + post.id, {headers})
            .map(res => res.json())
            .catch(this.loggingService.handleError);
    }
}
