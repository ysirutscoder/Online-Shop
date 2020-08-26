import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {
  form: FormGroup;
  productAdded = false ;

  constructor(private productSer: ProductService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      cost: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      imgUrl: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    } else {
      const product = {
        title: this.form.value.title,
        cost: this.form.value.cost,
        description: this.form.value.description,
        imgUrl: this.form.value.imgUrl,
        category: this.form.value.category,
        weight: this.form.value.weight,
        date: new Date(),
      };
      this.productSer.create(product).subscribe(
        res => {
          console.log(res);
          this.form.reset();
          this.productAdded = true ;
        }
       );
    }
  }
}
