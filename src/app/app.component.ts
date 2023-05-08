import { Component, OnInit } from '@angular/core';
import { GitlabService } from './gitlab.service';
import { interval } from 'rxjs';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarConfig as MatSnackBarConfig } from '@angular/material/legacy-snack-bar';

@Component({
             selector:    'app-root',
             templateUrl: './app.component.html',
             styleUrls:   ['./app.component.scss']
           })
export class AppComponent implements OnInit {

  projectSettingsDefault: string = '{\n'
                                   + '    "packages_enabled": true,\n'
                                   + '    "visibility": "internal",\n'
                                   + '    "issues_access_level": "disabled",\n'
                                   + '    "merge_method" : "merge",\n'
                                   + '    "merge_requests_enabled": true,\n'
                                   + '    "wiki_access_level": "disabled",\n'
                                   + '    "builds_access_level": "enabled",\n'
                                   + '    "snippets_access_level": "disabled",\n'
                                   + '    "service_desk_enabled": false,\n'
                                   + '    "emails_disabled": true,\n'
                                   + '    "printing_merge_request_link_enabled": true,\n'
                                   + '    "only_allow_merge_if_pipeline_succeeds": true,\n'
                                   + '    "only_allow_merge_if_all_discussions_are_resolved": true,\n'
                                   + '    "remove_source_branch_after_merge": true,\n'
                                   + '    "approvals_before_merge": 2\n'
                                   + '}';

  projectApprovalsDefault: string = '{\n'
                                    + '    "approvals_before_merge": 2,\n'
                                    + '    "reset_approvals_on_push": false,\n'
                                    + '    "disable_overriding_approvers_per_merge_request": true,\n'
                                    + '    "merge_requests_author_approval": false,\n'
                                    + '    "merge_requests_disable_committers_approval": false,\n'
                                    + '    "require_password_to_approve": false\n'
                                    + '}';

  projectApprovalRuleDefault: string = '{\n'
                                       + '    "group_ids":["848"],\n'
                                       + '    "name": "arch",\n'
                                       + '    "approvals_required": 2\n'
                                       + '}';

  gitlabApiKey = '';
  gitlabUrl = '';
  groupId = '';
  projectSettings = '';
  projectApprovals = '';
  projectApprovalRule = '';

  snackBarConfig: MatSnackBarConfig = {
    duration:           500,
    horizontalPosition: 'center',
    verticalPosition:   'bottom'
  };

  constructor(private readonly gitlab: GitlabService, private readonly SNACK_BAR: MatSnackBar) {
  }

  ngOnInit(): void {
    const gitlabApiKey = localStorage.getItem('gitlabApiKey');
    this.gitlabApiKey = gitlabApiKey ? gitlabApiKey : '';
    const gitlabUrl = localStorage.getItem('gitlabUrl');
    this.gitlabUrl = gitlabUrl ? gitlabUrl : '';
    const groupId = localStorage.getItem('groupId');
    this.groupId = groupId ? groupId : '';
    const projectSettings = localStorage.getItem('projectSettings');
    this.projectSettings = projectSettings ? projectSettings : this.projectSettingsDefault;
    const projectApprovals = localStorage.getItem('projectApprovals');
    this.projectApprovals = projectApprovals ? projectApprovals : this.projectApprovalsDefault;
    const projectApprovalRule = localStorage.getItem('projectApprovalRule');
    this.projectApprovalRule = projectApprovalRule ? projectApprovalRule : this.projectApprovalRuleDefault;

    interval(50000).subscribe(value => this.saveValueToLocalStorage());
  }

  saveSettings(): void {
    this.gitlab.getProjectsInGroup(this.gitlabUrl, this.gitlabApiKey, this.groupId).subscribe(response => {
      const projects: any[] = response.body;

      projects.forEach(project => {
        this.gitlab.updateProjectSettings(this.gitlabUrl, this.gitlabApiKey, project.id, this.projectSettings).subscribe();
        this.gitlab.updateProjectMergeApprovals(this.gitlabUrl, this.gitlabApiKey, project.id, this.projectApprovals).subscribe();
        this.gitlab.createProjectApprovalRules(this.gitlabUrl, this.gitlabApiKey, project.id, this.projectApprovalRule).subscribe();
      });

      this.SNACK_BAR.open(`${projects.length} projects settings updated`, 'close', this.snackBarConfig);
    });
  }

  private saveValueToLocalStorage(): void {
    localStorage.setItem('gitlabApiKey', this.gitlabApiKey);
    localStorage.setItem('gitlabUrl', this.gitlabUrl);
    localStorage.setItem('groupId', this.groupId);
    localStorage.setItem('projectSettings', this.projectSettings);
    localStorage.setItem('projectApprovals', this.projectApprovals);
    localStorage.setItem('projectApprovalRule', this.projectApprovalRule);
  }

}
