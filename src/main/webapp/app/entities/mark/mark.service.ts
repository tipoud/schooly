import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMark } from 'app/shared/model/mark.model';

type EntityResponseType = HttpResponse<IMark>;
type EntityArrayResponseType = HttpResponse<IMark[]>;

@Injectable({ providedIn: 'root' })
export class MarkService {
    private resourceUrl = SERVER_API_URL + 'api/marks';

    constructor(private http: HttpClient) {}

    create(mark: IMark): Observable<EntityResponseType> {
        return this.http.post<IMark>(this.resourceUrl, mark, { observe: 'response' });
    }

    update(mark: IMark): Observable<EntityResponseType> {
        return this.http.put<IMark>(this.resourceUrl, mark, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMark>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMark[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
