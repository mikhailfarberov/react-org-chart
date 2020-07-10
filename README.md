# react-org-chart - an easy React component to create an organizational chart

[![VERSION](https://img.shields.io/github/v/tag/mikhailfarberov/teleparser?label=version&sort=semver&style=for-the-badge)](https://img.shields.io/github/v/tag/mikhailfarberov/teleparser?label=version&sort=semver&style=for-the-badge)

react-org-chart provides a simple and stylish organizational chart React component. It supports different chart node attributes (see #configuration) and multi root tree (see #demo).

## Table of Contents

1. [Installation](#installation)
2. [Demo](#usage)
3. [Configuration](#configuration)
4. [Credits](#credits)
5. [License](#license)

## Installation

Install via Npm:
```npm install react-org-chart```

## Demo

See [Codepen.io demo]() or https://github.com/mikhailfarberov/react-org-chart/blob/master/demo/

```
var tree = [
  {
    id: 11,
    avatar: 'sample.png',
    title: 'Paul',
    subtitle: '',
    descr: '',
    date: 'since 10.03.2020',
    label: 'Chief of Board',
    link: {url: 'https://github.com', text: 'sample link'}, 
    children: [
      {
        id: 12,
        avatar: 'sample.png',
        title: 'Sara',
        subtitle: '',
        descr: '',
        date: 'since 10.03.2020',
        label: 'CTO',
        link: {url: 'https://github.com', text: 'sample link'}, 
      },
      {
        id: 13,
        avatar: 'sample.png',
        title: 'Kevin',
        subtitle: '',
        descr: '',
        date: 'since 10.03.2020',
        label: 'CTO',
        link: {url: 'https://github.com', text: 'sample link'}, 
      },
      {
        id: 14,
        avatar: 'sample.png',
        title: 'James',
        subtitle: '',
        descr: '',
        date: 'since 10.03.2020',
        label: 'CTO',
        link: {url: 'https://github.com', text: 'sample link'}, 
      }
    ]
  }
];

<OrgChart tree={tree} />
```

## Configuration

The OrgChart component accepts three properties:
* tree - an array of nodes
Node format:
```
{
    id: 11,                     // Unique
    avatar: 'sample.png',       // Optional
    title: 'Paul',
    subtitle: '',               // Optional
    descr: '',                  // Optional
    date: '10.03.2020',         // Optional. Date in text format
    label: 'Chief of Board',    // Optional
    link: {url: 'https://github.com', text: 'sample link', 'image' => 'sample.png'}, // Optional
    children: [], // Optional
    hasChild: 0 // Optional. Allows to show number of child nodes with empty children array that can be loaded asyncroniously when the node is expanded
}
```

* collapse - Render the tree collapsed. Default false.
* onExpandItem - Event fired when node is expanded. Can be used to load child nodes asyncroniously.

## Credits
Special thanks to:
1. [Avatar Icon by Dmitriy Bondarchuk](https://iconscout.com/icons/avatar)

## License
react-org-chart is released under the [MIT](https://github.com/mikhailfarberov/react-org-chart/blob/master/LICENSE) license.