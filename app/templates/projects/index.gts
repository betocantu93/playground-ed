import Component from '@glimmer/component';

import RouteTemplate from 'ember-route-template';

interface ProjectsIndexTemplateSignature {
  Args: {
    model: null;
    controller: null;
  };
}

class ProjectsIndexTemplate extends Component<ProjectsIndexTemplateSignature> {
  <template>
    {{outlet}}
  </template>
}

export default RouteTemplate(ProjectsIndexTemplate);
