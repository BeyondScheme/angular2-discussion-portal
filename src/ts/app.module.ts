import {AppRoutingModule, routedComponents} from "./app-routing.module";
import {AppComponent} from "./app.component";
import "./rxjs-extensions";
import {LoggingService} from "./shared/services/logging.service";
import {PostService} from "./shared/services/post.service";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, routedComponents],
    imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule],
    providers: [PostService, LoggingService],
})
export class AppModule {
}
