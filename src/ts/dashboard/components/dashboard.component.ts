import {Post} from "../../shared/models/post";
import {PostService} from "../../shared/services/post.service";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AnonymousSubscription} from "rxjs/Subscription";

@Component({
    selector: "dashboard",
    templateUrl: "/src/html/dashboard/dashboard.html",
})
export class DashboardComponent implements OnInit, OnDestroy {

    private timerSubscription: AnonymousSubscription;
    private postsSubscription: AnonymousSubscription;
    private posts: Post[];
    private post: Post;

    constructor(private postService: PostService) {
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
            .subscribe(post => {
                this.posts.unshift(post);
                this.post = new Post();
            });
    }

    public deletePost(postToDelete: Post, event: any): void {
        event.stopPropagation();
        this.postService.delete(postToDelete).subscribe(() => {
            this.posts = this.posts.filter((post: Post) => post.id !== postToDelete.id);
        });
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
