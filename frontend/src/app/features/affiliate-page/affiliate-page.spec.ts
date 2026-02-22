import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatePage } from './affiliate-page';

describe('AffiliatePage', () => {
  let component: AffiliatePage;
  let fixture: ComponentFixture<AffiliatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffiliatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffiliatePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
