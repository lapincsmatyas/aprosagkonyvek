import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Toast, ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-admin-carousel',
  templateUrl: './admin-carousel.component.html',
  styleUrls: ['./admin-carousel.component.css']
})
export class AdminCarouselComponent implements OnInit {
  images: string[] = [];

  constructor(private firestorage: AngularFireStorage, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.images = [];
    this.firestorage.ref('images/carousel').listAll().subscribe((result) => {
        result.items.forEach((act) => {
          act.getDownloadURL().then((res) => this.images.push(res));
        });
      }
    );
  }

  deleteImage(image): void {
    this.firestorage.refFromURL(image).delete().toPromise().then(() => {
      this.toastr.success('Kép sikeresen törölve');
      this.images.splice(this.images.indexOf(image), 1);
    });
  }

  onFileSelected(file: File): void {
    // tslint:disable-next-line:prefer-for-of
    const fileName = file.name;
    const filePath = `images/carousel/${fileName}`;
    const fileRef = this.firestorage.ref(filePath);

    const task = this.firestorage.upload(filePath, file);

    this.images.push(null);

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          const downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              this.images[this.images.length - 1] = url;
            }
          });
        })
      )
      .subscribe();
  }
}
