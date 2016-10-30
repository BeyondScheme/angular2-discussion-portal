import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoggingService {

    public handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
