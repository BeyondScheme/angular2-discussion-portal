import {LoggingService} from "../../shared/services/logging.service";
import {Comment} from  "../models/comment";
import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CommentService {
    private postsUrl = "http://localhost:3000/posts/";
    private commentsUrl = "http://localhost:3000/comments/";

    constructor(private http: Http, private loggingService: LoggingService) {
    }

    public getComments(postId: number): Observable<Comment[]> {
        return this.http.get(this.postsUrl + postId + "/comments?_sort=id&_order=DESC")
            .map(res => res.json())
            .catch(this.loggingService.handleError);
    }

    public save(comment: Comment): Observable<Comment> {
        let headers = new Headers({
            "Content-Type": "application/json",
        });

        return this.http
            .post(this.postsUrl + comment.postId + "/comments", JSON.stringify(comment), {headers})
            .map(res => res.json())
            .catch(this.loggingService.handleError);
    }

    public delete(comment: Comment): Observable<Response> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http
            .delete(this.commentsUrl + comment.id, {headers})
            .map(res => res.json())
            .catch(this.loggingService.handleError);
    }
}
