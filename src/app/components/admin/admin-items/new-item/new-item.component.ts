import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../models/Item';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {prevMonthDisabled} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  @Input()
  item: Item = new Item();

  selectedFiles: File[] = [];
  fb;
  downloadURL: Observable<string>;

  progress: Map<string, Observable<number>> = new Map();

  constructor(public activeModal: NgbActiveModal, private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  saveItem(): void {
    this.activeModal.close(this.item);
  }

  onFileSelected(files: FileList): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.item.images.push(null);

      const fileName = files[i].name;
      const filePath = `images/products/${fileName}`;
      const fileRef = this.storage.ref(filePath);

      const task = this.storage.upload(filePath, files[i]);
      this.progress.set(files[i].name, task.percentageChanges());

      task.snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                this.item.images.push({name: filePath, url});
              }
            });
          })
        )
        .subscribe();
    }
  }

  cancel(): void {
    this.activeModal.close(null);
    /*
    const promises = [];
    for (const file of this.progress.keys()) {
      const filePath = `images/products/${file}`;
      promises.push(
        this.storage.ref(filePath).delete().toPromise()
      );
    }
    Promise.all(promises)
      .catch((e) => console.log(e))
      .finally(() => this.activeModal.close(null));

     */
  }
}
