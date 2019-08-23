# Installation

1) Install the [ask-cli](https://developer.amazon.com/de/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) and configure it properly.

2) Install the node_modules from the root directory
> npm i

3) Install the node_modules from the lambda/custom directory
> cd lambda/custom
npm i

# Debugging

You have two possibilites to debug the application

1) [AWS CloudWatch](https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#)
<small>go the cloudwatch > logs and select your alexa skill log group > select the desired log stream</small>
When you are testing now the skill there you will find all console.log statements from your application.

2) [Jest tests](https://jestjs.io/) (currently only configured for [Visual Studio Code](https://code.visualstudio.com/))
When you want to test a specific intent, you can create your own tests within the folder \__tests__
Press F5 for starting the debug mode and select the mode "Jest All". After that it will stop on every breakpoint that you have set.

# Tests

- In the folder \__tests__ you can check and also create tests for your intents
- After that you can check it with
```shell
npm run test
```

# Deployment

- Generate the compiled source code
```shell
npm run build
```

- Deploy the application to AWS and Alexa <small><i>(after executing this command, the permission to receive the gps coordinates from the user must be explicit set again. Go to the alexa developer console  > Build > Permissions > Device Address and enable the field Full Address)</i></small>
```shell
npm run deploy
```
- If any changes were made to the skill, it has to be distributed again to the customer <small><i>(go to the alexa developer console > Distribution)</i></small>

# Examples sentences
[DE](/docs/example_phrases_de.md) | [IT](/docs/example_phrases_it.md) | [EN](/docs/example_phrases_en.md)
