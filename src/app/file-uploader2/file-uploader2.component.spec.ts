import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploader2Component } from './file-uploader2.component';

describe('FileUploader2Component', () => {
  let component: FileUploader2Component;
  let fixture: ComponentFixture<FileUploader2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploader2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploader2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
