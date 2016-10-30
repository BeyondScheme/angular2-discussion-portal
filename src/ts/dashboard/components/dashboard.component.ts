import {Post} from "../../shared/models/post";
import {PostService} from "../../shared/services/post.service";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AnonymousSubscription} from "rxjs/Subscription";

@Component({
    selector: "dashboard",
    styleUrls: ["app/css/dashboard.component.css"],
    templateUrl: "../../../src/html/dashboard/dashboard.component.html",
})
export class DashboardComponent implements OnInit, OnDestroy {

    private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
    private posts: Post[];
    private post: Post;

    constructor(private router: Router, private postService: PostService) {
        this.post = new Post();
    }

    public ngOnInit(): void {
        this.refreshData();
    }

    public ngOnDestroy(): void {
        if (this.postsSubscription) {
            this.postsSubscription.unsubscribe();
        }
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    public save(): void {
        this.postService
            .save(this.post)
            .subscribe(bid => {
                this.posts.unshift(bid);
                this.post = new Post();
            });
    }

    public deletePost(post: Post, event: any): void {
        event.stopPropagation();
        this.postService
            .delete(post)
            .subscribe(() => {
                this.posts = this.posts.filter((returnableObjects: Post) => {
                    return returnableObjects.id !== post.id;
                });
            });
    }

    public gotoPost(post: Post): void {
        this.router.navigate(["/posts", post.id]);
    }

    private refreshData(): void {
        this.postsSubscription = this.postService.getPosts().subscribe(posts => {
            this.posts = posts;
            this.subscribeToData();
        });
    }

    private subscribeToData(): void {
        this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.refreshData());
    }

}
