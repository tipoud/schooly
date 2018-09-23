import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEvaluationAttachment } from 'app/shared/model/evaluation-attachment.model';

type EntityResponseType = HttpResponse<IEvaluationAttachment>;
type EntityArrayResponseType = HttpResponse<IEvaluationAttachment[]>;

@Injectable({ providedIn: 'root' })
export class EvaluationAttachmentService {
    private resourceUrl = SERVER_API_URL + 'api/evaluation-attachments';

    constructor(private http: HttpClient) {}

    create(evaluationAttachment: IEvaluationAttachment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(evaluationAttachment);
        return this.http
            .post<IEvaluationAttachment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(evaluationAttachment: IEvaluationAttachment): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(evaluationAttachment);
        return this.http
            .put<IEvaluationAttachment>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEvaluationAttachment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEvaluationAttachment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(evaluationAttachment: IEvaluationAttachment): IEvaluationAttachment {
        const copy: IEvaluationAttachment = Object.assign({}, evaluationAttachment, {
            date:
                evaluationAttachment.date != null && evaluationAttachment.date.isValid()
                    ? evaluationAttachment.date.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((evaluationAttachment: IEvaluationAttachment) => {
            evaluationAttachment.date = evaluationAttachment.date != null ? moment(evaluationAttachment.date) : null;
        });
        return res;
    }
}
