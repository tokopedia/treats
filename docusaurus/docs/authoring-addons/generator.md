---
id: generator
title: Generators
sidebar_label: Generators
---

Treats shipped with a built-in code generator that accept a template folder to generate codes to make bootstraping, generating, or updating your existing codebase easier.

In this section, we'll try to create a simple generator that prompt user to answer several questions about themself and generate some codes based on them. First, let's start with creating the generator templates folder and `treats-generator.json`. `treats-generator.json` are used to configure our generator template behavior. For more information about `treats-generator.json` please refer to [Generator's API Reference][api-reference-generator].
```
src/
|-- generator/
    |-- my-life/
        |-- treats-generator.json
```

Next, let's configure our generator, we'll add prompts to get user's name, age, address, and hobby.
```
// src/generator/my-life/treats-generator.json
{
    "prompt": {
        "NAME": {
            "description": "Your name",
            "pattern": "^[a-zA-Z\\s]+$",
            "default": "John Doe",
            "message": "Name must be only letters and spaces",
            "required": true
        },
        "AGE": {
            "description": "Your Age",
            "pattern": "^[0-9]+$",
            "default": "17",
            "message": "Age may only contains 0-9"
        },
        "ADDRESS": {
            "description": "Your Address",
            "default": "My Own House"
        },
        "HOBBY": {
            "description": "Your Hobbies",
            "default": "code treats app" 
        }
    }
}
```

We want to also greet users with warm greetings before asking them personal questions and thank them for their time after they've finished answering our questions. We can do this with `before` and `after` hook:
```
// src/generator/my-life/treats-generator.json
{
    "prompt": {
        ...
    },
    "before": [{
        "command": "message",
        "options": {
            "message": "Howdy! We would like to ask you some personal questions if you didn't mind"
        } 
    }],
    "after": [{
        "command": "message",
        "options": {
            "message": "Thanks for your time, have a nice day!"
        } 
    }]
}
```

Now you can run your generator template with `yarn generate <YOUR_PROJECT_DIRECTORY>/src/generator/my-life`. When you run your generator, you'll see the messages and the prompt that you've defined on `treats-generator.json`.

We want to create a markdown file that would be generated when we finished running our generator, first let's create the template file:

```
src/
|-- generator/
    |-- my-life/
        |-- treats-generator.json
        |-- <%NAME%>.md
```

Notice that we uses `<%NAME%>` as our file name, this is how we define a variable in Treats code generator. In the generated code `<%NAME%>` would be replaced with value of `NAME` that's inputted by user. Now let's fill our template file:

```
// src/generator/my-life/<%NAME%>.md

## <%NAME%>
Age: <%AGE%>
Address: <%ADDRESS%>
Hobby: <%HOBBY%>

Hi, my name is <%NAME%>, I'm <%AGE%> years old. I live in <%ADDRESS%>. I love to <%HOBBY%>.
```

Now when you're trying to generate with your template again, you'll see your file with those values filled.

Congratulations! You've finished creating your first generator template. In the fourth and final part, we'll wrap all addons that we've generated and package them into single npm module.

[api-reference-generator]: ../api-reference/generator.html
