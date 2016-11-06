import {Post} from "../../shared/models/post";
import {PostService} from "../../shared/services/post.service";
import {Comment} from "../models/comment";
import {CommentService} from "../services/comment.service";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AnonymousSubscription} from "rxjs/Subscription";

@Component({
    providers: [CommentService],
    selector: "bid",
    templateUrl: "src/html/post/post.component.html",
})
export class PostComponent implements OnInit, OnDestroy {

    private static ID_ROUTE_PARAM: string = "id";
    private timerSubscription: AnonymousSubscription;
    private commentsSubscription: AnonymousSubscription;
    private post: Post;
    private comments: Comment[];
    private comment: Comment;

    constructor(private postService: PostService, private commentService: CommentService,
                private route: ActivatedRoute, private router: Router) {
    }

    public ngOnInit(): void {
        this.comment = new Comment();
        this.route.params.forEach((params: Params) => {
            if (params[PostComponent.ID_ROUTE_PARAM] !== undefined) {
                let id: number = +params[PostComponent.ID_ROUTE_PARAM];
                this.postService.getPost(id).subscribe(post => {
                    this.post = post;
                    this.comment = new Comment();
                    this.comment.postId = this.post.id;
                    this.refreshData();
                });
            } else {
                this.router.navigate(["/dashboard"]);
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.commentsSubscription) {
            this.commentsSubscription.unsubscribe();
        }
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    public save(): void {
        this.commentService
            .save(this.comment)
            .subscribe(comment => {
                this.comments.unshift(comment);
                this.comment = new Comment();
                this.comment.postId = this.post.id;
            });
    }

    public deleteComment(comment: Comment, event: any): void {
        event.stopPropagation();
        this.commentService
            .delete(comment)
            .subscribe(() => {
                this.comments = this.comments.filter((returnableObjects: Comment) => {
                    return returnableObjects.id !== comment.id;
                });
            });
    }

    private refreshData(): void {
        this.commentsSubscription = this.commentService.getComments(this.post.id).subscribe(comments => {
            this.comments = comments;
            this.subscribeToData();
        });
    }

    private subscribeToData(): void {
        this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.refreshData());
    }

}
