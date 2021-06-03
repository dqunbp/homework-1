# Homework#1

## Requirements ✔️

We need to develop a SPA that allows us to collect customer information and offer free domain names for registration

Key features:

- A form for collecting input from the user, including their name and keywords related to their business
- A list of adjectives for combining with business keywords
- Make an API request to domainsdb.info to check availability

## Principles 🧭

When developing a solution, we will be guided by the following principles

- **Development speed** - we want to create an application as soon as possible, for this we will use ready-made solutions as much as possible
- **Simplicity** - The solution should be easy to use, but at the same time customizable if necessary, for example, styles, texts
- **Compatibility** - the web application should be convenient to use both in the desktop and in the mobile version
- **Usability** - in the process of interacting with the application, the user has a clear idea of ​​what is expected of him at every step

## <a name="mockup"></a> Mockup plan 🎯

To achieve our goal consider the main ideas for the implementation of the task:

- The web application is a single page form with a set of fields and a step-by-step progress indicator
- By filling in the required form fields, the user will be able to choose any of the offered free domain names
- When the form is completely filled, the Submit button becomes active to save the result

For clarity, let's create layouts of the web application drawn in `draw.io`

### Home screen 🖥️

We have the following items

- Title (optional)
- Subtitle (optional)
- Username - text field
- Key business words - multi-input with the ability to select existing keywords or add your own
- Company name - text field
- Step by step description of progress
- Submit button
- Company logo (optional)

![Home screen](/layouts/main.png?raw=true "Home screen")

### Filling out the form

As the form fills out, the user will see how his progress is changing and what steps are still left to achieve the goal

![Filling out the form](/layouts/filling-the-form.png?raw=true "Filling out the form")

### Choosing a domain name

When the user fills in the field with the name of the company, the application will offer a list of available names, at this step the user can select a name or click on the "show more" button to see other options, or enter the name manually

![Choosing a domain name](/layouts/choosing-domain.png?raw=true "Choosing a domain name")

### Submitting

When the domain name is selected, the form is considered fully completed and the user can submit it

![Submitting](/layouts/submitting.png?raw=true "Submitting")

## Development plan 📝

### Defining the stack

First of all, let's describe the stack:

- **XState** - will help to effectively manage the state of the application
- **ChakraUI** - a set of ui components for React, will allow you to use ready-made components for buttons and form fields
- **React-select** - to provide multiselect functionality
- **Next.js** - will allow us to collect our page in statics, which will have a positive effect on the loading time of the application
- **Typescript** - strong typing will help to minimize the number of possible errors in the development process

### Extracting components

Let's split the application into logical components with the following structure

- App
  - UserForm
  - DomainForm
  - Progress

![Components](/layouts/components.png?raw=true "Components")

## State management 🪢

### Global and local state

Our application state can be conditionally divided into `global state` and `local state`

- `Global state` this part of state wi going to implement with `XState`, it describes the state of entire application, in our case it will contain information about the state of all fields, the progress of filling out the form and its validity
- `Local state` this part of state will implement on pure React, it represents separate parts of the application state, containing, for example, intermediate states of the interface, such a state, for example, can be in the `DomainForm` component that displays information about the status of the API request for domain availability and a list of available domains
  - Let's dive deeper into this question, the `DomainForm` component can have the following states:
    - Idle state - when you first open the application, this component does not contain information about available domains
    - Name availability checking - when the user enters the company name, the component sends a request to check the name availability, at this moment the spinner is displayed
    - Displaying a list of available names - after receiving a response from the server, the component displays a list of available options
    - Manual name entring - if the user did not find a suitable name among the proposed ones, he can try to enter the desired name manually
    - Selected domain name - when the user clicks on one of the suggested domain names or enters it manually, it is saved to the global state and displayed as selected

### Modeling the state

Let's consider the shape of `global state` in `XState` terms

```typescript
interface State {
  user: string;
  keywords: string[];
  company: string;
  domain: string;
}

const stateMachine = createMachine<State>({
  id: "form",
  initial: "formFilling",
  context: {
    user: "",
    keywords: [],
    company: "",
    domain: "",
  },
  states: {
    formFilling: {},
  },
});
```

### Context or not context

What should we do to make application state available on every application component?
Of course, we can use the classic tool for this task - React context

[According this great article](https://swizec.com/blog/react-context-without-context-using-xstate-codewithswiz-14-15/) we can achieve this in another way

The main idea is to transform our state machine into `actor` – independent objects that hold their own state and respond to events.
And then we can import it as a service that will be available from any app component
Any changes of our state will envoy rerendering of the app

```typescript
// state.ts
import { interpret } from "xstate";

export const stateService = interpret(stateMachine);
stateService.start();
```

## Usage

### Deployment

There are several ways to publish an application.

#### Directly in vercel

[https://nextjs.org/docs/deployment#vercel-recommended](https://nextjs.org/docs/deployment#vercel-recommended)

#### Self-hosting with Node.js

[https://nextjs.org/docs/deployment#nodejs-server](https://nextjs.org/docs/deployment#nodejs-server)

#### Static HTML Export

[https://nextjs.org/docs/advanced-features/static-html-export](https://nextjs.org/docs/advanced-features/static-html-export)

### Customizing

For the customer of the application, it means the possibility of customization:

- Site Title
- Heading
- Description
- Logo
- Styles
- Favicon

#### Customizing app styles

The user can customize if necessary

- Color scheme
- Typography
- Spacing
- etc [view more in chakra docs](https://chakra-ui.com/docs/theming/theme)

To do this, you need to make changes to the theme.ts file, according to the documentation [https://chakra-ui.com/docs/theming/theme](https://chakra-ui.com/docs/theming/theme)

#### Customizing title and subtitle

The user has the ability to customize the text of the main title and subtitle, for this you need to make the appropriate changes to the file: `public/app-config.json`

```json
{
  "title": "Site title",
  "heading": "App heading",
  "description": "app subtitle"
}
```

### Customizing list of keywords

To change the list of suggested keywords, edit the file `public/keywords.json`

#### Customizing `logo` and `favicon`

In order to use a custom logo or favicon, the user can save it as a file in the `png` format along the paths`public/logo.png` and `public/favicon.png`

#### Saving changes

The changes you have made need to be added to `git`

```bash
git add . && git commit -m "Update app config"
```

And then push the changes to the repository if needed

```bash
git push origin main
```
