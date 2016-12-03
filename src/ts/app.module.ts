import {AppComponent} from "./app.component";
import {DashboardComponent} from "./dashboard/components/dashboard.component";
import {PostComponent} from "./post/components/post.component";
import "./rxjs-extensions";
import {LoggingService} from "./shared/services/logging.service";
import {PostService} from "./shared/services/post.service";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/dashboard",
    },
    {
        component: DashboardComponent,
        path: "dashboard",
    },
    {
        component: PostComponent,
        path: "post/:id",
    },
];
export const routedComponents = [DashboardComponent, PostComponent];

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, routedComponents],
    imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(routes)],
    providers: [PostService, LoggingService],
})
export class AppModule {
}
