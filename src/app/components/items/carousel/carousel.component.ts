import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {faCircle as faSolidCircle} from '@fortawesome/free-solid-svg-icons';
import {faCircle as faRegularCircle} from '@fortawesome/free-regular-svg-icons';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  faSolidCircle = faSolidCircle;
  faRegularCircle = faRegularCircle;

  public imageUrls;
  public downloaded = false;
  @ViewChild('carousel')
  carousel: NgbCarousel;

  constructor(private fireStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.imageUrls = [];
    this.fireStorage.ref('images/carousel').listAll().subscribe(result => {
      result.items.forEach((item) => {
        item.getDownloadURL().then((res) => {
          this.imageUrls.push(res);
        }).then(() =>{
          this.downloaded = true;
        });

      });
    });
  }

  switchImage(index: number): void {
    this.carousel.select(`ngb-slide-${index}`);
  }

  isActive(i: number): boolean {
    return this.carousel?.activeId === `ngb-slide-${i}`;
  }
}
