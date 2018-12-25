---
id: custom-react-app
title: Custom React App
sidebar_label: Custom React App
---

To provide custom React app, we can use `src/_app/index.js` filesystem hooks, please note that for now, by providing custom React app, you'll need to handle routing by yourself, you can import routes from `@treats/route`.
```js
import React, { Component } from "react";
import { Helmet } from "@treats/helmet";
import { Route, Switch } from "@treats/router";
import routes from "@treats/route";

class App extends Component {
    render() {
        const { language } = this.props;
        return (
            <div id="my-custom-app">
                <Helmet>
                    <html lang={language} />
                </Helmet>
                <Switch>
                    {routes.map(entry => (
                        <Route key={entry.path} {...entry} />
                    ))}
                </Switch>  
            </div> 
        )
    }
}

export default App;
```
