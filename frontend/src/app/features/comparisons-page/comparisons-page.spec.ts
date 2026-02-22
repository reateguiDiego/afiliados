import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonsPage } from './comparisons-page';

describe('ComparisonsPage', () => {
  let component: ComparisonsPage;
  let fixture: ComponentFixture<ComparisonsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
