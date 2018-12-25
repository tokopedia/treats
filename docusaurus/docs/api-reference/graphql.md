---
id: graphql
title: Graphql
sidebar_label: Graphql
---

Treats abstracts away `react-apollo` with `@treats/graphql` alias, it is recommended to import from `@treats/graphql` instead of `react-apollo` directly because in the future, there might be improvements or patches that Treats made. Full documentation about `react-apollo` can be found [here][react-apollo-wiki]

```
// src/page/my-page/my-page.graphql
query MyPageQuery {
    myPage {
        title
        description
    }
}
```

```
// src/page/my-page/my-page.js
import { Query } from "@treats/graphql";
import { MyPageQuery } from "./my-page.graphql";

const MyPage = ({ username }) => (
    <Query query={MyPageQuery}>
    {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (
            <div>
                <span>{data.title}</span>
                <span>{data.description}</span>
            </div>
        )
    }}
    </Query>
);


export default MyPage;
```

[react-apollo-wiki]: https://www.apollographql.com/docs/react/
