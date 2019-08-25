![](https://i.imgur.com/0RGDSPU.jpg)
# @shaai/core
Core library containing data related functions.

### Introduction
Shaai is a pluggable blogging setup which allows you to source your content from anywhere and display it the way you want. It aims to be modular in every aspect and allows you to use every piece of it the way you want.

The name 'Shaai' comes from the Marathi/Hindi word __shaai__, meaning __ink__. We have named internal components following a similar nomenclature.

Broadly, the whole setup is made up of these packages:

##### 1. Core library `@shaai/core`
This is the core package containing the basic functions required to fetch your data from a data source. A data source, for example, can be any existing database, your Wordpress or Medium blog or you can choose to use Shaai's content management system (CMS).

This package connects to your data source and transforms data so that any Shaai __scroll__ can consume it. TODO.

##### 2. Scrolls `@shaai/scroll-*`
Scrolls used to be the surfaces for writing down content centuries back. In Shaai, scrolls are templates that render your data. `@shaai/scroll-ink` is one of our homemade scrolls. It provides a blog design using Shaai's design system and is a clean way to show your blog posts.

Scrolls are meant to be pluggable in nature. You can choose from the currently available scrolls, and we are creating more of them. Developers can also write their own scrolls using the `@shaai/core` package to fetch data. These can be made open source so that the community has a variety of options to choose scrolls from.

Read more about scrolls and how to create your own scroll in the [Scroll.MD](https://github.com/shaaijs/docs/Scroll.MD) file.

##### 3. Cartridges `@shaai/cartridge-*`
These are the data sources for Shaai. TODO.

##### 4. Nibs `@shaai/nib-*`
These are plugins for custom data transformation and inserting your own functions into the shaai instance. TODO.



