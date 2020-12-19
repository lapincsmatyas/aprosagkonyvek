import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {faCircle as faSolidCircle} from '@fortawesome/free-solid-svg-icons';
import {faCircle as faRegularCircle} from '@fortawesome/free-regular-svg-icons';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  faSolidCircle = faSolidCircle;
  faRegularCircle = faRegularCircle;

  public imageUrls: Observable<string>[];
  private images = ['107-1645x549.jpg', '861-1645x549.jpg', '107-1645x549.jpg', '861-1645x549.jpg'];

  @ViewChild('carousel')
  carousel: NgbCarousel;

  constructor(private fireStorage: AngularFireStorage,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.imageUrls == null) {
      this.imageUrls = this.images.map(imageName => this.fireStorage.ref(`images/${imageName}`).getDownloadURL());
    }
  }

  switchImage(index: number): void {
    this.carousel.select(`ngb-slide-${index}`);
    this.cdr.detectChanges();
  }

  isActive(i: number): boolean {
    return this.carousel?.activeId === `ngb-slide-${i}`;
  }
}
