![Scroll](https://i.imgur.com/xhwr9Il.png)
# Ink
[![npm version](https://badge.fury.io/js/%40shaai%2Fscroll-ink.svg)](https://badge.fury.io/js/%40shaai%2Fscroll-ink)
## Scrolls
Scrolls _(aka templates)_ are a pre-defined way of displaying data from Shaai. They are named as `scroll-*`, `*` being the name. Ink's npm package, hence, is `@shaai/scroll-ink`.

## Usage
Shaai is a pluggable blogging framework, allowing you to use elements as per your need. All the __scrolls__ use the `@shaai/core` package internally to source the blog data. According to your environment, you may use a scroll in following ways:

#### 1. Using with React
Using Shaai with React is super easy, thanks to our React wrapper [`@shaai/react`](https://github.com/shaaijs/react). Install the two dependencies required.

```js
// You can replace scroll-ink with any other scroll of your choice

npm install --save @shaai/scroll-ink @shaai/react
```


And use them as follows:
```js
import withShaai from '@shaai/react'
import ScrollInk from '@shaai/scroll-ink'

const Shaai = withShaai(ScrollInk)

const App = function(props) {
    return <div>
        <Shaai config={config} />
    </div>
}

const config = {
    // Described below
}
```
To include styles, add this line to your CSS file:
`@import "~@shaai/scroll-ink/dist/main.css"`

#### 2. Using with Vanilla JavaScript
- __Using in a Node dev environment__

    To use in a Node project, install scroll-ink first.

    `npm install --save @shaai/scroll-ink`

    Then import and initialise it with the `config` object.
    ```js
    import ScrollInk from '@shaai/scroll-ink'

    const s = new ScrollInk(config)

    // define your own templates
    const templates = [/* template array discussed below */]

    // Load whenever ready. If no templates are sent, Ink uses its default templates.
    s.load(templates)

    // Subscribe to updates
    s.subscribe((dom) => {
        let b = document.getElementById('blog')
        b.innerHTML = ''
        b.append(dom)
    })
    ```
    To include styles, add this line to your CSS file:
    `@import "~@shaai/scroll-ink/dist/main.css"`

- __Using in the browser__
    To use Shaai in the browser directly, we recommend using unpkg to source the build files. Just include these lines inside your `<head>` tag of your HTML document.
    ```html
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@shaai/scroll-ink/dist/main.css">
    <script src="https://unpkg.com/@shaai/scroll-ink/dist/main.js"></script>
    ```
    This will include the latest `js` and `css` build files from the scroll-ink npm package, which make the `ScrollInk` property available globally. The rest of the process is quite similar to the above one.
    ```js
    let s = new ScrollInk(config)
    window.onload = function() {
        s.load()
        s.subscribe(function(dom) {
            document.getElementById('blog').innerHTML = ''
            document.getElementById('blog').append(dom)
        })
    }
    ```
Here's a short video to setup your first blog using Shaai and React.

[![Setting up your first blog](https://i.imgur.com/Ebft2t0l.png)](http://www.youtube.com/watch?v=VESOKt5-7yU)

## The `config` object
Each Shaai instance needs to be initialised with a config object to make Shaai work as the way you want. You can pass in following properties currently:

| Property | Type | Description | Default |
| -------- | ---- | ----------- | ------- |
| `source`   | object | Has information about where to source the blog data from | required |
| `basePath` | string | Relative path where your blog will rest e.g. `/blog` | `''` |
| `blogHeader` | object / HTMLElement | Data to be rendered in the blog header `{ title: 'My blog' }` | Default header |
| `blogFooter` | object / HTMLElement | Data to be rendered in the blog footer `{ title: 'Some text' }` | Default header |
| `globalHeader` | boolean | If true, the header will be shown on all routes. Can be overriden at route level in the templates. | `false` |
| `globalFooter` | boolean | If true, the footer will be shown on all routes. Can be overriden at route level in the templates. | `false` |
| `globalNav` | boolean | If true, the nav bar will be shown on all routes. Can be overriden at route level in the templates. | `false` |

##### `source` object
| Property | Type | Description | Default |
| -------- | ---- | ----------- | ------- |
| `name`   | string | Name of the data source `CMS / FS / MEDIUM` | `'CMS'` |
| `config`   | object | Contains config data for the source e.g. `{ blogCode: 12345asdf }` for `source = 'CMS'` | required |


## Templates
Templates are the route-based views in scroll-ink. It is an array of template objects which have following properties:

#### `path`
This is the path/route for the template. Whenever the window path matches this value, the corresponding template will be rendered.

#### `fetch`
This is the method which is called before rendering the respective view. It receives the `shaai` instance, the `store` and the url `params`. While most views would requiring fetching data, you can skip this property if only static data has to be rendered.

#### `template`
This is the function that returns the actual DOM snippet for the matched path. It receives the `data` received from the `fetch` function, if any, and should return a HTMLElement object.

#### `name`
This property is used at places like the navigation bar, to mention the matched path's name.


A template object can look as below
```js
const templates = [
    {
        path: '/',
        name: 'Posts',
        template: (data) => s.list(data, { minimiseContent: true, viewFilter: ['title', 'content', 'publishData'] }),
        fetch: (shaai, store, params) => {
            return new Promise(res => {
                if(store.getData('posts')) {
                    res(store.getData('posts'))
                }
                shaai.getBlogs().then(data => {
                    store.setData({ posts: data.items })
                    res(data.items)
                })
            })
        }
    },
    {
        path: '/about',
        name: 'About',
        template: ({ config }) => {
            let html = `
                <div>
                    <h4 class="about-heading">About me</h4>
                    <p class="about-content">Hello there! I am <a href="https://github.com/mohtik05">@mohitk05</a></p>
                </div>
            `
            let about = document.createElement('div')
            about.className = 'about'
            about.innerHTML = html

            return about
        }
    }
]
```


## Development
Run `npm run start:dev` for starting the Webpack dev server.
