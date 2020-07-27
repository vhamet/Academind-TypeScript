import Component from './base.js';
import { projectState } from '../state/project-state.js';
import { Validatable, validate } from '../util/validation.js';
import { Autobind } from '../decorators/autobind.js';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.onSubmit);
  }

  renderContent() {}

  private gatherInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const enteredDescription = this.descriptionInputElement.value;
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
      maxLength: 50,
    };
    const enteredPeople = +this.peopleInputElement.value;
    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 0,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input !');
      return;
    }

    this.clearInputs();

    return [enteredTitle, enteredDescription, enteredPeople];
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @Autobind
  private onSubmit(event: Event) {
    event.preventDefault();
    const userInput = this.gatherInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
    }
  }
}
