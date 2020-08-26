import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ProductService} from '../../shared/services/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  product: Product;
  productChanged = false;

  constructor(private route: ActivatedRoute, private productSer: ProductService, private router: Router) {
  }

  ngOnInit() {

    this.route.params.pipe(
      switchMap(
        params => {
          return this.productSer.getById(params['id']);
        }
      )
    ).subscribe(product => {
      this.product = product;
      this.form = new FormGroup({
        title: new FormControl(this.product.title, Validators.required),
        cost: new FormControl(this.product.cost, Validators.required),
        description: new FormControl(this.product.description, Validators.required),
        imgUrl: new FormControl(this.product.imgUrl, Validators.required),
        category: new FormControl(this.product.category, Validators.required),
        weight: new FormControl(this.product.weight, Validators.required),
      });
    });
  }
  submit() {
    if (this.form.invalid) {
      return;
    } else {
      this.productSer.updateItem(
        {
          ...this.product,
        title: this.form.value.title,
        cost: this.form.value.cost,
        description: this.form.value.description,
        imgUrl: this.form.value.imgUrl,
        category: this.form.value.category,
        weight: this.form.value.weight,
        date: new Date(),
        }
      ).subscribe(
        res => {
          console.log(this.form.value);
          this.productChanged = true ;
          this.router.navigate(['/admin', 'dashboard']);
        }
      );
    }
  }

}
