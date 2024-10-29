import Component from '@glimmer/component';

import RouteTemplate from 'ember-route-template';

import type ProjectsShowModel from 'playground-ed/routes/projects/show';

interface ProjectsShowTemplateSignature {
  Args: {
    model: ProjectsShowModel;
    controller: null;
  };
}

class ProjectsShowTemplate extends Component<ProjectsShowTemplateSignature> {
  <template>
    {{@model.name}}
    {{outlet}}
  </template>
}

export default RouteTemplate(ProjectsShowTemplate);
