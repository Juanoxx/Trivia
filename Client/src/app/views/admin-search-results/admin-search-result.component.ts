import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EndpointsService } from 'src/app/services/endpoints/endpoints.service';
import { environment } from 'src/environments/environment';

let input = Input;

@Component({
  selector: 'app-admin-search-result',
  templateUrl: './admin-search-result.component.html',
  styleUrls: ['./admin-search-result.component.css']
})
export class AdminSearchResultComponent implements OnInit {

  @Input() query: string;
  @Input() domain: string;
  screenHeight: any;
  documents = [];
  BaseUrl = environment.neuroneURL;

  constructor(protected endpointsService: EndpointsService, private route: ActivatedRoute, public router: Router ) { }

  ngOnInit(): void {
    this.screenHeight = window.innerHeight;
    this.search();
  }

  search(){
    this.endpointsService.getDocuments(this.query, this.domain)
      .subscribe((data: []) => { // Success
          this.documents = data;
          this.endpointsService.sort(this.documents, "task1");
        },
        (error) => {
          console.error(error);
        });
  }

  getParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  getThumbnail(youtubeUrl){
    let thumb = this.getParameterByName(youtubeUrl, 'v');
    let thumbUrl= 'http://img.youtube.com/vi/' + thumb + '/default.jpg';
    return thumbUrl;
  }

  showShortDescription(description, num){
    return (description.substr(0, num));
  }

}
