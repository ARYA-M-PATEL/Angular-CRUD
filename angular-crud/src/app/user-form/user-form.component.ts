// src/app/user-form/user-form.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { user } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() user!: user;
  @Output() save = new EventEmitter<user>();
  @Output() cancel = new EventEmitter<void>();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [this.user.id],
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.save.emit(this.userForm.value);
      this.userForm.reset();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
