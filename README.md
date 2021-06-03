# Homework#1

## Requirements

We need to develop a SPA that allows us to collect customer information and offer free domain names for registration

Key features:

- A form for collecting input from the user, including their name and keywords related to their business
- A list of adjectives for combining with business keywords
- Make an API request to domainsdb.info to check availability

## Principles

When developing a solution, we will be guided by the following principles

- **Development speed** - we want to create an application as soon as possible, for this we will use ready-made solutions as much as possible
- **Simplicity** - The solution should be easy to use, but at the same time customizable if necessary, for example, styles, texts
- **Compatibility** - the web application should be convenient to use both in the desktop and in the mobile version
- **Usability** - in the process of interacting with the application, the user has a clear idea of ​​what is expected of him at every step

## Mockup plan

To achieve our goal 🎯 consider the main ideas for the implementation of the task:

- The web application is a single page form with a set of fields and a step-by-step progress indicator
- By filling in the required form fields, the user will be able to choose any of the offered free domain names
- When the form is completely filled, the Submit button becomes active to save the result

For clarity, let's create layouts of the web application drawn in `draw.io`

### Home screen

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

## Development plan

### Defining the stack

First of all, let's describe the stack:

- **XState** - will help to effectively manage the state of the application
- **ChakraUI** - a set of ui components for React, will allow you to use ready-made components for buttons and form fields
- **Next.js** - will allow us to collect our page in statics, which will have a positive effect on the loading time of the application
- **Typescript** - strong typing will help to minimize the number of possible errors in the development process

### Extracting components

Let's split the application into logical components with the following structure

- App
  - UserForm
  - DomainForm
  - Progress

![Components](/layouts/components.png?raw=true "Components")

## State management

State management plays a key role in the operation of our application

Our application state can be conditionally divided into `global state` and `local state`

- `Global state`, which will be implemented in `XState`, describes the state of all form fields, it will be available for any application component
- `Local state` state outside from XState, will be contain in the `DomainForm` component, it will be information about the status of the API request for domain availability and a list of available domains

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
