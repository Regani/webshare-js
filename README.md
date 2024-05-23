# WebShareJS

Generate webshare content for mobile applications with ease using WebShareJS.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [HTML](#html)
  - [JavaScript](#javascript)
- [API](#api)
  - [WebShareJS](#websharejs)
  - [Methods](#methods)
  - [Types](#types)
- [License](#license)

## Introduction

WebShareJS is a JavaScript library designed to simplify the process of sharing content from web applications 
to mobile devices. It supports generating images from HTML content and sharing text, URLs, 
and files using the native sharing capabilities of mobile browsers.

## Features
- Generate images from HTML content
- Share text, URLs, and files
- Easy integration with existing web applications
- Lightweight and flexible

## Installation

Install WebShareJS using npm:

With npm:
```sh
npm install webshare-js
```

Or include the script in your HTML file:

```html
<script src="https://webshare-js-cdn.pages.dev/webshare.umd.js"></script>
```

## Usage
### HTML

Add the following HTML elements to your page:

```html
<div id="webshare">
    <p>Hello, World!</p>
</div>
```

### JavaScript
With ES6 modules:
```typescript
import WebShareJS, { ShareQueryData } from 'webshare-js'

const webshare = new WebShareJS()

const shareData: ShareQueryData = {
    files: [
        {
            query: '#webshare',
            title: 'Generated content'
        }
    ],
    title: 'WebShareJS',
    text: 'Generate webshare content with ease',
    url: 'https://example.com'
}

webshare.share(shareData)
    .then(() => {
        console.log('Content shared successfully')
    })
    .catch((error) => {
        console.error('Failed to share content:', error)
    })
```

With a script tag:
```javascript
const webshare = new window.WebShareJS()

const shareData = {
    files: [
        {
            query: '#webshare',
            title: 'Generated content'
        }
    ],
    title: 'WebShareJS',
    text: 'Generate webshare content with ease',
    url: 'https://example.com'
}

webshare.share(shareData)
    .then(() => {
        console.log('Content shared successfully')
    })
    .catch((error) => {
        console.error('Failed to share content:', error)
    })
```

## API

### WebShareJS
```javascript
import WebShareJS from 'webshare-js'
```

**Constructor**
```typescript
new WebShareJS(options?: WebShareOptions)
```

**Options**
- `silent` - A boolean indicating whether to suppress log messages.

### Methods

`sharingSupported(): boolean`
Checks if the sharing API is supported.

```typescript
public sharingSupported(): boolean
```

`canShare(shareData: ShareData)`
Checks if the given data can be shared.
```typescript
public canShare(shareData: ShareData): boolean
```

`share(data: ShareQueryData)`
Shares the provided data using the native sharing capabilities.
```typescript
public share(data: ShareQueryData): Promise<void>
```

### Types
`ShareData`
Data structure for sharing content. 
Refer to the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share#parameters) for more information.

`ShareQueryData`
Data structure for sharing content with generated images. Same as `ShareData` but with overridden `files` property.
```typescript
export interface ShareQueryData extends Omit<ShareData, 'files'> {
    files: Array<ShareQueryFileData>
}
```

`ShareQueryFileData`
Data structure for sharing generated images.
```typescript
export interface ShareQueryFileData {
    /* The title to use for the picture */
    title: string
    /* To use as querySelector to generate the picture by */
    query: string

    /* Options for the image from html-to-image library */
    imageOptions?: Options
}
```
For more information, refer to the [html-to-image](https://www.npmjs.com/package/html-to-image#options) library.

## License
This project is licensed under the ISC License. You are free to use, copy, modify, and distribute this software for any purpose, with or without fee. For more details, see the [ISC License](https://opensource.org/licenses/ISC).