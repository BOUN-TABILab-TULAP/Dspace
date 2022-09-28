import { Component, Input, OnInit } from '@angular/core';

import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { EPerson } from '../../../../core/eperson/models/eperson.model';
import { RemoteData } from '../../../../core/data/remote-data';
import { isNotEmpty } from '../../../empty.util';
import { WorkflowItem } from '../../../../core/submission/models/workflowitem.model';
import { getFirstCompletedRemoteData } from '../../../../core/shared/operators';

/**
 * This component represents a badge with submitter information.
 */
@Component({
  selector: 'ds-item-submitter',
  styleUrls: ['./item-submitter.component.scss'],
  templateUrl: './item-submitter.component.html'
})
export class ItemSubmitterComponent implements OnInit {

  /**
   * The target object
   */
  @Input() object: any;

  /**
   * The submitter object
   */
  submitter$: Observable<EPerson>;

  /**
   * Initialize submitter object
   */
  ngOnInit() {
    this.submitter$ = (this.object.workflowitem as Observable<RemoteData<WorkflowItem>>).pipe(
      getFirstCompletedRemoteData(),
      mergeMap((rd: RemoteData<WorkflowItem>) => {
        if (rd.hasSucceeded && isNotEmpty(rd.payload)) {
          return (rd.payload.submitter as Observable<RemoteData<EPerson>>).pipe(
            getFirstCompletedRemoteData(),
            map((rds: RemoteData<EPerson>) => {
              if (rds.hasSucceeded && isNotEmpty(rds.payload)) {
                return rds.payload;
              } else {
                return null;
              }
            })
          );
        } else {
          return EMPTY;
        }
      }));
  }
}
