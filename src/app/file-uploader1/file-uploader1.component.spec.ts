import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploader1Component } from './file-uploader1.component';

describe('FileUploader1Component', () => {
  let component: FileUploader1Component;
  let fixture: ComponentFixture<FileUploader1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploader1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploader1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
