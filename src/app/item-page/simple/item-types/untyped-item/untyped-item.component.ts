import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Item } from '../../../../core/shared/item.model';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemComponent } from '../shared/item.component';
import { getItemPageRoute } from 'src/app/item-page/item-page-routing-paths';

/**
 * Component that represents a publication Item page
 */

@listableObjectComponent(Item, ViewMode.StandalonePage)
@Component({
  selector: 'ds-untyped-item',
  styleUrls: ['./untyped-item.component.scss'],
  templateUrl: './untyped-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UntypedItemComponent extends ItemComponent implements OnInit {
  routeLink(lnk: any) {
    if (lnk.includes('http')) {
      window.location.href = lnk;
      return true;
    }
    return this.router.navigateByUrl(lnk);
  }

  ngOnInit(): void {
    this.itemDemoRoute = this.object.metadataAsList.find((m) => m.key === 'local.demo.uri')?.value;
    this.itemPageRoute = getItemPageRoute(this.object);
}
}
