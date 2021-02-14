import { Component, OnInit } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirecloudService } from '../../services/firecloud.service';

@Component({
	selector: 'app-firecloud',
	templateUrl: './firecloud.component.html',
	styleUrls: ['./firecloud.component.css'],
})
export class FirecloudComponent implements OnInit {
	private obs1: Observable<any>;
	private obs2: Observable<any>;
	private merged: any;
	public docs: any;

	constructor(private firecloudService: FirecloudService) {}

	ngOnInit() {
		this.obs1 = this.firecloudService.getCollectionByReference('mas-accounts', 'id', '==', '8q9fzRGWZcA2zRgoz2V0');
		this.obs2 = this.firecloudService.getCollectionByReference('mas-accounts', 'id', 'in', [
			'RNt7lZOnEnlRDGJpI30L',
			'QPJfqk1pInfQ2Rw19Tn8',
		]);

		this.merged = zip(this.obs1, this.obs2)
			.pipe(map(x => x[0].concat(x[1])))
			.subscribe(docs => {
				this.docs = docs;
			});
	}
}
