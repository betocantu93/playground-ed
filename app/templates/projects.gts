import Component from '@glimmer/component';

import RouteTemplate from 'ember-route-template';

interface ProjectsTemplateSignature {
  Args: {
    model: null;
    controller: null;
  };
}

class ProjectsTemplate extends Component<ProjectsTemplateSignature> {
  <template>
    {{outlet}}
  </template>
}

export default RouteTemplate(ProjectsTemplate);
