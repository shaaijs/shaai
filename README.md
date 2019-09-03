![](https://i.imgur.com/0RGDSPU.jpg)
# @shaai/core <span>&nbsp;</span> [![npm version](https://badge.fury.io/js/%40shaai%2Fcore.svg)](https://badge.fury.io/js/%40shaai%2Fcore)
Core library containing data related functions.

[Shaai Homepage](https://shaaijs.tech) • [Our blog, made in Shaai](https://shaaijs.tech/blog)

## Usage
Shaai can be used in multiple ways, but the easiest one is to use `scrolls` to render blogs.

```js
//Vanilla JS
npm install --save @shaai/scroll-ink

//React
npm install --save @shaai/scroll-ink @shaai/react
```
We suggest you read about the constituents of the framework below, but you can always skip and move to implementation directly. [_Read about usage in detail here_](https://github.com/shaaijs/scroll-ink#usage).

[![Setting up your first blog](https://i.imgur.com/Ebft2t0l.png)](http://www.youtube.com/watch?v=VESOKt5-7yU)

## Introduction
Shaai is a pluggable blogging setup which allows you to source your content from anywhere and display it the way you want. It aims to be modular in every aspect and allows you to use every piece of it the way you want.

The name 'Shaai' comes from the Marathi/Hindi word __shaai__, meaning __ink__. We have named internal components following a similar nomenclature.

Broadly, the whole setup is made up of these packages:

### 1. Core library [`@shaai/core`](https://github.com/shaaijs/core)
This is the core package containing the basic data related functions and does the job of talking to the data source. This npm package can be independently used to consume blog data and render as per one's needs. Generally, the core library is used by scrolls internally.

A data source, for example, can be any existing database, your Wordpress or Medium blog or you can choose to use Shaai's content management system (CMS).

`core` connects to your data source and transforms data so that any Shaai __scroll__ can consume it.

### 2. Scrolls [`@shaai/scroll-*`](https://github.com/shaaijs/scroll-ink)
Scrolls used to be the surfaces for writing down content centuries back. In Shaai, scrolls are templates that render your data. [`@shaai/scroll-ink`](https://github.com/shaaijs/scroll-ink) is one of our homemade scrolls. It provides a blog design using Shaai's design system and is a clean way to show your blog posts.

Scrolls are meant to be pluggable in nature. You can choose from the currently available scrolls, and we are creating more of them. Developers can also write their own scrolls using the `@shaai/core` package to fetch data. These can be made open source so that the community has a variety of options to choose scrolls from.

Read more about scrolls and how to create your own scroll [here](https://github.com/shaaijs/scroll-ink).

### 3. [Admin](https://shaai.herokuapp.com)
This is the content management system for Shaai. You can manage your blogs here. The CMS can be [self hosted](https://github.com/shaaijs/admin#host-shaai-admin-on-heroku) on your server, or you can use [our hosted version](https://shaai.herokuapp.com) directly.

## Roadmap
Shaai was developed with many ambitious features in mind, but we have limited ourselves to the most crucial ones for the first release. Following are part of the framework roadmap:
### Cartridges `@shaai/cartridge-*`
These are the data sources for Shaai. In future, we plan to have several other data sources, like `file system`.

### Nibs `@shaai/nib-*`
These are plugins for custom data transformation and injecting your own functions into the `shaai` instance.

## Blogs made using Shaai

[Shaai Blog](https://shaaijs.tech/blog)
[Mohit's Blog](https://mohitkarekar.com/blog)
