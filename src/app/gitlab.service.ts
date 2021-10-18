import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
                providedIn: 'root'
            })
export class GitlabService {

    constructor(private readonly http: HttpClient) {
    }

    public getProjectsInGroup(backendUrl: string = '', apiKey: string = '', groupId: string = ''): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders().set('PRIVATE-TOKEN', apiKey).set('Content-Type', 'application/json');
        return this.http.get<any>(backendUrl + `groups/${groupId}/projects?archived=false&include_subgroups=false&simple=true`, {
            headers,
            observe: 'response'
        });
    }

    public updateProjectSettings(backendUrl: string = '', apiKey: string = '', projectId: string = '',
                                 settings: string = ''): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders().set('PRIVATE-TOKEN', apiKey).set('Content-Type', 'application/json');
        return this.http.put<any>(
            backendUrl + `projects/${projectId}`, settings, {
                headers,
                observe: 'response',
            });
    }

    public updateProjectMergeApprovals(backendUrl: string = '', apiKey: string = '', projectId: string = '',
                                       settings: string = ''): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders().set('PRIVATE-TOKEN', apiKey).set('Content-Type', 'application/json');
        return this.http.post<any>(
            backendUrl + `projects/${projectId}/approvals`, settings, {
                headers,
                observe: 'response',
            });
    }

    public createProjectApprovalRules(backendUrl: string = '', apiKey: string = '', projectId: string = '',
                                      settings: any = ''): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders().set('PRIVATE-TOKEN', apiKey).set('Content-Type', 'application/json');

        return this.http.post<any>(
            backendUrl + `projects/${projectId}/approval_rules`, settings, {
                headers,
                observe: 'response',
            });
    }

    private getProjectApprovalRules(backendUrl: string = '', apiKey: string = '', projectId: string = ''): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders().set('PRIVATE-TOKEN', apiKey).set('Content-Type', 'application/json');

        return this.http.get<any>(
            backendUrl + `projects/${projectId}/approval_rules`, {
                headers,
                observe: 'response',
            });
    }

    private updateProjectApprovalRules(backendUrl: string = '', apiKey: string = '', projectId: string = '',
                                       settings: any = '', approvalRuleId: string = ''): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders().set('PRIVATE-TOKEN', apiKey).set('Content-Type', 'application/json');

        return this.http.put<any>(
            backendUrl + `projects/${projectId}/approval_rules/${approvalRuleId}`, settings, {
                headers,
                observe: 'response',
            });
    }
}
